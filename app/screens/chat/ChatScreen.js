import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useChatClient } from "./useChatClient";

import {
  ChannelList,
} from "stream-chat-expo";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { CHAT_ROOM } from "../../navigation/routes";
import { useChatContext } from "../../context/ChatContext";
import { useSelector } from "react-redux";
export default function ChatScreen({ children }) {
  const navigation = useNavigation();
  const { clientIsReady, chatClient } = useChatClient();
  const { setChannel, channel } = useChatContext();
  const currentChannelName = useSelector(
    (state) => state?.orders?.currentChatChannel
  );
  const currentChatChannel =
    chatClient?.activeChannels[`messaging:${currentChannelName}`];
  const handleSelect = () => {
    if (currentChatChannel) {
      setChannel(currentChatChannel);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: CHAT_ROOM,
              params: {
                channel: currentChatChannel,
              },
            },
          ],
        })
      );
    }
  };
  useEffect(() => {
    if (clientIsReady) handleSelect();
  }, [chatClient, clientIsReady, currentChannelName]);
  if (!clientIsReady || !chatClient) {
    return <Text>Loading chat ...</Text>;
  }
  return <ChannelList onSelect={(channel) => handleSelect(channel)} />;
}
