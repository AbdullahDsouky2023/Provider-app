import React from "react";
import { View, StyleSheet, I18nManager } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, Fonts, mainFont } from "../../constant/styles";
import AppText from "../AppText";
import { useTranslation } from "react-i18next";
import { TextInput} from 'react-native-paper'
I18nManager.allowRTL(true);

function FormTextInput({ icon, width = "100%",height, ...otherProps }) {
  const { t } = useTranslation();
  return (
    <View style={[styles.container, { width }]}>
      <TextInput
      showSoftInputOnFocus
      selectTextOnFocus
        selectionColor={Colors.primaryColor}
        underlineColor={Colors.grayColor}
        activeUnderlineColor={Colors.primaryColor}
        
        placeholderTextColor={Colors.grayColor}
        writingDirection="rtl"
        textAlign="right"
        textAlignVertical="bottom"
        // numberOfLines={10}
        style={{
          
          width: "100%",
          padding: 0,
          paddingBottom:25,
          fontFamily:mainFont.bold,
          backgroundColor:Colors.grayColor,
          maxHeight:height || 45 ,
          textAlign:'right',
          borderBottomWidth:0,
          // height:400,
          borderTopRightRadius: 6,
          borderTopLeftRadius: 6,
          borderRadius: 6,
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
