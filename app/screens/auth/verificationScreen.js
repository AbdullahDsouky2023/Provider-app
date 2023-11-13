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
import { CommonActions } from "@react-navigation/native";

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
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getUserByPhoneNumber } from "../../../utils/user";

const { width } = Dimensions.get("screen");

const VerificationScreen = ({ navigation, route }) => {
  const [isLoading, setisLoading] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [resendDisabled, setResendDisabled] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(30);
  const dispatch = useDispatch();

  const { result, handleSendVerificationCode, phoneNumber } = route.params;


  const confirmVerificationCode = async () => {
    try {
      const res = await result?.confirm(otpInput);
      
      // Double-check the query and phone number
      // console.log("PhoneNumberValidated:", phoneNumber);
      
        
        setResendDisabled(true);
        setSecondsRemaining(30);
        dispatch(userRegisterSuccess(auth?.currentUser));
        await AsyncStorage.setItem("userData", JSON.stringify(auth?.currentUser));
        const user = await getUserByPhoneNumber(phoneNumber)
        console.log("userBeforeChecick",user)
      if (user) {
        console.log("User found verficICtion");
        dispatch(setUserData(user[0]))
        return navigation.navigate("App")
      } else if(!user) {
        console.log("User not found verficICtion");
        return navigation.navigate("Register", { phoneNumber })

      }
    } catch (error) {
      console.log("Error from verification screen:", error?.message);
      const errorMessage =
        errorMessages[error.message] ||
        "حدث خطأ غير معروف. الرجاء المحاولة مرة أخرى";
      Alert.alert(errorMessage);
    } finally {
      setOtpInput("");
    }
  };

const convertPhoneTovalid=(phone)=>{
  const phoneNumberWithoutPlus = phone?.replace("+", "");
            
            // Convert the string to a number
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
              style={{ fontSize: 17 }}
            />
          </View>
          <OtpFields
            setisLoading={setisLoading}
            setOtpInput={setOtpInput}
            otpInput={otpInput}
            confirmVerificationCode={(otpInput) =>
              confirmVerificationCode(otpInput)
            }
          // clearOtpInput={clearOtpInput} // Pass the clearOtpInput function
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
                paddingTop: 44,
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
