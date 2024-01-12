import React, { useEffect, useState } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import AppButton from "../component/AppButton";
import useOrders from "../../utils/orders";
import { useDispatch } from "react-redux";
import { setOrders } from "../store/features/ordersSlice";
import AppText from "../component/AppText";
import { StyleSheet } from "react-native";
import { Colors } from "../constant/styles";
import * as Linking from "expo-linking";
import { TouchableOpacity } from "react-native";

export default function RegisterUpdateDataScreen({ navigation }) {
  const dispatch = useDispatch();
  const { data: orders } = useOrders();
  const handleReturn = () => {
    dispatch(setOrders(orders));
    navigation.navigate("App");
  };
  const handleWhatsAppPress = () => {
    let phoneNumber = "+201164258122"; // Replace with your phone number
    let message = "Hello, World!"; // Replace with your message
    let encodedMessage = encodeURIComponent(message);
    let url = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
    Linking.openURL(url);
   };
  return (
    <View
      style={{
        backgroundColor: "white",
        alignItems: "center",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LottieView
        autoPlay
        loop={false}
        // ref={animation}
        style={{
          width: 200,
          height: 200,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../assets/wait.json")}
      />
      <View style={{  alignItems: "center", marginTop: 50 }}>
        <AppText
          style={styles.text}
          text={
            "تم استلام الطلب وسيتم دراسته والرد خالل 24 ساعة ولمتابعة الطلب يمكنك التواصل معنا على الواتساب رقم "
          }
          onPress={() => handleReturn()}
        />
        <TouchableOpacity
          onPress={() => handleWhatsAppPress()}
        >
          <AppText
            text={"01144251236"}
            style={{
              fontSize: 15,
              color: Colors.primaryColor,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    color: Colors.blackColor,
    textAlign: "center",
  },
});
