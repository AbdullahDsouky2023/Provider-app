import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  Image,
  StyleSheet,
  BackHandler,
} from "react-native";
import { CircleFade } from "react-native-animated-spinkit";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

import Logo from "../component/Logo";
import { setUserData, userRegisterSuccess } from "../store/features/userSlice";
import { getUserByPhoneNumber } from "../../utils/user";
import { Colors, Sizes } from "../constant/styles";
import LocationModal from "../component/location/LocationModal";
import { getLocationFromStorage } from "../../utils/location";
import { auth } from "../../firebaseConfig";
import useOrders from "../../utils/orders";
import { setOrders } from "../store/features/ordersSlice";
import useRegions from "../../utils/useRegions";
import { setRegions } from "../store/features/regionSlice";

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user?.user?.phoneNumber);
  const [locationModalVisible, setLocationModalVisible] = useState(false);
  const [locationConfirmed, setLocationConfirmed] = useState(false);
  const { data, isLoading, isError } = useRegions();
  const { data: orders } = useOrders();

  

  const handleLocationConfirm = () => {
    setLocationConfirmed(true);
    setLocationModalVisible(false);
  };

  const backAction = () => {
    BackHandler.exitApp();
    return true;
  };

  useEffect(() => {
    async function checkUserAndNavigate() {
      try {
        await getLocationFromStorage();
        const userDataString = await AsyncStorage.getItem("userData");
        if (userDataString && auth.currentUser !== null) {
          const userData = JSON.parse(userDataString);
          const gottenuser = await getUserByPhoneNumber(user);
          dispatch(setUserData(gottenuser));
          dispatch(userRegisterSuccess(userData));
          navigation.push("App");
        } else {
          navigation.push("Auth");
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
  const fetchData = async () => {
    if (data) {
      dispatch(setRegions(data));
      dispatch(setOrders(orders));
    } else if (isError) {
      console.log(isError);
      //   // Handle the error
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    async function checkUserAndNavigate() {
      try {
        await getLocationFromStorage();
        const userDataString = await AsyncStorage.getItem("userData");
        const userData = JSON.parse(userDataString);
        const validPhone = `${userData?.phoneNumber
          ?.replace(/\s/g, "")
          .trim()}`;
        const PhoneNumberValidated = convertPhoneTovalid(validPhone);
        if (userData?.phoneNumber) {
          const gottenuser = await getUserByPhoneNumber(PhoneNumberValidated);
          dispatch(setUserData(gottenuser));
        
          dispatch(userRegisterSuccess(userData));
          fetchData();
          navigation.push("App");
        } else {
          // navigation.push("App");
          navigation.push("Auth");
        }
      } catch (error) {
        console.log(error);
      }
    }

    checkUserAndNavigate();
  }, []);

  const convertPhoneTovalid = (phone) => {
    const phoneNumberWithoutPlus = phone?.replace("+", "");
    const phoneNumber = Number(phoneNumberWithoutPlus);
    return phoneNumber;
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backAction);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, [backAction])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />

      {locationConfirmed ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Logo />
          <CircleFade
            size={45}
            color={Colors.primaryColor}
            style={{ alignSelf: "center" }}
          />
        </View>
      ) : (
        <LocationModal
          visible={locationModalVisible}
          onConfirm={handleLocationConfirm}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appLogoStyle: {
    width: 200.0,
    height: 200.0,
    alignSelf: "center",
    marginBottom: Sizes.fixPadding * 4.0,
  },
});

export default SplashScreen;
