import { setUserData } from '../app/store/features/userSlice';
import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.6:1337", // Set your base URL
});

export const createUser = async(data)=>{
    try {
     const createdUser = await api.post('/api/users',{
            ...data,
            role:2,
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
            
            const user =    await api.get(`/api/users?filters[$and][0][phoneNumber][$eq]=`+phone)
            console.log("usus",user?.data)
            if(user?.data[0] && user?.data[0]?.phoneNumber) {
                setUserData(user?.data[0])
                console.log("userfound",user?.data)
                
                return user?.data[0]
            }
            else {
                console.log("userfound abdullah not ",user?.data)
                return null

            } 
        } 
    } catch (error) {
        console.log("Error creating the user ",error.message)
    }
}
export const getUserCurrentOrders= async(id)=>{
    try {
        // Remove the "+" symbol
        // +201144254129
        if(id){
            console.log("user phone from user is ",typeof(phone))
            
            const user =    await api.get(`/api/users/${id}?populate=*`)
            console.log("mom",user?.data?.orders)
            return user?.data?.orders
        } 
    } catch (error) {
        console.log("Error getting the user ",error.message)
    }
}
export const updateUserData = async(id,data)=>{
try {
   const updatedUser =  await api.put(`/api/users/${id}`,{
        ...data
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