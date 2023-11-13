import React from "react";
import { View, TextInput, StyleSheet, I18nManager } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, Fonts, mainFont } from "../../constant/styles";
import AppText from "../AppText";
import { useTranslation } from "react-i18next";

I18nManager.allowRTL(true);

function FormTextInput({ icon, width = "100%", ...otherProps }) {
  const { t } = useTranslation();
  return (
    <View style={[styles.container, { width }]}>
      <TextInput
      showSoftInputOnFocus
      selectTextOnFocus
        selectionColor={Colors.primaryColor}
        textAlign="right"
        placeholderTextColor={Colors.blackColor}
        style={{
          borderWidth: 1,
          width: "100%",
          padding: 10,
          borderRadius: 10,
          fontFamily: mainFont.light,
          borderColor: Colors.blackColor,
          writingDirection: "rtl",
          fontSize: 15,
        }}
        
        {...otherProps}
        placeholder={t(otherProps.placeholder)}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 25,
    flexDirection: "row-reverse",
    padding: 15,
    // marginVertical: 10,
    fontFamily: mainFont.light,
  },
  icon: {
    // marginRight: 10,
  },
});

export default FormTextInput;
