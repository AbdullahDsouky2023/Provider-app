import { setUserData } from '../app/store/features/userSlice';
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.6:1337", // Set your base URL
});

export const createUser = async(data)=>{
    try {
     const createdUser = await api.post('/api/providers',{
        data:{

            ...data,
        }
        })
        console.log(createdUser,"this is the user will be created")
            return createdUser

    } catch (error) {
        console.log("Error creating the user ",error)
    }
}
export const getUserByPhoneNumber = async(phone)=>{
    try {
        // Remove the "+" symbol
        // +201144254129
        if(phone){
            console.log("user phone from user is ",typeof(phone))
            
            const user =    await api.get(`/api/providers?populate=*?filters[$and][0][phoneNumber][$eq]=`+phone)
            console.log("usus",user?.data?.data[0]?.attributes)
            if(user?.data?.data[0]?.attributes && user?.data?.data[0]?.attributes?.phoneNumber) {
                setUserData(user?.data?.data)
                console.log("userfound",user?.data?.data?.attributes)
                
                return user?.data?.data[0]
            }
            else {
                console.log("userfound abdullah not ",user?.data?.data)
                return null

            } 
        } 
    } catch (error) {
        console.log("Error creating the user ",error.message)
    }
}
export const getUserCurrentOrders= async(id)=>{
    try {
        if(id){            
            const user =    await api.get(`/api/providers/${id}?populate=*`)
            return user?.data?.data?.attributes?.orders?.data
        } 
    } catch (error) {
        console.log("Error getting the user ",error.message)
    }
}
export const updateUserData = async(id,data)=>{
try {
   const updatedUser =  await api.put(`/api/providers/${id}`,{
    data:{
        ...data
    }
    })
    console.log('====================================');
    console.log("update user",updatedUser);
    console.log('====================================');
    if(updateUserData) return true
    return false
} catch (error) {
    console.log('error updating the user ',error.message) 
}
}