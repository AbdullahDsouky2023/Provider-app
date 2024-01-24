import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { EXPO_PUBLIC_BASE_URL } from "@env";
import * as Linking from "expo-linking";

import { Colors } from "../../constant/styles";
import GeneralSettings from "../../component/Account/GeneralSettings";
import Logo from "../../component/Logo";
import AppText from "../../component/AppText";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-virtualized-view";
// import { SocailLinks } from "../../data/SocialLinks";
import SocailLinksComponent from "../../component/Account/SocailLinksComponent";
import AppButton from "../../component/AppButton";
import { auth } from "../../../firebaseConfig";
import { CommonActions } from "@react-navigation/native";

const { width } = Dimensions.get("screen");

const AccountScreen = ({ navigation, route }) => {
  const userData = useSelector((state) => state?.user?.userData);

  // const isFocused = useIsFocused();
  // const [imageUri,setImageUrl]=useState('https://th.bing.com/th/id/R.e94860c29ac0062dfe773f10b3ce45bf?rik=SCqlsHg1S8oFDA&pid=ImgRaw&r=0')
  // useEffect(()=>{
  //   (async()=>{
  //     try{

  //       const userImage = await AsyncStorage.getItem('userImage');
  //       const parsedUserImage = userImage ? JSON.parse(userImage) : null;
  //     setImageUrl(parsedUserImage || 'https://th.bing.com/th/id/R.e94860c29ac0062dfe773f10b3ce45bf?rik=SCqlsHg1S8oFDA&pid=ImgRaw&r=0');
  //    await uploadToStrapi(parsedUserImage,EXPO_PUBLIC_BASE_URL).then(async(res)=>{
  //       const formData = {
  //         image:res
  //       }
  //       return await updateUserData(userData?.id,formData);
  //     })
  //     console.log('diiii')
  //   }catch(error){
  //     console.log('error in account screen',error)
  //   }
  //   })()
  //   getUserData()

  // },[])

  // useEffect(() => {
  //   if (isFocused && route.params?.newImage) {
  //     const newImage = route.params.newImage;
  //     setImageUrl(newImage);
  //   }
  // }, [isFocused, route.params?.newImage]);
  // const getUserData = async () => {
  //   try {
  //     const userImage = await AsyncStorage.getItem('userImage');
  //     const parsedUserImage = userImage ? JSON.parse(userImage) : null;
  //     setImageUrl(parsedUserImage || 'https://th.bing.com/th/id/R.e94860c29ac0062dfe773f10b3ce45bf?rik=SCqlsHg1S8oFDA&pid=ImgRaw&r=0');
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.removeItem("userData");

      // Inside your sign-out function:
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Auth" }], // Replace 'Login' with the name of your login screen
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ScrollView>
         <View style={styles.LogoStyles}> 
            {/* <Logo /> */}
          </View> 
          {/* <View style={styles.ImageContainer}>
          <Image source={{uri:imageUri}}
          style={styles.image}
          />
          <AppText text={userData?.username} style={{color:Colors.blackColor,marginBottom:10}}/>
        </View> */}
          <GeneralSettings />
          <AppText text={"Our Accounts On Social Media"} style={styles.title} />
          <SocailLinksComponent />
          <TouchableWithoutFeedback
            onPress={() => Linking.openURL("https://njik.sa/")}
          >
            <View>
              <AppText text={"www.Njik.sa"} style={styles.website} />
            </View>
          </TouchableWithoutFeedback>
          {/* <AppButton title={'Sign Out'} onPress={handleSignOut}/> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  ImageContainer: {
    paddingHorizontal: width * 0.4,
    // backgroundColor:'red',
    paddingTop: width * 0.05,
    paddingBottom: width * 0.03,
    // marginTop:50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: width * 0.3,
    // borderWidth:4,
    // borderColor:Colors.blueColor,
    width: width * 0.3,
    margin: "auto",
    borderRadius: width * 0.3 * 0.5,
  },
  title: {
    fontSize: 14,
    paddingVertical: 10,
  },
  website: {
    fontSize: 14,
    paddingVertical: 10,
    color:Colors.primaryColor
  },
  LogoStyles: {
    padding: 17,
    marginTop:30
  },
});
