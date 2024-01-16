import React, { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import LottieView from "lottie-react-native";
// import AppButton from "../component/AppButton";
import useOrders from "../../../utils/orders";
import { useDispatch } from "react-redux";
import { setOrders } from "../../store/features/ordersSlice";
import AppText from "../../component/AppText";
import { StyleSheet } from "react-native";
import { Colors } from "../../constant/styles";
import * as Linking from "expo-linking";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CHOOSE_DCOUMENT } from "../../navigation/routes";
const { width , height } =Dimensions.get('screen') 
export default function RegisterErrorDocument({  }) {
    const navigation = useNavigation()
  const dispatch = useDispatch();
  const { data: orders } = useOrders();
  const handleReturn = () => {
    dispatch(setOrders(orders));
    navigation.navigate("App");
  };
const handleNavigation = ()=>{
    navigation.navigate(CHOOSE_DCOUMENT , {status:"rejected"})
}
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
        // loop={false}
        // ref={animation}
        style={{
          width: width*0.2,
          height: height*0.2,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../assets/warn.json")}
      />
      <View style={{  alignItems: "center", marginTop: 10 }}>
        <AppText
          style={styles.text}
          text={
"تم رفض طلبك الرجاء   إعادة ادخال البيانات  "          }
          onPress={() => handleReturn()}
        />
        <TouchableOpacity
        style={{backgroundColor:Colors.primaryColor,  
            borderRadius:10,
            marginTop:20
        }}
          onPress={() => handleNavigation()}
        >
          <AppText
            text={"Continue"}
            style={{
              fontSize: 15,
              color: Colors.whiteColor,
              paddingHorizontal:40,
              paddingVertical:10,
            
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
