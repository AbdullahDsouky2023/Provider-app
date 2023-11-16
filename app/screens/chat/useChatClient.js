// useChatClient.js

import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { userChatConfigData } from './chatconfig';



export const useChatClient = () => {
  const [clientIsReady, setClientIsReady] = useState(false);
  const  {   chatApiKey,chatUserId,chatUserToken,chatUserName } = userChatConfigData()
  const chatClient = StreamChat.getInstance(chatApiKey);

  const user = {
    id: chatUserId,
    name: chatUserName,
  };
  useEffect(() => {
    const setupClient = async () => {
      try {
        await chatClient.connectUser(user, chatUserToken);
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
  }, []);

  return {
    clientIsReady,
  };
};
