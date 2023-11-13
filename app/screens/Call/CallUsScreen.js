import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Image } from "react-native";
import AppButton from "../../component/AppButton";
import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";
import { useTranslation } from "react-i18next";
import AppHeader from "../../component/AppHeader";
const { width } = Dimensions.get("screen");
export default function CallUsScreen() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <AppHeader subPage={true} />

      <AppText
        text={"أتصل بنا "}
        style={{ color: Colors.blackColor }}
        centered={false}
      />
      <View style={styles.imageContainer}>
        <Image source={require("../../assets/images/account/call.png")} />
      </View>
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
