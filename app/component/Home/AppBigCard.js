import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image } from "react-native";
import AppText from "../AppText";
import { Colors } from "../../constant/styles";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import PriceTextComponent from "../PriceTextComponent";

export default function AppBigCard({image,name,price,category='',onPress}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>

    <View style={styles.cardContainer}>
      <Image
        style={styles.cardImage}
        resizeMode="cover" // Set the resizeMode to "contain"
        source={{
          uri: image,
        }}
      />
      <View style={styles.textContainer}>
        <AppText
          text={name}
          style={styles.text}
          centered={false}
        />
        <View style={styles.text2Cotainer}>
          <AppText text={category} style={styles.text2} centered={false} />
          <PriceTextComponent price={price}/>
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
      height: 200,
      width: 240,
    marginVertical: 16,
    marginRight: 16,
    borderRadius: 10,
    backgroundColor: "#FFF",
    overflow: "hidden",
    elevation: 0.6,
  },
  cardImage: {
    height: "58%",
    width: "100%",
  },
  textContainer: {
    paddingHorizontal:10
  },
  text: {
    color: Colors.blackColor,
    fontSize: 13,
  },
  text2Cotainer:{
    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row'

  },
  text2: {
    color: Colors.grayColor,
    fontSize: 13,
  },
  price :{
    color: Colors.primaryColor,
    fontSize: 13,


  }
  
});
