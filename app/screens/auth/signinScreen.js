import React, { useState, useCallback, useRef } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { signInWithPhoneNumber } from "firebase/auth";

import AppText from "../../component/AppText";
import AppButton from "../../component/AppButton";
import PhoneNumberTextField from "../../component/PhoneInput";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import Logo from "../../component/Logo";
import { auth, firebaseConfig } from "../../../firebaseConfig";
import { errorMessages } from "../../data/signin";

const SigninScreen = ({ navigation }) => {
  const [disabled, setDisabled] = useState(true);
  const [state, setState] = useState({ phoneNumber: null });
  const recaptchaVerifier = useRef(null);

  const updateState = (data) => {
    setState((state) => ({ ...state, ...data }));
    if (data.phoneNumber.length === 12) setDisabled(false);
    else setDisabled(true);
  };

  const handleSendVerificationCode = async () => {
    try {
      setDisabled(true);
      const phoneNumberValidToFirebase = `+20${phoneNumber}`;
      const validPhone = `${phoneNumberValidToFirebase.replace(/\s/g, "").trim()}`;
      const PhoneNumberValidated = convertPhoneTovalid(validPhone)
      // navigation.navigate("Register", {
      //   verifiedPhone:PhoneNumberValidated
      // });

      const result = await signInWithPhoneNumber(
        auth,
        phoneNumberValidToFirebase,
        recaptchaVerifier.current
      );
          console.log('this is the number from the sign page ',PhoneNumberValidated)
      if (result.verificationId) {
        navigation.navigate("Verification", {
           result,
          handleSendVerificationCode,
          phoneNumber:PhoneNumberValidated
        });
        setDisabled(false);
      }
    } catch (error) {
      const errorMessage = errorMessages[error.message];

      console.log("the error is ", errorMessage, error.message);
      Alert.alert(errorMessage || "حدث خطأ غير معروف. الرجاء المحاولة مرة أخرى");    
    } finally {
      setDisabled(false);
    }
  };
  const convertPhoneTovalid=(phone)=>{
    const phoneNumberWithoutPlus = phone?.replace("+", "");
              
              // Convert the string to a number
              const phoneNumber = Number(phoneNumberWithoutPlus);
              return phoneNumber
  }

  const { phoneNumber } = state;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Logo />
          <View style={{ flex: 1, alignItems: "center" }}>
            <AppText
              centered={true}
              text={"Signin with Phone Number"}
              style={{ marginBottom: 10 }}
            />
          </View>
          <PhoneNumberTextField
            phoneNumber={phoneNumber}
            updateState={updateState}
          />
          <View style={{ backgroundColor: "red" }}>
            <FirebaseRecaptchaVerifierModal
              style={{ backgroundColor: "red" }}
              ref={recaptchaVerifier}
              firebaseConfig={firebaseConfig}
            />
          </View>
          <AppButton
            path={"Verification"}
            title={"Continue"}
            disabled={disabled}
            onPress={() => handleSendVerificationCode()}
          />
          <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
            <AppText
              text={"We'll send OTP for Verification"}
              style={{
                marginTop: Sizes.fixPadding - 5.0,
                ...Fonts.grayColor18Medium,
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    backgroundColor: "#FFF",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SigninScreen;
