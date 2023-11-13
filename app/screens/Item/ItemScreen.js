import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import ItemDetails from "../../component/ItemDetails";
import OtherServicesList from "../../component/Home/OtherServicesList";
import ArrowBack from "../../component/ArrowBack";
import UsersReviews from "../../component/Home/UsersReview";
import { ITEM_ORDER_DETAILS, ORDER_SELECT_LOCATION } from "../../navigation/routes";
import AppText from "../../component/AppText";
export default function ItemScreen({ route,navigation }) {


  const { item } = route?.params;
  
  
  return (
    <View style={styles.container}>
        <ArrowBack/>
      <View >
    <AppText text={"kkk"}/>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    height:"100%",
    backgroundColor:'red'
  },
  
});
