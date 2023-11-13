import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Colors, Sizes, Fonts } from "../constant/styles";
import Dialog from "react-native-dialog";
import { CircleFade } from "react-native-animated-spinkit";
import AppText from "./AppText";
import LottieView from "lottie-react-native";
import AppButton from "./AppButton";
const { width } = Dimensions.get("screen");

export default function SuccessModel({ visible,onPress }) {
  return (
    <Dialog.Container
      visible={visible}
      contentStyle={styles.dialogContainerStyle}
    >
      <View style={{ backgroundColor: "white", alignItems: "center" }}>
      <LottieView
        autoPlay
        loop={false}
        // ref={animation}
        style={{
          width: 200,
          height: 200,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../assets/success.json')}
      />

        <AppButton title={"عودة"} onPress={onPress} />
      </View>
    </Dialog.Container>
  );
}
const styles = StyleSheet.create({
  dialogContainerStyle: {
    borderRadius: Sizes.fixPadding,
    width: width - 80,
    paddingBottom: Sizes.fixPadding * 3.0,
  },
});
