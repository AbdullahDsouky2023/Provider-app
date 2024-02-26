import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Colors } from "../../constant/styles";
import AppText from "../AppText";
import { AntDesign } from "@expo/vector-icons";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { RFPercentage } from "react-native-responsive-fontsize";
import Stars from "react-native-stars";
const RatingEmojs = [
  {
    emoji: "emoticon-outline",
    explain: "Excellent",
    rate: 5,
  },
  {
    emoji: "emoticon-happy-outline",
    explain: "Good",
    rate: 4,
  },
  {
    emoji: "emoticon-confused-outline",
    explain: "Average",
    rate: 3,
  },
  {
    emoji: "emoticon-frown-outline",
    explain: "Bad",
    rate: 2,
  },
  {
    emoji: "emoticon-angry-outline",
    explain: "Very Bad",
    rate: 1,
  },
];
const { width, height } = Dimensions.get("screen");
export default function ReviewOrderCard({ item }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={
          RatingEmojs.filter(
            (emoji) => emoji.rate === Number(item?.attributes?.userOrderRating)
          )[0]?.emoji || RatingEmojs[0]?.emoji
        }
        size={42}
        color={Colors.primaryColor}
      />
      <View style={styles.container2}>
        <View>
        <AppText
          text={item?.attributes?.user?.data?.attributes?.username}
          style={styles.name}
          centered={false}
          />
          {
            item?.attributes?.userOrderReview  &&
  <AppText
  
  text={item?.attributes?.userOrderReview.length >  20 ? item?.attributes?.userOrderReview.substring(0,  26) + '...' : item?.attributes?.userOrderReview}
  style={styles.review} centered={false}/>
}
          </View>
        <View style={styles.reviewContainer}>
          <Stars
            default={5}
            count={Number(item?.attributes?.userOrderRating) || 5}
            half={true} 
            starSize={17}
            disabled={true}
            fullStar={
              <AntDesign name="star" size={17} color={Colors.primaryColor} />
            }
          />
        </View>
      </View>
    
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    backgroundColor: Colors.whiteColor,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent:'center',
    borderColor: Colors.grayColor,
    borderRadius: 15,
  },
  name: {
    color: Colors.primaryColor,
    fontSize: RFPercentage(1.5),
 
  },
  review: {
    color: Colors.blackColor,
    fontSize:  RFPercentage(1.5),
    maxWidth: width * 0.9,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  reviewContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  date: {
    color: Colors.grayColor,
    fontSize: 15,
  },
  container2: {
    display: "flex",
    flexDirection: "row",
    alignItems:'center',
    justifyContent: "space-between",
    // backgroundColor:'red',
    width: width * 0.7,
    marginHorizontal:4
  },
});
