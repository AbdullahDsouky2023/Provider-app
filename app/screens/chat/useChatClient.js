import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { userChatConfigData } from "./chatconfig";
import { useSelector } from "react-redux";

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);
  const { chatApiKey, chatUserId, chatUserToken, chatUserName } = userChatConfigData();
  const chatClient = StreamChat.getInstance(chatApiKey);
  const channel = useSelector((state) => state?.orders?.currentChatChannel);
  const user =
    chatUserId && chatUserName ? { id: chatUserId, name: chatUserName } : null;
  useEffect(() => {
    const setupClient = async () => {
      try {
        await chatClient.connectUser(user, chatUserToken);
        if (channel) {
          const globalChannel = chatClient.channel("messaging", channel, {
            name: channel,
          });
          await globalChannel.watch();
          setClientIsReady(true);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(
            `An error occurred while connecting the user: ${error.message}`
          );
        }
      }
    };
    if (!chatClient.userID) {
      setupClient();
    }
    return () => {
      chatClient.disconnectUser();
    };
  }, [clientIsReady]);

  return {
    clientIsReady,
    chatClient,
  };
};
