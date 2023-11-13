import React from "react";
import IntlPhoneInput from "react-native-intl-phone-input";
import { StyleSheet } from "react-native";

import { Sizes, Fonts, Colors } from "../constant/styles";

export default function PhoneNumberTextField({ phoneNumber, updateState }) {
  return (
    <IntlPhoneInput
      onChangeText={({ phoneNumber }) => {
        updateState({ phoneNumber: phoneNumber });
      }}
      
      defaultCountry="EG"
      
      containerStyle={styles.phoneNumberTextFieldStyle}
      dialCodeTextStyle={{
        ...Fonts.blackColor17Medium,
        marginLeft: Sizes.fixPadding - 5.0,
      }}
      
      phoneInputStyle={{
        flex: 1,
        paddingRight: Sizes.fixPadding,
        ...Fonts.blackColor17Medium,
        flexDirection: "column",
        textAlign: "left",  // Set text alignment to left
        direction: "ltr",  // Set text direction to left-to-right (ltr)
      }}
      placeholder="رقم الهاتف"
    />
  );
}

const styles = StyleSheet.create({
  phoneNumberTextFieldStyle: {
    borderColor: Colors.primaryColor,
    color: Colors.primaryColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    marginHorizontal: Sizes.fixPadding,
    direction: "rtl",  // Set direction to right-to-left (rtl)
    display: 'flex',
    flexDirection: 'row-reverse',
  },
});
