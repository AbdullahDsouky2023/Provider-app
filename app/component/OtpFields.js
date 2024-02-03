import OTPTextView from "react-native-otp-textinput";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from 'react'
import { Sizes, Colors, mainFont } from "../constant/styles";
import { StyleSheet, I18nManager, Dimensions } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { Text } from "react-native";
import LoadingModal from "./Loading";
const { width, height } = Dimensions.get('screen')
export default function OtpFields({ setisLoading, otpInput, setOtpInput, confirmVerificationCode, inputCount }) {
  const navigation = useNavigation();
  const [value, setValue] = useState(otpInput);
  const ref = useBlurOnFulfill({ value, cellCount: inputCount });
  const [isLoading, setLoading] = useState(false);

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    setValue(otpInput);
  }, [otpInput]);

  return (
    <>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={(newValue) => {
          setValue(newValue);
          setOtpInput(newValue);
        }}
        cellCount={6}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
        on
        onFulfill={(code) => {
          setLoading(true);
          setTimeout(() => {
            //  setisLoading(false);
            confirmVerificationCode(code);
          }, 10000);
        }}
      />
      <LoadingModal visible={isLoading} />

    </>
  );
}


const styles = StyleSheet.create({
  root: { flex: 1, flexDirection: 'row', backgroundColor: 'red', padding: 10 },
  title: { textAlign: 'center', fontSize: 30, },
  codeFieldRoot: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row-reverse',
    width: width * 1,
    alignItems: 'center', justifyContent: 'center',
    gap: width * 0.01
  },
  cell: {
    width: width * 0.14,
    height: height * 0.082,
    lineHeight: 40,
    backgroundColor:'white',
    color: Colors.primaryColor
    , fontSize: RFPercentage(3.4),
    borderWidth: 2,
    borderWidth: 1,
    paddingVertical: height * 0.025,
    fontFamily: mainFont.bold,

    borderRadius: 10,
    borderColor: Colors.grayColor,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: Colors.primaryColor,
    fontFamily: mainFont.bold
  },
});

/* <OTPTextView
      
        containerStyle={{
          marginTop: Sizes.fixPadding * 2.0,
          marginHorizontal: Sizes.fixPadding * 2.0,
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          flexDirection:I18nManager.isRTL ? 'row-reverse' : 'row',
        }}
        
        handleTextChange={(text) => {
          setOtpInput(text)
          if (otpInput.length == 6) {
            setisLoading(true);
            setTimeout(() => {
              setisLoading(false);
              confirmVerificationCode(otpInput)
            }, 100);
          }
        }}
        
        inputCount={6}
        keyboardType="numeric"
        tintColor={Colors.primaryColor}
        offTintColor={Colors.bgColor}
        textInputStyle={styles.textFieldStyle }
      /> */