// useChatClient.js

import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { userChatConfigData } from './chatconfig';
import { useSelector } from 'react-redux';



export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);
  const  {   chatApiKey,chatUserId,chatUserToken,chatUserName } = userChatConfigData()
  const chatClient = StreamChat.getInstance(chatApiKey);
  const channel = useSelector((state)=>state.orders.currentChatChannel)
  const user = chatUserId && chatUserName ? { id: chatUserId, name: chatUserName } : null;
console.log("the chat user is ",user)
  useEffect(() => {
    const setupClient = async () => {
      try {
        await chatClient.connectUser(user, chatUserToken);
        const globalChannel = chatClient.channel('messaging',"channel", {
          name: 'الاودر',
        });
        await globalChannel.watch({ watchers: { limit: 100 } });
        setClientIsReady(true);
      } catch (error) {
        if (error instanceof Error) {
          console.error(`An error occurred while connecting the user: ${error.message}`);
        }
      }
    };

    if (!chatClient.userID) {
      setupClient();
    }
    if(chatClient) return ()=> chatClient.disconnectUser()
  }, []);

  return {
    clientIsReady,
    chatClient
  };
};
