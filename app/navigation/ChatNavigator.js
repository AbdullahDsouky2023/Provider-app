import React from 'react'
import {Stack, createStackNavigator} from '@react-navigation/stack'

import { TransitionPresets } from "@react-navigation/stack";
import ChatScreen from '../screens/chat/ChatScreen';
import ChatRoom from '../screens/chat/ChatRoom';
import { CHAT_ROOM } from './routes';
import { ChatProvider, useChatContext } from '../context/ChatContext';
import { OverlayProvider } from 'stream-chat-expo';
import { useChatClient } from '../screens/chat/useChatClient';
import { StreamChat } from 'stream-chat';

import { ChannelList, Chat } from 'stream-chat-expo';
export default function ChatNavigator() {
    const Stack = createStackNavigator()
    const { clientIsReady } = useChatClient();
    const chatClient = StreamChat.getInstance("8a4bf25khwrq");
    const { setChannel } = useChatContext();

  return (
    <OverlayProvider>
      <Chat client={chatClient}>
  <ChatProvider>
    <Stack.Navigator
    screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
       <Stack.Screen name="chatScreen" component={ChatScreen} options={{ ...TransitionPresets.DefaultTransition }} />
       <Stack.Screen name={CHAT_ROOM} component={ChatRoom} options={{ ...TransitionPresets.DefaultTransition }} />
     
    </Stack.Navigator>
      </ChatProvider>
    </Chat>
    </OverlayProvider>
  )
}