import { View, Text, StyleSheet, Dimensions, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import AppButton from "../../component/AppButton";
import { Colors, mainFont } from "../../constant/styles";
import AppText from "../../component/AppText";
import { useTranslation } from "react-i18next";
import AppHeader from "../../component/AppHeader";
import { ScrollView } from "react-native";
import ArrowBack from "../../component/ArrowBack";
import useTerms from "../../../utils/terms";
const { width ,height} = Dimensions.get("screen");
import LoadingScreen from "../../component/loadingScreen";

export default function ConditionsScreen() {
  const { t } = useTranslation();
  const { data,isLoading } = useTerms()
  const { width ,height} = useWindowDimensions();
  const [CurrentTerms,setCurrentTerms]=useState(null)

  useEffect(()=>{
      console.log("the therms",data?.data[0].attributes.content)
      if(data) setCurrentTerms(data?.data[0].attributes.content)
  },[])
  if(isLoading) return  <LoadingScreen/>
  return (
    <View style={styles.container}>

      <ArrowBack subPage={true} />
    <ScrollView style={styles.container}>
    {/* <AppText text={CurrentTerms} centered={false} style={{
      fontSize:12,
      color:Colors.blackColor,
      width:width,
      padding:0,
      backgroundColor:'red'
    }}/> */}
    <Text
     style={{
      fontSize:14,
      color:Colors.blackColor,
      width:width,
      lineHeight:height*0.042,
      fontFamily:mainFont.bold,
      paddingHorizontal:15,
    }}
    >
      {
        CurrentTerms
      }
    </Text>
      <View style={styles.imageContainer}>
      </View>
    </ScrollView>
            </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
    height: "100%",
},
imageContainer: {
    display: "flex",
    paddingVertical:20,
    paddingHorizontal:20,
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
    width:width*1
  },
  linkWrapper: {
    height: 100,
    width: width * 0.8,
    backgroundColor: "#0052CC",
  },
});

