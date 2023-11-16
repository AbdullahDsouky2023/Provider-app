import { View, Text } from 'react-native'
import React from 'react'
import { useChatClient } from './useChatClient';

import { ChannelList } from 'stream-chat-expo';
import { useNavigation } from '@react-navigation/native';
import { CHAT_ROOM } from '../../navigation/routes';
import { useChatContext } from '../../context/ChatContext';
export default function ChatScreen({children}) {
  const navigation = useNavigation()
  const { clientIsReady } = useChatClient();
  const {channel, setChannel } = useChatContext();
  console.log("channel",setChannel)
  if (!clientIsReady) {
  setChannel("global")
  return <Text>Loading chat ...</Text>
}
  return (
        <ChannelList  onSelect={(channel) => {
        setChannel(channel);
        navigation.navigate(CHAT_ROOM);
      }}/>
       
  )
}