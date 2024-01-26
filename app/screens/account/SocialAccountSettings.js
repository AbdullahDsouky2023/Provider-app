import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { ScrollView } from "react-native-virtualized-view";

import AppText from "../../component/AppText";
import AppButton from "../../component/AppButton";
import { Colors } from "../../constant/styles";
import SettingItem from "../../component/Account/SocialItemSetting";
import { SocailLinks } from "../../data/SocailLinks";
import { auth } from "../../../firebaseConfig";
const { width } = Dimensions.get("screen");
export default function SocialAccountSettings() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <AppText text="Contact Us" centered={false} style={styles.header} />
      <View
      >
        <FlatList
          data={SocailLinks}
          style={{
            display: "flex",
            gap: 20,
            width:width*1,
            paddingHorizontal:width*0.1,
            // paddingVertical:8,
            flexWrap:'wrap',
            alignItems:"center",
            justifyContent:'center',
            // backgroundColor:'red',
            flexDirection:'column'
          }}
          renderItem={({ item }) => {
            return <SettingItem item={item} />;
          }}
          keyExtractor={(item, index) => item.name + index}
        />
      </View>
      
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  header: {
    color: Colors.primaryColor,
    fontSize: 18,
    marginBottom:25
  },
  textHeader: {
    color: Colors.blackColor,
    fontSize: 16,
  },
  headerDescription: {
    color: Colors.grayColor,
    fontSize: 16,
  },
  item: {
    backgroundColor: Colors.whiteColor,
    height: 70,
    borderRadius: 12,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: width * 1,
  },
  itemHeader: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    // justifyContent:'center',
    gap: 15,
  },
});
