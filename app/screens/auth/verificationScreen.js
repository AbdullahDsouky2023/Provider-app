import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../../constant/styles";
import ArrowBack from "../../component/ArrowBack";
import AppButton from "../../component/AppButton";
import AppText from "../../component/AppText";
import LoadingModal from "../../component/Loading";
import OtpFields from "../../component/OtpFields";
import { errorMessages } from "../../data/signin";
import { setUserData, userRegisterSuccess } from "../../store/features/userSlice";
import { auth, db } from "../../../firebaseConfig";
import { getUserByPhoneNumber } from "../../../utils/user";
import { setRegions } from "../../store/features/regionSlice";
import { setOrders } from "../../store/features/ordersSlice";
import useRegions from "../../../utils/useRegions";
import useOrders from "../../../utils/orders";

const { width } = Dimensions.get("screen");

const VerificationScreen = ({ navigation, route }) => {
  const [isLoading, setisLoading] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [resendDisabled, setResendDisabled] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(30);
  const dispatch = useDispatch();

  const { result, handleSendVerificationCode, phoneNumber } = route.params;
  const { data:regions, isError } = useRegions();
  const { data: orders } = useOrders();

  const confirmVerificationCode = async () => {
    try {
      setisLoading(true)
      const res = await result?.confirm(otpInput);
      
      
        setResendDisabled(true);
        setSecondsRemaining(30);
        dispatch(userRegisterSuccess(auth?.currentUser));
        await AsyncStorage.setItem("userData", JSON.stringify(auth?.currentUser));
        const user = await getUserByPhoneNumber(phoneNumber)
      if (user) {
        dispatch(setUserData(user));
        dispatch(userRegisterSuccess(user));
        console.log("********user",user)
        return navigation.navigate("App")
      } else if(!user) {
        return navigation.navigate("Register", { phoneNumber })
      }
    } catch (error) {
      const errorMessage =
        errorMessages[error.message] ||
        "حدث خطأ غير معروف. الرجاء المحاولة مرة أخرى";
      Alert.alert(errorMessage);
    } finally {
      setOtpInput("");
      setisLoading(false)
    }
  };

const convertPhoneTovalid=(phone)=>{
  const phoneNumberWithoutPlus = phone?.replace("+", "");
  const phoneNumber = Number(phoneNumberWithoutPlus);
  return phoneNumber
}
  useEffect(() => {
    if (resendDisabled) {
      const timer = setInterval(() => {
        if (secondsRemaining > 0) {
          setSecondsRemaining(secondsRemaining - 1);
        } else {
          setResendDisabled(false); // Enable the "Resend SMS" button
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [resendDisabled, secondsRemaining]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ArrowBack />
        <View>
          <View style={styles.textContainer}>
            <AppText
              text={"verification"}
              style={{
                fontSize: 28,
                color: Colors.primaryColor,
                marginBottom: 10,
              }}
              centered={false}
            />
            <AppText
              text={"enterOTPCode"}
              centered={false}
              style={{ fontSize: 17,maxWidth :width*0.75  }}
            />
          </View>
          <OtpFields
            setisLoading={setisLoading}
            setOtpInput={setOtpInput}
            otpInput={otpInput}
            confirmVerificationCode={(otpInput) =>
              confirmVerificationCode(otpInput)
            }
          />
          <AppButton
            title={"Continue"}
            path={"Register"}
            // disabled={otpInput.length === 6 }
            onPress={confirmVerificationCode}
          />
          <View style={styles.sendMessasesContainer}>
            <AppText
              text={"didntReceiveOTP"}
              style={{
                fontSize: 18,
                marginTop: "12%",
                paddingRight: 20,
              }}
              centered={false}
            />
            <AppButton
              title={
                resendDisabled ? ` ارسال(${secondsRemaining}s)` : "ارسال SMS"
              }
              disabled={resendDisabled}
              onPress={() => {
                setResendDisabled(true);
                setSecondsRemaining(30);
                handleSendVerificationCode();
              }}
            />
          </View>
        </View>
      </ScrollView>
      <LoadingModal visible={isLoading} />
    </SafeAreaView>
  );
};

export default VerificationScreen;
const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    alignItems: "flex-start",
    marginTop: 10,
    paddingHorizontal: 25,
  },
  sendMessasesContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    // marginRight: 25,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
