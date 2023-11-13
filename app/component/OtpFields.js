import OTPTextView from "react-native-otp-textinput";
import { useNavigation } from "@react-navigation/native";

import { Sizes ,Colors,Fonts,} from "../constant/styles";
import { StyleSheet } from "react-native";
import { useState } from "react";

export default function OtpFields({setisLoading,otpInput,setOtpInput,confirmVerificationCode}) {
    const navigation = useNavigation()

    return (
      <OTPTextView
      
        containerStyle={{
          marginTop: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
          flexDirection:'row-reverse',
        }}
        
        handleTextChange={(text) => {
          setOtpInput(text)
          if (otpInput.length == 6) {
            setisLoading(true);
            setTimeout(() => {
              setisLoading(false);
              confirmVerificationCode(otpInput)
            }, 2000);
          }
        }}
        
        inputCount={6}
        keyboardType="numeric"
        tintColor={Colors.primaryColor}
        // ref={(ref) => {
        //   otpInputRef = ref;
        // }}
        offTintColor={Colors.bgColor}
        textInputStyle={styles.textFieldStyle }
        // value={otpInput}
      />
    );
  }

  const styles = StyleSheet.create({
    textFieldStyle: {
        borderBottomWidth: null,
        borderRadius: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.blackColor,
        borderWidth: 1.0,
        color:Colors.primaryColor,
        direction:'ltr',
        // ...Fonts.primaryColor18Medium,
        // padding:34,
        width:50,
        height:65,
        fontSize:22
    
      },
  })
