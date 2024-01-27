import { StreamChat } from "stream-chat";
import { EXPO_PUBLIC_JWT_SECRET  } from '@env';
import JWT from 'expo-jwt';
import { useSelector } from "react-redux";
import { EXPO_PUBLIC_CHAT_API_KEY} from '@env'
const chatClient = StreamChat.getInstance(EXPO_PUBLIC_CHAT_API_KEY);
export const userChatConfigData = ()=>{
    const user = useSelector((state)=>state?.user?.userData)
    const chatData = useSelector((state)=>state?.user?.userStreamData)
     const chatApiKey = EXPO_PUBLIC_CHAT_API_KEY ;
     const chatUserToken = chatData?.token
     const chatUserId = chatData?.userId
     const chatUserName = user?.attributes?.name
     return {
        chatApiKey,
        chatUserToken,
        chatUserId,
        chatUserName
     }


}
export const generateUserToken = async (user) => {
try {
    const userId = `p-${user?.id}`
    const key = EXPO_PUBLIC_JWT_SECRET;
    
   const token =  JWT.encode({ user_id:userId}, key );
   const data = {
    token,
    userId
}
   return data
} catch (error) {
}
    
}

