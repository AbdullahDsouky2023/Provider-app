import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { Colors } from "../constant/styles";
import AppText from "./AppText";
import { Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import PriceTextComponent from "./PriceTextComponent";
const { width } = Dimensions.get("screen");
export default function OfferCard({ service, price, image,onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress} >
      <View style={styles.itemCardContainer}>

      <Image
        style={styles.cardImage}
        source={{
          uri: image,
        }}
      />
      <View>
        <AppText
          text={service}
          style={{
            color: Colors.blackColor,
            fontSize: 14,
            maxWidth: width * 0.5,
          }}
          centered={false}
        />
       <PriceTextComponent price={price}/>

      </View>
</View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  itemCardContainer: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.grayColor,
    gap: 20,
    overflow: "hidden",
  },
  cardImage: {
    height: "100%",
    minHeight: 100,
    width: width * 0.3,
  },
});
