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
        onPress={() => Linking.openURL("https://www.facebook.com/njikapp?mibextid=LQQJ4d")}
      />
      <FontAwesome5
        name="instagram"
        size={24}
        color={Colors.primaryColor}
        onPress={() => Linking.openURL("https://www.instagram.com/njik_app?igsh=MTJkbHFqMXA1Z2YxZg%3D%3D&utm_source=qr")}
      />

      <FontAwesome5
        name="linkedin-in"
        size={24}
        color={Colors.primaryColor}
        onPress={() => Linking.openURL("https://www.linkedin.com/in/njikapp?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app")}
      />
      <Icon
        name="x"
        size={24}
        onPress={() => Linking.openURL("https://x.com/njik_app?s=11&t=OV5g1wB7cPMNnAwUShZmLw")}
        color={Colors.primaryColor}
      />
      <FontAwesome5
        name="tiktok"
        size={24}
        color={Colors.primaryColor}
        onPress={() => Linking.openURL("https://www.tiktok.com/@njik_app?_t=8irWAmx9Qe2&_r=1")}
      />
      <FontAwesome5
        name="snapchat"
        size={24}
        color={Colors.primaryColor}
        onPress={() => Linking.openURL("https://www.snapchat.com/add/njik_app?share_id=L2OP6AFL4lk&locale=ar-AE")}
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
