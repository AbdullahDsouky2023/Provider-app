import React, { useState, useEffect ,useRef} from 'react';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth } from '../../../firebaseConfig';
import { GiftedChat, Bubble, MessageText,InputToolbar } from 'react-native-gifted-chat';
import { Colors, mainFont } from '../../constant/styles';
import { TextInput, View, StyleSheet, Dimensions, TouchableOpacity, Image ,Text,Button} from 'react-native';
import { useTranslation } from 'react-i18next';
// import { Button, ProgressBar } from 'react-native-paper';
import { Ionicons,MaterialIcons } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Audio } from 'expo-av';
import { Feather ,AntDesign} from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
// import { Play } from 'stream-chat-expo';

// import R from '@carchaze/react-native-voice-message-player';

const { height , width } = Dimensions.get('screen')
export const CustomBubble = (props) => {
    return (
      <Bubble
        {...props}
        
        wrapperStyle={{
          left: {
            backgroundColor: "red"// Change the background color for messages from the left
          },
          right: {
            backgroundColor: "#EEF2F4", // Change the background color for messages from the right
          },
          
        }}
        
        textStyle={{
          left: {
            fontFamily:mainFont.bold,
            color: Colors.blackColor // Change the text color for messages from the left
          },
          right: {
            fontFamily:mainFont.bold,

            color: Colors.whiteColor // Change the text color for messages from the left
          },
        }}
      />
    );
  };
  export const renderMessageImage = ({ currentMessage }) => (
    <TouchableOpacity >
      <Image source={{ uri: currentMessage.image }} style={styles2.image} />
    </TouchableOpacity>
  );
export   const CustomMessageText = (props) => {
    return (
      <MessageText
        {...props}
        
        textStyle={{
          left: {
            color:Colors.blackColor,
            fontFamily:mainFont.bold,
            fontSize:RFPercentage(1.6)

            // Change the text color for messages from the left
          },
          right: {
            color: Colors.whiteColor,
            fontFamily:mainFont.bold,
            fontSize:RFPercentage(1.6)
            // Ce text color for messages from the right
          },
        }}
      />
    );
  };
export const CustomMessageViewer=(props)=>{
    const { imagePath } = props
    if (imagePath) {
        console.log("the image uri i ",imagePath)
        return (
          <View style={styles2.chatFooter}>
            <Image source={{uri: imagePath}} style={{height: height*0.1,borderRadius:15, width: width*0.2}} />
            <TouchableOpacity
              onPress={() => props.handleImageSelected(imagePath)}
              style={styles.buttonFooterChatImg}
            >
<MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        );
      }
}
export const CustomInputToolbar = (props) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbarContainer}
      primaryStyle={styles.inputToolbarPrimary}
      secondaryStyle={styles.inputToolbarSecondary}
      
    //   renderSend={(props) => <CustomSend {...props} />}
      renderComposer={(props) => <CustomComposer  {...props} text={props.text} setText = {props.setText}  />}
    //   renderActions={}
    />
  );
};
export const CustomComposer = (props) => {
    const { t } = useTranslation();
    const [FitHeight, setHeight] = useState(height*0.17); // Initial height

  const onContentSizeChange = (contentWidth, contentHeight) => {
    // Adjust the height based on the content height
    setHeight(contentHeight < 40 ? 40 : contentHeight);
  };
    console.log("the current value in input is ",props?.textInputValue)
    return (
      <TextInput
        {...props}
        cursorColor={Colors.primaryColor}
        placeholder={t("Type a message....")}
        placeholderTextColor='#999'
        style={[styles.composer,{height:FitHeight,borderRadius:FitHeight*0.2, width:props?.textInputValue ? width*0.82 : width * 0.72,display:props?.recording ? 'none':'flex'}]}
        multiline={true}
        
        numberOfLines={4}
        onContentSizeChange={(e) =>
            onContentSizeChange(e.nativeEvent.contentSize.width, e.nativeEvent.contentSize.height)
          }
        onChangeText={(text) =>{
            props.setText(text)
        }}
        value={props?.textInputValue}
      
      
      />
    );
  };
export const CustomSend = (props) => {
    const { t} = useTranslation()
  return (
    <View style={styles.sendContainer}>
      <Button
        {...props}
        textColor={Colors.whiteColor}
        // placeholderTextColor={Colors.whiteColor}
        style={styles.send}
      >
    <Ionicons name="send" size={24} color="white" />

     
     </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  inputToolbarContainer: {
    backgroundColor: Colors.whiteColor,
    padding:  10,
     paddingVertical:20,
  },
  inputToolbarPrimary: {
    flex:  1,
  },
  inputToolbarSecondary: {
    flex:  0,
  },
  composer: {
      borderColor: '#ccc',
      borderWidth:  1,
      borderRadius:  height*0.01,
    // width:width*0.80,
    paddingLeft:  10,
    padding:10,
    fontFamily:mainFont.bold,
    writingDirection:'rtl',
    textAlign:'right',
    // minHeight:height*0.0,
    // height:  "fit",
    // maxHeight:height*0.05,
    // height:"auto"
    // tintColor:Colors.primaryColor
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:5
  },
  send: {
    color: Colors.whiteColor,
    fontSize:  18,
    fontWeight: '600',
    
    backgroundColor:Colors.primaryColor,
    
    padding:2,
    paddingHorizontal:6,
    borderRadius:15
  },
  chatFooter:{
    backgroundColor:"red",
    borderWidth:1,
    position:'relative'
  },
  buttonFooterChatImg:{
    backgroundColor:'blue',
    height:50,
    width:50,
    borderRadius:50,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    top:20,
    left:0
  }
});





export function CustomVoiceMessage({ currentMessage }) {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  async function playSound() {
    console.log('Loading Sound');
    const { sound, status } = await Audio.Sound.createAsync({ uri: currentMessage.audio });
    setSound(sound);
    setDuration(status.durationMillis /  1000); // Convert duration to seconds
    console.log('Playing Sound');
    await sound.playAsync();
    setIsPlaying(true);

    // Add a listener for the sound to complete
    sound.setOnPlaybackStatusUpdate(status => {
      if (status.didJustFinish) {
        setIsPlaying(false);
        console.log("sound findis")
        sound.unloadAsync(); // Unload the sound when it's done playing
      }
    });
  }

  useEffect(() => {
    if (sound) {
      const updatePosition = async () => {
        const currentPosition = await sound.getStatusAsync();
        setPosition(currentPosition.positionMillis /  1000); // Convert position to seconds
      };

      const intervalId = setInterval(updatePosition,  1000); // Update position every second

      return () => {
        clearInterval(intervalId);
        sound.unloadAsync();
      };
    }
  }, [sound]);

  // const safeProgress = Math.min(Math.max(position / duration,  0),  1);
  return (
    <View style={voiceStyles.container}>
      
      {
        isPlaying ?   
        <View style={voiceStyles.audio}>

        
{/* <ProgressBar progress={safeProgress} color="#00695C" /> */}

        <AntDesign key="pause" name="pausecircleo" size={24} color={Colors.whiteColor}
        onPress={() => {
          sound.pauseAsync();
          setIsPlaying(false);
        }} />
        </View>
        : 
        <View style={voiceStyles.audio}>
        <Feather key="play" name="play" size={24} color={Colors.whiteColor} onPress={() => {
          playSound();
          setIsPlaying(true);
        }}  />
      </View>
      }
    </View>
  );
}

const voiceStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: height *  0.05,
    width: width * 0.3,
    // backgroundColor: Colors.primaryColor,
    borderRadius: width * 0.3 *  0.5
  },
  audio:{
    backgroundColor:Colors.primaryColor,
    padding:7,
borderRadius:25,
display:'flex',
    justifyContent:'center',
    alignItems:'center',
  }
});
