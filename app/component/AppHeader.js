import React from "react";
import { Image, TouchableWithoutFeedback, View } from "react-native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constant/styles";
import { MaterialIcons} from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
export default function AppHeader({ subPage = false}) {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/icon.png")} style={{
        width:40,
        height:40
      }} height={50} width={50} />
      {subPage ? (
        <TouchableWithoutFeedback onPress={()=>navigation.goBack()}>

          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color={Colors.grayColor}
            />
            </TouchableWithoutFeedback>
          ) : (
          <Ionicons name="md-notifications-outline" size={27} color={Colors.blackColor} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.piege,
  },
});
