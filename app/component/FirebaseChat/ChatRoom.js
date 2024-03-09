import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, onSnapshot, } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig';
import { GiftedChat, Send, Actions, MessageImage } from 'react-native-gifted-chat';
import { Colors } from '../../constant/styles';
import { View, StyleSheet, Dimensions, Touchable, TouchableOpacity, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { CustomBubble, CustomInputToolbar, renderMessageImage, CustomMessageText, CustomSend, CustomVoiceMessage } from './CustomComponents';
import { useSelector } from 'react-redux';
import CustomImagePicker from './ImagePicker';
import { EXPO_PUBLIC_BASE_URL,EXPO_PUBLIC_CLOUDINARY_PERSIST ,EXPO_PUBLIC_CLOUDINARY_KEY } from "@env";
import { Ionicons, FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';


import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import 'react-native-get-random-values';
// import { v4 as uuidv4 } from 'uuid';
// import LoadingScreen from '../loading/LoadingScreen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ActivityIndicator } from 'react-native-paper';
import AppText from '../../component/AppText';
// import LoadingScreen from '../loading/LoadingScreen';
import LoadingScreen from '../../screens/loading/LoadingScreen';

const { height, width } = Dimensions.get('screen');

const ChatRoom = () => {

  const currentChannelName = useSelector((state) => state?.orders?.currentChatChannel);
  const { t } = useTranslation();
  // const { uid} = auth
  const [CurrentChatRoom, SetCurrentChatRoom] = useState(null)
  const [messages, setMessages] = useState(null);
  const user = useSelector((state) => state?.user?.userData)
  const [text, setText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [recording, setCurrentISRecording] = useState(false);
  const MAX_RETRIES =  5; // Maximum number of upload attempts

  const userId = user?.id
  // Function to start recording



  useEffect(() => {
    const ref = collection(db, 'chatRooms');
    // console.log("Chat room ref");

    const unsubscribe = onSnapshot(ref, (chatRooms) => {
      const data = chatRooms?.docs?.map((doc) => {
        return {
          ...doc.data(),
          _id: doc.id, // Add a unique ID for GiftedChat
        };
      });
      //   console.log("chat Rooms ", data);


      // Check if the chat room exists
      const chatRoomExists = data.some(room => room.name === currentChannelName);
      if (!chatRoomExists) {
        // If the chat room does not exist, create it
        // console.log("Creating chat room:", currentChannelName);
        addDoc(ref, {
          name: currentChannelName,
          createdAt: new Date(),

        }).catch((error) => {
          console.log("Error creating chat room:", error);
        });
      } else {
        const room = data?.filter((room) => room?.name === currentChannelName)
        console.log("snap shot is found ", room)
        SetCurrentChatRoom(room)

      }
    });

    return unsubscribe;
  }, [currentChannelName]);
  // console.log(auth?.currentUser?.uid)
  useEffect(() => {
    if (CurrentChatRoom?.length > 0) {
      const messagesCollection = collection(db, `chatRooms/${CurrentChatRoom[0]?._id}/messages`);
      const unsubscribe = onSnapshot(messagesCollection, (querySnapshot) => {
        const orderedMessages = querySnapshot.docs.sort((a, b) => {
          return a.data().createdAt > b.data().createdAt ? -1 : 1;
        }).map((doc) => ({
          ...doc.data(),
          _id: doc.id,
          createdAt: doc.data().createdAt?.toDate(),
        }));
        setMessages(orderedMessages);
      });


      return unsubscribe;
    }

  }, [CurrentChatRoom])

  const onSend = async (newMessagesArray = []) => {
    // Handle image messages
    console.log("the new message ", newMessagesArray);

    try {
      const newMessages = [{
        _id: Math.random()?.toString(), // Generate a unique ID
        text: newMessagesArray?.text, // No text for image messages
        createdAt: new Date(), // Current date and time
        user: {
          _id: userId, // The ID of the current user
        },
        loading: true, // Indicator for loading state
      }];

      // Update the state with the temporary message
      setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));

      const imageMessages = newMessages.filter((message) => message.image);

      if (imageMessages.length > 0) {
        setText('');
        // Upload images to storage and update message with download URL
        const promises = imageMessages.map(async (message) => {
          const response = await uploadImage(message.image);
          return {
            ...message,
            image: response.downloadURL,
            loading: false, // Set loading to false after successful upload
            user: {
              _id: userId, // Add the user ID here
            },
          };
        });
        const uploadedMessages = await Promise.all(promises);
        setMessages((prevMessages) => GiftedChat.append(prevMessages, uploadedMessages));

        // const newMessage = {
        //   _id: Math.random().toString(), // Generate a unique ID
        //   text: null, // No text for image messages
        //   createdAt: new Date(), // Current date and time
        //   image: "",
        //   user: {
        //     _id: userId, // The ID of the current user
        //   },
        // };

        // // Append the new message to the messages array
        // setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessage));
        // Send image messages to Firestore
        // setMessages(prevMessages => GiftedChat.append(prevMessages, uploadedMessages));
        uploadedMessages.forEach(async (message) => {
          await addMessageToFirestore(message);
        });

        // Update the state with the actual image message

      } else {
        setText('');
        console.log("new message are ", newMessages);
        // Send text messages only
        const newMessage = {
          _id: Math.random().toString(), // Generate a unique ID
          text: newMessages[0]?.text, // No text for image messages
          createdAt: new Date(), // Current date and time
          user: {
            _id: userId, // The ID of the current user
          },
        };

        // Update the state with the actual text message

        // Save the new message to Firestore
        await addMessageToFirestore(newMessage);
        // setMessages(prevMessages => GiftedChat.append(prevMessages, [newMessage]));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setText('');
    }
  };
  const sendAudioMessage = async (audioUri) => {
    if (!audioUri) {
      alert('No audio recorded.');
      return;
    }

    // Upload the audio file and get the download URL
    const audioUrl = await uploadAudio(audioUri);

    // Create a new message object with the audio URL
    const newMessage = {
      _id: Math.random().toString(), // Generate a unique ID
      text: null, // No text for audio messages
      createdAt: new Date(), // Current date and time
      audio: audioUrl,
      user: {
        _id: userId, // The ID of the current user
      },
    };

    // Append the new message to the messages array
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessage));

    // Save the new message to Firestore
    await addMessageToFirestore(newMessage);
  };


  const uploadImage = async (image, values, ImageName, retryCount =  0) => {
    try {
      setIsUploading(true);
      const imageUrls = [];
  
      for (const imageUri of image) {
        const formData = new FormData();
        formData.append("file", {
          uri: imageUri,
          type: "image/jpeg", // Ensure this matches the file type
          name: `image_${Date.now()}.jpg`, // Generate a unique file name
        });
        formData.append("upload_preset", EXPO_PUBLIC_CLOUDINARY_PERSIST ); // Replace with your Cloudinary upload preset
  
        try {
          const response = await fetch("https://api.cloudinary.com/v1_1/dwtxbh9ms/image/upload", {
            method: "POST",
            body: formData,
          });
  
          if (!response.ok) {
            throw new Error(`Image upload failed with status: ${response.status}`);
          }
  
          const responseData = await response.json();
          const imageUrl = responseData.secure_url; // The URL of the uploaded image
  
          if (imageUrl) {
            imageUrls.push(imageUrl);
            console.log("The image URL:", imageUrl);
            return imageUrl
          } else {
            console.error("Error: imageUrl is undefined");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          // If upload fails and retries are not exhausted, retry
          if (retryCount < MAX_RETRIES -  1) {
            console.log(`Retrying upload... Attempt ${retryCount +  1}`);
            return uploadImage(image, values, ImageName, retryCount +  1);
          } else {
            console.error("Upload failed after maximum retries.");
          }
        }
      }
  
      // Assuming you want to dispatch the image URLs to your Redux store
      // dispatch(setCurrentRegisterProperties({ [ImageName]: imageUrls }));
  
      return imageUrls;
    } catch (error) {
      console.log("Error uploading image ", error);
    } finally {
      setIsUploading(false);
    }
  };
  
  
  const addMessageToFirestore = async (message) => {
    const messagesCollection = collection(db, `chatRooms/${CurrentChatRoom[0]?._id}/messages`);
    await addDoc(messagesCollection, {
      ...message,
      createdAt: new Date(),
    });
  };
  // Add this function inside your ChatRoom component
  const handleImageSelected = async (imageUri) => {
    setIsUploading(true); // Set isUploading to true when the upload starts

    try {
      // Upload the image and get the download URL
      const downloadURL = await uploadImage([imageUri], {}, 'image');
      // console.log("the download image uri ",downloadURL)
      // Create a new message object with the image URL
      const newMessage = {
        _id: Math.random().toString(), // Generate a unique ID
        text: null, // No text for image messages
        createdAt: new Date(), // Current date and time
        image: downloadURL,
        user: {
          _id: userId, // The ID of the current user
        },
      };

      // Append the new message to the messages array
      setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessage));

      // Save the new message to Firestore
      await addMessageToFirestore(newMessage);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false); // Set isUploading to false when the upload is complete
    }
  };
  const scrollToBottomComponent = () => {
    return <AntDesign name="down" size={20} color="#333" />
      ;
  };
  // Maximum number of upload attempts

  const uploadAudio = async (audioUri, retryCount =   0) => {
    try {
      // setIsUploading(true); // Uncomment if you have a state management for upload status
      const formData = new FormData();
      formData.append("file", {
        uri: audioUri,
        type: "audio/mpeg", // Set the correct MIME type for the audio file
        name: `audio_message_${Date.now()}.mp3`, // Give the file a unique name
      });
      formData.append("upload_preset",EXPO_PUBLIC_CLOUDINARY_PERSIST ); // Use the name of your upload preset
  
      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${EXPO_PUBLIC_CLOUDINARY_KEY}/upload`, {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error(`Audio upload failed with status: ${response.status}`);
        }
  
        const responseData = await response.json();
        const audioUrl = responseData.secure_url; // The URL of the uploaded audio file
        console.log("The audio URL:", audioUrl);
        return audioUrl; // Return the URL of the uploaded audio file
        
      } catch (error) {
        console.error("Error uploading audio:", error);
        // If upload fails and retries are not exhausted, retry
        if (retryCount < MAX_RETRIES -   1) {
          console.log(`Retrying upload... Attempt ${retryCount +   1}`);
          return uploadAudio(audioUri, retryCount +   1);
        } else {
          console.error("Upload failed after maximum retries.");
        }
      }
    } catch (error) {
      console.log("Error uploading audio ", error);
    }
  };
  
  


  if (!currentChannelName || !messages || !CurrentChatRoom) {
    return <LoadingScreen />
  }

  return (
    <View style={{ flex: 1, display: 'flex' }}>

      <GiftedChat
        alwaysShowSend
        scrollToBottomComponent={scrollToBottomComponent}
        scrollToBottom
        messages={messages}
        onSend={onSend}
        inverted
        user={{
          _id: userId, // Use user ID from your authentication system
        }}
        isAnimated
        isLoadingEarlier={true}
        renderMessageAudio={(props) => <CustomVoiceMessage {...props} />}

        renderLoading={() => {
          if (isUploading) {
            return (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            );
          }
        }} renderSend={(props) => {
          return (
            text?.length > 0 && !recording &&

            <Send
              {...props}
              style={{ marginBottom: height * 0.1 }}
              onSend={(mes) => onSend(mes)}
              text={text}
            >
              <View style={{ marginBottom: -height * 0.024, paddingLeft: 4, backgroundColor: Colors.primaryColor, padding: 1, borderRadius: width * 0.1 * 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center', height: width * 0.095, width: width * 0.1 }}>

                <Ionicons name="send" size={RFPercentage(2.4)} color="white" style={styles.icon} />
              </View>

            </Send>
          );
        }}
        renderActions={(props) => (
          text?.length === 0 &&
          <>
            <RenderVoiceActions onAudioRecorded={sendAudioMessage} {...props} setCurrentISRecording={setCurrentISRecording} />

            {
              !recording &&
              <Actions

                onPressActionButton={() => console.log("show image picker")}
                containerStyle={{
                  marginBottom: 8,
                  marginHorizontal: 5,
                  backgroundColor:Colors.primaryColor,
                  padding: 1, borderRadius: width * 0.09 * 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center', height: width * 0.09, width: width * 0.09
                }}
                icon={() => (
                  <View style={styles.actionsContainer}>
                    <View style={{ marginTop: -8 }} >
                      <CustomImagePicker onImageSelected={handleImageSelected} />
                    </View>
                  </View>
                )}
              />
            }

          </>
        )}
        messagesContainerStyle={{ backgroundColor: Colors.whiteColor, paddingBottom: height * 0.07 }}
        renderMessageText={(props) => <CustomMessageText {...props} />}
        renderInputToolbar={(props) => {
          return (<CustomInputToolbar
            recording={recording}
            setText={setText} textInputValue={text} {...props} containerStyle={{ borderTopWidth: 0, borderTopColor: '#333', }} />)
        }}
      />
      <View>
      </View>
    </View>
  );
};

export default ChatRoom;
const styles = StyleSheet.create({
  icon: {
    transform: [{ rotate: '180deg' }],
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // gap:width*0.07,
    // width:width*0.05,

    // backgroundColor:'blue'
  }
})


const RenderVoiceActions = (props) => {

  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const user = useSelector((state) => state?.user?.userData)

  async function startRecording() {
    try{

      console.log("start recording voice  ")
      // Request permissions if not already granted
      await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
  
    // Check if there's an existing recording and stop it
    if (recording) {
      await recording.stopAndUnloadAsync();
      console.log('Stopped and unloaded existing recording');
    }
  
    // Create a new recording
    const { recording: newRecording } = await Audio.Recording.createAsync(
      Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY
    );
      console.log('Created new recording', newRecording);
    // Update the state with the new recording
    setRecording(newRecording);
    props.setCurrentISRecording(newRecording);
    setIsRecording(true);
  }catch(err){
    console.log("error starting recording ",err)
  }
  }
  
  // In your RenderVoiceActions component
  async function stopRecording() {
    try {
      
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);

    // Call the onAudioRecorded callback with the audio URI
    props.onAudioRecorded(uri);
    setRecording(undefined);
    props.setCurrentISRecording(false)
    // setIsRecording(true);
    setIsRecording(false);
    setDuration(0)
  } catch (error) {
    console.log("error stop recording ",error)
  }
  }
  async function deleteRecording() {
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);

    // Call the onAudioRecorded callback with the audio URI
    // props.onAudioRecorded(uri);
    setRecording(undefined);
    props.setCurrentISRecording(false)
    // setIsRecording(true);
    setDuration(0)
    setIsRecording(false);
  }


  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setDuration((prevDuration) => prevDuration + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRecording]);



  return (
    <TouchableOpacity
      onPress={startRecording}
      // onPressOut={stopRecording}
      disabled={isRecording}
    >
      {isRecording ?
        <View style={{
          display: 'flex', flexDirection: 'row',
          backgroundColor:Colors.grayColor,
          alignSelf:'center',
          paddingBottom:10,
          paddingHorizontal:20,
          gap:30,
          // alignItems:'center',
          justifyContent:'center',

          borderRadius:width*0.2*0.5,
          marginHorizontal:width*0.2,
          // gap: 10
        }}>
          <MaterialIcons name="delete-outline" size={24}  style={{marginTop:8}} color={Colors.redColor} onPress={deleteRecording}/>
          <AppText style={{ fontSize: RFPercentage(2), color: Colors.primaryColor,marginTop:4 }} text={
            `يتم التسجيل ${duration}  ث ... `
          } />
          <Ionicons name="send" size={RFPercentage(2.4)} color={Colors.success} style={styles.icon} onPress={stopRecording} />

        </View> :
        <View style={{ marginBottom: 10 }}>
          <Ionicons name='mic' size={26} />
        </View>}
    </TouchableOpacity>
  );
};