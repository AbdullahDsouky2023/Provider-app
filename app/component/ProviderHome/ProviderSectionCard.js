import { View, Text, TouchableWithoutFeedback, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../constant/styles";
import AppText from "../AppText";
import { useSelector } from "react-redux";
import { getUserCurrentOrders } from "../../../utils/user";
const { width } = Dimensions.get("screen");
export default function ProviderSectionCard({ image, name, onPress }) {
  const user = useSelector((state) => state?.user?.userData);
  const ordersRedux = useSelector((state) => state?.orders?.orders);

const [currentOrders,setCurrentData]=useState([])
  useEffect(()=>{
      const userId = user?.id;
      const redux = ordersRedux?.data?.filter((item)=>item?.attributes?.provider?.data?.id === userId)
      setCurrentData(redux)
    },[user])
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View
          style={{
            display: "flex",
            direction: "row",
            alignItems: "center",
          }}
        >
          <AppText text={"الطلبات : "} style={styles.text} centered={false} />
          <AppText text={currentOrders?.length} style={styles.text} />
        </View>
        <View>
          <AppText text={"عرض الكل"} style={styles.show} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  card: {
    height: 150,
    width: width * 0.45,
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    elevation: 10,
  },
  text: {
    color: Colors.whiteColor,
    // ...Fonts.blackColor14Medium
  },
  show: {
    fontSize: 17,
  },
  imageCard: {
    height: 40,
    width: 40,
  },
});
