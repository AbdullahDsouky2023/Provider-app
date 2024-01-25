import { ActivityIndicator, View } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

import { Colors } from "../../constant/styles";
import * as Linking from "expo-linking";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";

export default function SocailLinksComponent() {
  const Icon = createIconSetFromIcoMoon(
    require("../../assets/images/x.json"),
    "IcoMoon",
    "icomoon.ttf"
  );
  const [fontsLoaded] = useFonts({
    IcoMoon: require("../../assets/images/icomoon.ttf"),
  });
  if(!fontsLoaded) return <ActivityIndicator/>
  return (
    <View style={styles.container}>
      <FontAwesome5
        name="facebook-f"
        size={24}
        color={Colors.primaryColor}
        onPress={() => Linking.openURL("https://facebook.com")}
      />
      <FontAwesome5
        name="instagram"
        size={24}
        color={Colors.primaryColor}
        onPress={() => Linking.openURL("https://instagram.com")}
      />

      <FontAwesome5
        name="linkedin-in"
        size={24}
        color={Colors.primaryColor}
        onPress={() => Linking.openURL("https://linkedin.com")}
      />
      <Icon
        name="x"
        size={24}
        onPress={() => Linking.openURL("https://x.com")}
        color={Colors.primaryColor}
      />
      <FontAwesome5
        name="tiktok"
        size={24}
        color={Colors.primaryColor}
        onPress={() => Linking.openURL("https://tiktok.com")}
      />
      <FontAwesome5
        name="snapchat"
        size={24}
        color={Colors.primaryColor}
        onPress={() => Linking.openURL("https://snapchat.com")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 18,
    flexDirection: "row-reverse",
  },
});
