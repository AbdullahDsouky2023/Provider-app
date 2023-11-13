import { View, Text, ScrollView, Image, Dimensions } from "react-native";
import React from "react";
import AppText from "./AppText";
import { StyleSheet } from "react-native";
import { Colors } from "../constant/styles";
import AppHeader from "./AppHeader";
const { width, height } = Dimensions.get("screen");
export default function ItemDetails({ item }) {
  return (
    <View style={styles.container}>
      <AppHeader subPage={true} />
      <ScrollView>
        <Image source={{ uri: item?.attributes?.image?.data?.attributes?.url }} style={styles.image} />
        <View style={styles.overlay}>
          <AppText text={item?.attributes?.name} style={{ color: Colors.whiteColor,fontSize:17 }} />
        </View>
        <View style={styles.descriptionContainer}>
          <AppText
            text={item?.attributes?.description}
            centered={false}
            style={styles.descriptionText}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "auto",
    backgroundColor: Colors.piege,
    position: "relative",
  },
  image: {
    height: 150,
    width: width,
  },
  overlay: {
    height: 150,
    width: width,
    backgroundColor: Colors.overlayColor,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionContainer: {
    width: width,
    backgroundColor: Colors.whiteColor,
    height: "auto",
    marginTop: -10,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    paddingBottom: 50,
  },
  descriptionText: {
    color: Colors.blackColor,
    fontSize: 15,
    padding:20,
    minWidth:'100%',
  },
});
