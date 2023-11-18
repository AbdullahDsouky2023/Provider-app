import React from "react";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";
import { useSelector } from "react-redux";
import { useChatClient } from "./useChatClient";
import LoadingScreen from "../loading/LoadingScreen";

export default function ChatRoom() {
  const { clientIsReady, chatClient } = useChatClient();
  const currentChannelName = useSelector(
    (state) => state?.orders?.currentChatChannel
  );
  const currentChatChannel =
    chatClient?.activeChannels[`messaging:${currentChannelName}`];

  if (!currentChatChannel || !clientIsReady) {
    return <LoadingScreen />;
  }
  return (
    <Channel channel={currentChatChannel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
}
