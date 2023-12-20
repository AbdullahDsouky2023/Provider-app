

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { EXPO_PUBLIC_BASE_URL} from '@env'

import { Colors } from "../../constant/styles";
import GeneralSettings from "../../component/Account/GeneralSettings";
import Logo from "../../component/Logo";
import AppText from "../../component/AppText";
import { useSelector } from "react-redux";
import { getUserById, updateUserData } from "../../../utils/user";
import { uploadToStrapi } from "../../../utils/UploadToStrapi";

const { width } = Dimensions.get('screen')

const AccountScreen = ({ navigation,route }) => {
  const user = useSelector((state)=>state.user?.user)
  const userData = useSelector((state)=>state?.user?.userData)
  // console.log("the user data",userData?.attributes?.name)
  const isFocused = useIsFocused();
  const [imageUri,setImageUrl]=useState('https://th.bing.com/th/id/R.e94860c29ac0062dfe773f10b3ce45bf?rik=SCqlsHg1S8oFDA&pid=ImgRaw&r=0')
  useEffect(()=>{
    (async()=>{
      try{

        const userImage = await AsyncStorage.getItem('userImage');
        const parsedUserImage = userImage ? JSON.parse(userImage) : null;
      setImageUrl(parsedUserImage || 'https://th.bing.com/th/id/R.e94860c29ac0062dfe773f10b3ce45bf?rik=SCqlsHg1S8oFDA&pid=ImgRaw&r=0');
     await uploadToStrapi(parsedUserImage,EXPO_PUBLIC_BASE_URL).then(async(res)=>{
        const formData = {
          image:res
        }
        return await updateUserData(userData?.id,formData);
      })
      console.log('diiii')
    }catch(error){
      console.log('error in account screen',error)
    }
    })()
    getUserData()
    
  },[])

  useEffect(() => {
    if (isFocused && route.params?.newImage) {
      const newImage = route.params.newImage;
      setImageUrl(newImage);
    }
  }, [isFocused, route.params?.newImage]);
  const getUserData = async () => {
    try {
      const userImage = await AsyncStorage.getItem('userImage');
      const parsedUserImage = userImage ? JSON.parse(userImage) : null;
      setImageUrl(parsedUserImage || 'https://th.bing.com/th/id/R.e94860c29ac0062dfe773f10b3ce45bf?rik=SCqlsHg1S8oFDA&pid=ImgRaw&r=0');
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
      <View style={styles.ImageContainer}>
          <Image source={{uri:imageUri}}
          style={styles.image}
          />
        </View>
        <AppText text={userData?.attributes?.name} style={{color:Colors.blackColor,marginBottom:10}}/>
        <GeneralSettings/>
      </View>
    </SafeAreaView>
  );
};


export default AccountScreen;
const styles = StyleSheet.create({
  ImageContainer:{
    paddingHorizontal:width*0.4,
    // backgroundColor:'red',
    paddingTop:width*0.05,
    paddingBottom:width*0.03,
    // marginTop:50,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  image :{
    height:width*0.3,
    // borderWidth:4,
    // borderColor:Colors.blueColor,
    width:width*0.3,
    margin:'auto',
    borderRadius:width*0.3*0.5,
  }
  
})