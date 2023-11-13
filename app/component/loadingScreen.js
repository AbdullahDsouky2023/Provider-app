import React, { useEffect } from "react";
import { View } from "react-native";
import * as Font from "expo-font";
import { Colors, Fonts } from "../constant/styles";

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        "Mukta_Light": require("../assets/fonts/mukta/Mukta-Light.ttf"),
        "Mukta_Medium": require("../assets/fonts/mukta/Mukta-Medium.ttf"),
        "Mukta_Regular": require("../assets/fonts/mukta/Mukta-Regular.ttf"),
        "Ember_Light": require("../assets/fonts/Ember/Amazon-Ember-Light.ttf"),
        "Ember_Medium": require("../assets/fonts/Ember/Amazon-Ember-Medium.ttf"),
        "Ember_Regular": require("../assets/fonts/Ember/Amazon-Ember.ttf"),
        "Janna-Lt": require("../assets/fonts/Janna-LT-Bold.ttf"),

      });
      navigation.navigate('Splash');
    }
    loadFont();
  }, []); 
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }} />
  );
}

export default LoadingScreen;
