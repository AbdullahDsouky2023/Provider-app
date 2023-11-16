import { StreamChat } from "stream-chat";
import { JWT_SECRET } from '@env';
import JWT from 'expo-jwt';
import { useSelector } from "react-redux";

const chatClient = StreamChat.getInstance('8a4bf25khwrq');

export const userChatConfigData = ()=>{
    const chatData = useSelector((state)=>state?.user?.userStreamData)
     const chatApiKey = '8a4bf25khwrq';
     const chatUserToken = chatData?.token
     const chatUserId =  chatData?.userId
     const chatUserName =  chatData?.userId

     return {
        chatApiKey,
        chatUserToken,
        chatUserId,
        chatUserName
     }


}
export const generateUserToken = async (user) => {
try {
    const userId = `${user?.attributes?.name?.replace(/\s+/g, '-')}-${user.id}`;
    const key = JWT_SECRET;
    
   const token =  JWT.encode({ ...user,user_id:userId}, key);
   const data = {
    token,
    userId
}
   return data
} catch (error) {
}
    
}

