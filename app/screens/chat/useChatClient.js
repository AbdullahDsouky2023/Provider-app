import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { userChatConfigData } from "./chatconfig";
import { useSelector } from "react-redux";

export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);
  const { chatApiKey, chatUserId, chatUserToken, chatUserName } = userChatConfigData();
  const chatClient = StreamChat.getInstance(chatApiKey);
  const channel = useSelector((state) => state?.orders?.currentChatChannel);
  const [isInChatRoom, setIsInChatRoom] = useState(false);

  const user = chatUserId && chatUserName ? { id: chatUserId, name: chatUserName } : null;
  useEffect(() => {
    const setupClient = async () => {
      try {
        
        if (channel) {
          await chatClient.connectUser(user, chatUserToken);
          // chatClient.setLocale('ar');
          const globalChannel = chatClient.channel("messaging", channel);
          await globalChannel.watch( );
          setClientIsReady(true);
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(
            `An error occurred while connecting the user: ${error.message}`,"userDA",user
          );
        }
      }
    };
    if (!chatClient.userID && channel) {
      setupClient();
    }
   
  }, [chatClient, channel]);
  
  useEffect(() => {
    return () => {
      if (!isInChatRoom) {
        chatClient.disconnectUser();
      }
      // Set the isInChatRoom state to false when the chat client is ready
      setIsInChatRoom(false);
    };
  }, [ ]);
  
  // In your ChatRoom component
  useEffect(() => {
    // Set the isInChatRoom state to true when the component mounts
    setIsInChatRoom(true);
  }, []);


  return {
    clientIsReady,
    chatClient,
    setIsInChatRoom
  };
};
