import { View, Text, TouchableWithoutFeedback, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../constant/styles";
import AppText from "../AppText";
import { useDispatch, useSelector } from "react-redux";
import { getUserCurrentOrders } from "../../../utils/user";
import { setCompleteOrders } from "../../store/features/ordersSlice";
const { width } = Dimensions.get("screen");
export default function OverviewComponent({ image, name, onPress }) {
  const user = useSelector((state) => state?.user?.userData);
  const ordersRedux = useSelector((state) => state?.orders?.orders);
  const  dispatch = useDispatch()
  const completedOrdersNumber = useSelector((state) => state?.orders?.completedOrders);
const [currentOrders,setCurrentData]=useState([])
  useEffect(()=>{
      const userId = user?.id;
      const orders = ordersRedux?.data?.filter((item)=>item?.attributes?.provider?.data?.id === userId)
      setCurrentData(orders)
      const currentOrders = orders?.filter((item)=>item?.attributes?.status !== "pending" && item?.attributes?.PaymentStatus === "payed")
  dispatch(setCompleteOrders(currentOrders?.length))
    },[ordersRedux])
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.cardContainer} >
        <View style={styles.card}>
        <View
          style={{
            display: "flex",
            direction: "row",
            alignItems: "center",
          }}
        >
          <AppText text={"الطلبات المكتمله   :"} style={styles.text} centered={false} />
        </View>
        <View >
          <AppText text={completedOrdersNumber} style={styles.text} />
        </View>
      </View>
        {/* <View style={styles.card}>
        <View
          style={{
            display: "flex",
            direction: "row",
            alignItems: "center",
          }}
        >
          <AppText text={"الارباح : "} style={styles.text} centered={false} />
        </View>
        <View>
          <AppText text={currentOrders?.length} style={styles.text} />
        </View>
      </View> */}
            </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  cardContainer :{

    height: 200,
    width: width * 0.85,
  },
  card: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 10,
    // flex: 1,
    paddingTop: 19,
    flexDirection:"row",
    justifyContent: "space-between",
    // alignItems: "start",
    gap: 4,
    height: "auto",
marginBottom:10,
marginTop:10,
    elevation: 10,
    height:100,
    paddingHorizontal:20
  },
  text: {
    color: Colors.blackColor,
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
