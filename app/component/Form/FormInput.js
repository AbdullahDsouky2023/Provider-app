import React from "react";
import { View, StyleSheet, I18nManager } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, Fonts, mainFont } from "../../constant/styles";
import AppText from "../AppText";
import { useTranslation } from "react-i18next";
import { TextInput} from 'react-native-paper'
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
        activeUnderlineColor={Colors.primaryColor}
        placeholderTextColor={Colors.grayColor}
        style={{
          width: "100%",
          padding: 0,
          fontFamily:mainFont.bold,
          backgroundColor:Colors.whiteColor,
          maxHeight:40,
          borderBottomWidth:0,
          borderRadius: 10,
          fontFamily: mainFont.light,
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
    fontFamily: mainFont.light,
  },
  icon: {
  },
});

export default FormTextInput;
