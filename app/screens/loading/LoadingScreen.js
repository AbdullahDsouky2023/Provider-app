import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { CircleFade } from "react-native-animated-spinkit";
import { Colors } from "../../constant/styles";
import { StatusBar } from "react-native";
import AppHeader from "../../component/AppHeader";

export default function LoadingScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        {/* <AppHeader /> */}
        <View style={{
            display:"flex",
            alignItems:'center',
            justifyContent:'center',
            height:"100%"
        }}>

        <CircleFade
          size={45}
          color={Colors.primaryColor}
          style={{ alignSelf: "center" }}
          />
          </View>
      </View>
    </SafeAreaView>
  );
}
