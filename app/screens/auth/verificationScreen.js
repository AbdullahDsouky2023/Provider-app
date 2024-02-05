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
import { getUserByPhoneNumber } from "../../../utils/user";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import useRegions from "../../../utils/useRegions";
import useOrders from "../../../utils/orders";

const { width ,height} = Dimensions.get("screen");

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
        return navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name:"App" }]
          }))
      } else if(!user) {
        return  navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name:"Register" ,
          params:{phoneNumber:phoneNumber}}],
          }))
      }
    } catch (error) {
      const errorMessage =
        errorMessages[error.message] ||
        "حدث خطأ غير معروف. الرجاء المحاولة مرة أخرى";
      Alert.alert(errorMessage);
      setOtpInput("")
    } finally {
      setOtpInput("");
      setisLoading(false)
    }
  };
  
  console.log("the current otp value is ",otpInput)
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
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ArrowBack />
        <View>
          <View style={styles.textContainer}>
            <AppText
              text={"verification"}
              style={{
                fontSize: RFPercentage(3.7),
                color: Colors.primaryColor,
                marginBottom: 10,
              }}
              centered={false}
            />
          <View style={{display:'flex',flexDirection:'row',width:width,gap:8,paddingHorizontal:10,alignItems:'flex-start'}}>
            <AppText
              text={`OTP Code Was Sent To`}
              // centered={false}
              style={{ fontSize:RFPercentage(2.1),color:Colors.blackColor }}
            />
            <AppText
              text={`+${phoneNumber}`}
              // centered={false}
              style={{ fontSize:RFPercentage(2),color:Colors.primaryColor,marginTop:4 }}
              />
              </View>
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
            textStyle={{
              fontSize:RFPercentage(2.2)
            }}
            style={{
              marginTop:otpInput.length !== 6?30:30,
              borderWidth:0,
              paddingVertical:height*0.02,
              width:width*0.85,
              alignSelf:'center',
              backgroundColor:otpInput.length === 6 ?Colors.primaryColor : Colors.grayColor}}
            disabled={otpInput.length !== 6 }
            onPress={confirmVerificationCode}
          />
           <View style={styles.sendMessasesContainer}>
            <AppText
              text={"didntReceiveOTP"}
              style={{
                fontSize: RFPercentage(2),
                paddingTop: resendDisabled ? 44 : 11,
                paddingRight: 20,
                color:Colors.grayColor
              }}
              centered={false}
            />
            <AppButton
              title={
                resendDisabled ? ` 00 :${secondsRemaining} ` : "Resend"
              }
              textStyle={{fontSize:RFPercentage(1.8),
                color:Colors.whiteColor}}
              style={{backgroundColor:Colors.primaryColor,
                borderWidth:0,
                
              }}
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
    marginTop: 40,
    paddingHorizontal:width*0.04,
    // marginRight: 25,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
