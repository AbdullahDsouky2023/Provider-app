import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useChatClient } from './useChatClient';

import { Channel, ChannelList, MessageInput, MessageList } from 'stream-chat-expo';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { CHAT_ROOM } from '../../navigation/routes';
import { useChatContext } from '../../context/ChatContext';
export default function ChatScreen({children}) {
  const navigation = useNavigation()
  const { clientIsReady,chatClient } = useChatClient();
  const { setChannel,channel } = useChatContext();
  const currentChatChannel = chatClient.activeChannels["messaging:channel"]
  const handleSelect =()=> {
    setChannel(currentChatChannel);
    console.log(channel)
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: CHAT_ROOM}],
      })
    )  }
  useEffect(()=>{
    if(clientIsReady) handleSelect()
  },[clientIsReady]) 
if (!clientIsReady) {
  return <Text>Loading chat ...</Text>
}
  return (
        <ChannelList  onSelect={(channel) =>handleSelect(channel) }/>
         
        
       
  )
}