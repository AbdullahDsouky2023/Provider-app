import { Dimensions, StyleSheet, Text, View,I18nManager } from "react-native";
import { Colors } from "../../constant/styles";
import AppText from "../AppText";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Share } from "react-native";
import { auth } from "../../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { CART, OFFERS, OFFERS_SCREEN } from "../../navigation/routes";
const { width, height } = Dimensions.get("screen");
import * as Linking from "expo-linking";
import AppModal from "../AppModal";
import ContactUsModal from "./ContactUsModal";
import { useState } from "react";
import LoadingModal from "../Loading";

export default function SettingItem({ item }) {
  const { icon, name, desc } = item;
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const hideModal = () => setVisible(false);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Check out this awesome app!",
        // You can also add a URL to your app here
      });
      console.log("the sare mod", Share); // Check if Share is defined

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.removeItem("userData");

      // Inside your sign-out function:
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Auth" }], // Replace 'Login' with the name of your login screen
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handlePress = () => {
    if (icon === "share") {
      onShare();
    } else if (icon === "credit-card") {
      console.log("test");
    } 
    else if (icon === "doc") {
      Linking.openURL("https://njik.sa/");
    } 
    else if (icon === "question") {
      Linking.openURL("https://njik.sa/");
    } 
    else if (icon === "present") {
        navigation.navigate(OFFERS_SCREEN, { name:"العروض" });
   
    } 
    else if (icon === "social-instagram") {
    setVisible(true)
    } 
    else if (icon === "logout") {
      handleSignOut();
    } else {
      navigation.navigate(icon);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => handlePress()}>
      <View style={[styles.item]}>
        <SimpleLineIcons name={icon} size={24} color={Colors.primaryColor} />

        <View
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <AppText text={name} centered={false} style={[styles.textHeader]} />
<ContactUsModal hideModal={hideModal} visible={visible}/>     
        </View>
 </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header: {
    color: Colors.primaryColor,
    fontSize: 18,
  },
  textHeader: {
    color: Colors.blackColor,
    fontSize: I18nManager.isRTL ? 14 :11,
    // alignSelf:"left"
  },
  headerDescription: {
    color: Colors.grayColor,
    fontSize: 16,
  },
  item: {
    backgroundColor: Colors.piege,
    height: "auto",
    borderRadius: 10,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: width * 0.4,
    paddingVertical: 14,
    gap: 5,
  },
  itemHeader: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: width * 0.4,
    // height:120,
    backgroundColor: Colors.piege,
    padding: 10,
    borderRadius: 10,
    margin: 20,
    justifyContent: "center",
    gap: 15,
  },
});
