import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Image } from "react-native";
import AppButton from "../../component/AppButton";
import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";
import { useTranslation } from "react-i18next";
import AppHeader from "../../component/AppHeader";
const { width } = Dimensions.get("screen");
export default function ShareScreen() {
    const { t } = useTranslation()
  return (
    <View style={styles.container}>
            <AppHeader subPage={true}/>

      <View style={styles.imageContainer}>
        <Image source={require("../../assets/images/account/icon.png")} />
        <AppText
          text={"شارك التطبيق مع اصدقائك"}
          style={{ color: Colors.blackColor }}
        />
        <AppText
          text={"أحصل علي 50 جنيه عندما يسجل  شخص بأستخدام رابط د عوتك "}
        />
      </View>
      <AppButton
        path={"Account"}
        title={"https://ui8.net/76738b"}
        textStyle={{ color: Colors.whiteColor }}
        style={{
          borderRadius: 10,
          borderColor: Colors.whiteColor,
          backgroundColor: Colors.primaryColor,
          borderWidth: 1,
        }}
      />
      <AppButton
        path={t('Home')}
        title={"الرجوء الي الصفحه الرئيسيسه"}
        textStyle={{ color: Colors.blackColor }}
        style={{
          borderRadius: 10,
          backgroundColor: Colors.whiteColor,
          borderWidth: 1,
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
    height: "100%",
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  },
  linkWrapper: {
    height: 100,
    width: width * 0.8,
    backgroundColor: "#0052CC",
  },
});
