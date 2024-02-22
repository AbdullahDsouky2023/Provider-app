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
import { EXPO_PUBLIC_BASE_URL } from "@env";
import { Ionicons, FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';


import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
// import LoadingScreen from '../loading/LoadingScreen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ActivityIndicator } from 'react-native-paper';
import AppText from '../../component/AppText';
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
        _id: Math.random().toString(), // Generate a unique ID
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

  const uploadImage = async (image, values, ImageName) => {
    try {
      setIsUploading(true)
      const imageIds = [];
      console.log("the items is ", image)
      console.log("the images array ", image)
      for (const imageUri of image) {
        const formData = new FormData();
        formData.append("files", {
          name: `Nijk_IMAGE_ORDER`,
          type: "image/jpeg",
          uri: Platform.OS === "ios" ? imageUri.replace("file://", "") : imageUri,
        });

        try {
          const response = await fetch(`${EXPO_PUBLIC_BASE_URL}/api/upload`, {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error(`Image upload failed with status: ${response.status}`);
          }

          const responseData = await response.json();
          const imageId = responseData[0]?.id;
          imageIds.push(imageId);
          console.log("the image id :", responseData[0]?.url)
          return responseData[0]?.url
        } catch (error) {
          console.error("Error uploading image:", error);
          // Handle error gracefully
        }
      }
      //   console.log("the image ids are ",imageIds)
      dispatch(setCurrentRegisterProperties({ [ImageName]: imageIds }));

      // Return the download URLs instead of dispatching to Redux store
      const downloadURLs = await Promise.all(imageIds.map(async (id) => {
        const url = `${EXPO_PUBLIC_BASE_URL}/api/images/${id}`;
        return url;
      }));

      return downloadURLs;
    } catch (error) {
      console.log("error uploadign image ", error)
    } finally {
      setIsUploading(false)

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
  const uploadAudio = async (audioUri) => {
    try {
      // setIsUploading(true);
      const formData = new FormData();
      formData.append("files", {
        name: `audio_message_${Date.now()}`, // Give the file a unique name
        type: "audio/mpeg", // Set the correct MIME type for the audio file
        uri: Platform.OS === "ios" ? audioUri.replace("file://", "") : audioUri,
      });

      try {
        const response = await fetch(`${EXPO_PUBLIC_BASE_URL}/api/upload`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Audio upload failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        const audioId = responseData[0]?.id;
        console.log("the audio id :", responseData[0]?.url);
        return responseData[0]?.url; // Return the URL of the uploaded audio file
      } catch (error) {
        console.error("Error uploading audio:", error);
        // Handle error gracefully
      }
    } catch (error) {
      console.log("error uploading audio ", error);
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
      Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
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