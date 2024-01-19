import { View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-virtualized-view";
import LoadingScreen from "../loading/LoadingScreen";
import { Colors } from "../../constant/styles";
import LottieView from "lottie-react-native";
import { setOrders } from "../../store/features/ordersSlice";
import AppText from "../../component/AppText";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useCategories from "../../../utils/categories";
import * as geolib from "geolib";
const { width, height } = Dimensions.get("screen");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

export default function ChargeWalletScreen({}) {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const handleNavigation = () => {
    navigation.navigate(t("Account"), { screen: "wallet" });
  };
  return (
    <>
      <ScrollView
        style={{
          height: height * 0.78,
        }}
      >
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
              width: width * 0.4,
              height: height * 0.4,
            }}
            source={require("../../assets/wallet-charge.json")}
          />
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <AppText
              style={styles.text}
              text={" الرجاء شحن المحفظة حتى تتمكن من  استقبال الطلبات "}
              onPress={() => handleReturn()}
            />
            <TouchableOpacity
              style={{
                backgroundColor: Colors.primaryColor,
                borderRadius: 10,
                marginTop: 20,
              }}
              onPress={() => handleNavigation()}
            >
              <AppText
                text={"Recharge Now"}
                style={{
                  fontSize: 15,
                  color: Colors.whiteColor,
                  paddingHorizontal: 40,
                  paddingVertical: 10,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: Colors.whiteColor,
  },
  header: {
    textAlign: "center",
  },
  name: {
    fontSize: 17,
    color: Colors.blackColor,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "auto",
    width: width * 0.95,
    padding: 10,
    // borderWidth: 0.7,
    borderRadius: 10,
    marginHorizontal: 8,
    backgroundColor: Colors.whiteColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 4,
    gap: 10,
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "auto",
    width: width * 0.9,
    padding: 10,
    // borderWidth: 0.7,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: Colors.whiteColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 4,
    gap: 10,
  },
  price: {
    fontSize: 17,
    color: Colors.primaryColor,
    marginTop: 5,
    fontWeight: 700,
  },
  title: {
    fontSize: 21,
    color: Colors.primaryColor,
  },
  itemContainer2: {
    display: "flex",
    flex: 2,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  increaseButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 40,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5.0,
    marginTop: 4.0,
    borderRadius: 40,
    backgroundColor: Colors.primaryColor,
  },
  buttonText: {
    color: Colors.whiteColor,
  },
});
