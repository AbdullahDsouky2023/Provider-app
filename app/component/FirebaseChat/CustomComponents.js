import React, { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth } from '../../../firebaseConfig';
import { GiftedChat, Bubble, MessageText,InputToolbar } from 'react-native-gifted-chat';
import { Colors, mainFont } from '../../constant/styles';
import { TextInput, View, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-native-paper';
import { Ionicons,MaterialIcons } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Text } from 'react-native';

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
      <Image source={{ uri: currentMessage.image }} style={styles.image} />
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
          <View style={styles.chatFooter}>
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
    const [FitHeight, setHeight] = useState(40); // Initial height

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
        style={[styles.composer,{height:FitHeight,borderRadius:FitHeight*0.2}]}
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
    width:width*0.80,
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