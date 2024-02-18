import React, { useEffect,useState } from "react";
import { Channel, MessageInput, MessageList , ImageUploadPreview, } from "stream-chat-expo";
import { useSelector } from "react-redux";
import { useChatClient } from "./useChatClient";
import LoadingScreen from "../loading/LoadingScreen";
import { InputBox } from "../../assets/chat/InputBox";
import { VoiceMessageAttachment } from "../../assets/chat/VoiceMessageAttchment";


export default function ChatRoom() {
  const { clientIsReady, chatClient,setIsInChatRoom } = useChatClient();

  const currentChannelName = useSelector(
    (state) => state?.orders?.currentChatChannel
  );
  const currentChatChannel =
    chatClient?.activeChannels[`messaging:${currentChannelName}`];
    useEffect(() => {

console.log("current chat chaneel",currentChannelName)
      setIsInChatRoom(true);
      return () => {
      //   // Set the isInChatRoom state to false when the component unmounts
        setIsInChatRoom(false);
      };
    }, []);
  
    
 
    
    
    if (!currentChatChannel || !clientIsReady) {
      return <LoadingScreen />;
  }
  return (
    <Channel  
    // Input={InputBox}
    // Card={VoiceMessageAttachment}

    channel={currentChatChannel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
}
