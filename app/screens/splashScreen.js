import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, View, StatusBar, Image, StyleSheet, BackHandler } from "react-native";
import { Colors, Sizes } from "../constant/styles";
import { CircleFade } from 'react-native-animated-spinkit';
import { useFocusEffect } from "@react-navigation/native";
import Logo from "../component/Logo";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, userRegisterSuccess } from "../store/features/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserByPhoneNumber } from "../../utils/user";
import LocationModal from "../component/location/LocationModal";
import { getLocationFromStorage } from "../../utils/location";
import { auth } from "../../firebaseConfig";
import {BASE_URL } from '@env'
const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user?.user?.phoneNumber);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [locationConfirmed, setLocationConfirmed] = useState(false);

  useEffect(() => {
    // Check if the location is already confirmed
    AsyncStorage.getItem('userLocation').then((userLocation) => {
      if (userLocation) {
        setLocationConfirmed(true);
      } else {
        // Location not confirmed, show the modal
        setLocationModalVisible(true);
      }
    });
  }, []);

  const handleLocationConfirm = () => {
    // Location is now confirmed
    setLocationConfirmed(true);
    // Close the modal
    setLocationModalVisible(false);

  };
    const backAction = () => {
        BackHandler.exitApp();
        return true;
    }

    useEffect(() => {
        async function checkUserAndNavigate() {
      try {
  await getLocationFromStorage()
  console.log(BASE_URL)
    const userDataString = await AsyncStorage.getItem("userData");
    if (userDataString  && auth.currentUser !== null) {
        const userData = JSON.parse(userDataString);
        const gottenuser = await getUserByPhoneNumber(user)
        dispatch(setUserData(gottenuser));
        dispatch(userRegisterSuccess(userData));
        navigation.push("App");
    } else {
        navigation.push("Auth");
    }
  }
    catch (error) {
    console.log(error);
}}})
        
  useEffect(() => {
    async function checkUserAndNavigate() {
      try {
        await getLocationFromStorage()
        const userDataString = await AsyncStorage.getItem("userData");
        const userData = JSON.parse(userDataString);
        const validPhone = `${userData?.phoneNumber?.replace(/\s/g, "").trim()}`;
        const PhoneNumberValidated = convertPhoneTovalid(validPhone)
        console.log(PhoneNumberValidated," this is the use data in loca")
        if (userData?.phoneNumber ) {
          const gottenuser = await getUserByPhoneNumber(PhoneNumberValidated )
          dispatch(setUserData(gottenuser));
          console.log("this function was called to app with user gooten from strapio ",gottenuser)
          dispatch(userRegisterSuccess(userData));
          navigation.push("App");
        } else {
          console.log("this function was called to auth ")
          // navigation.push("App");
          navigation.push("Auth");
        }

      } catch (error) {
        console.log(error);
      }

    }

    checkUserAndNavigate();
  }, []);

  const convertPhoneTovalid=(phone)=>{
    const phoneNumberWithoutPlus = phone?.replace("+", "");
              
              // Convert the string to a number
              const phoneNumber = Number(phoneNumberWithoutPlus);
              return phoneNumber
  }


  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />

      {
        locationConfirmed ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Logo />
            <CircleFade
              size={45}
              color={Colors.primaryColor}
              style={{ alignSelf: 'center' }}
            />
          </View>

        ) :
          (
            <LocationModal visible={locationModalVisible} onConfirm={handleLocationConfirm} />

          )

      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  appLogoStyle: {
    width: 200.0,
    height: 200.0,
    alignSelf: 'center',
    marginBottom: Sizes.fixPadding * 4.0,
  },
})

export default SplashScreen;
