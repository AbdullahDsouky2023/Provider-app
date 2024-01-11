import React from "react";
import IntlPhoneInput from "react-native-intl-phone-input";
import { StyleSheet, I18nManager } from "react-native";

import { Sizes, Fonts, Colors } from "../constant/styles";

export default function PhoneNumberTextField({ phoneNumber, updateState }) {
  return (
    <IntlPhoneInput
      onChangeText={(e) => {
        const countryCode = e.dialCode;
        const length = e.selectedCountry.mask.length;
        console.log(e);
        updateState({ phoneNumber: e.phoneNumber, countryCode, length }); // Pass the country code to the parent component
      }}
      flagStyle={{ display: "none" }}
      defaultCountry="EG"
      containerStyle={styles.phoneNumberTextFieldStyle}
      dialCodeTextStyle={{
        ...Fonts.blackColor17Medium,
        paddingVertical: 5,
        paddingLeft: Sizes.fixPadding - 5.0,
        fontSize: 17,
        textAlign: "left", // Set text alignment to left
        direction: "ltr", //
      }}
      selectionColor={"red"}
      renderFlag={() => console.log("fffjjj   ", this)} // Add this line
      placeholder={"1xxx xxx xxx"} // Add the placeholder here
      phoneInputStyle={{
        flex: 1,
        paddingRight: Sizes.fixPadding,
        ...Fonts.blackColor17Medium,
        flexDirection: "column",
        fontSize: 17,
        textAlign: "left", // Set text alignment to left
        direction: "ltr", // Set text direction to left-to-right (ltr)
      }}
      // placeholder="رقم الهاتف"
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
    direction: "rtl", // Set direction to right-to-left (rtl)
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",

  },
});
