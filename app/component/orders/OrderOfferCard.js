import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { Sizes, Colors, Fonts } from "../../constant/styles";
import AppText from "../AppText";
const { width } = Dimensions.get("screen");
export default function OrderOfferCard({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.orderCard}>
      <View style={styles.headerContainer}>
        <AppText
          text={item?.attributes?.service?.data?.attributes?.name}
          style={styles.header}
          centered={false}
        />
      </View>
      <View style={styles.headerContainer}>
        <AppText text={":الموعد"} style={styles.header} centered={false} />
        <AppText
          text={`${item?.attributes?.date}/ ${item?.attributes?.time}`}
          centered={false}
          style={styles.content}
        />
      </View>
      <View style={styles.headerContainer}>
        <AppText text={"address"} style={styles.header} centered={false} />
        <AppText
          text={`${item?.attributes?.location}`}
          centered={false}
          style={styles.content}
        />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  orderCard: {
    height: "auto",
    width: width * 0.92,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor:'red',
    paddingHorizontal: 11,
    paddingVertical: 4,
    gap: 10,
  },
  header: {
    color: Colors.blackColor,
    fontSize: 18,
  },
  content: {
    color: Colors.blackColor,
    fontSize: 14,
    marginTop: 5,
  },
  animatedView: {
    backgroundColor: "#333333",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
});
