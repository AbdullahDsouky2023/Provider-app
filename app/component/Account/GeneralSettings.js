import { View, Text, StyleSheet, Dimensions } from "react-native";
import { ScrollView} from "react-native-virtualized-view";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { FlatList } from "react-native";

import AppText from "../AppText";
import AppButton from "../AppButton";
import { Colors } from "../../constant/styles";
import SettingItem from "./SettingItem";
import { settingsItemArray } from "../../data/account";
import { auth } from "../../../firebaseConfig";
const { width } = Dimensions.get("screen");

export default function GeneralSettings() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      await AsyncStorage.removeItem("userData");
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
    <ScrollView style={styles.container}>
      <AppText text="GeneralSettings" centered={false} style={styles.header} />
      <View>
        <FlatList
          data={settingsItemArray}
          style={{
            display:"flex",
            gap:20
          }}
          renderItem={({ item }) => {
            return <SettingItem item={item} />;
          }}
          keyExtractor={(item, index) => item.name + index}
        />
      </View>
      <AppButton
        title={'signOut'}
        style={{ marginVertical: 20,marginTop:100 }}
        onPress={handleSignOut}
      />
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
  },
  itemHeader: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
  },
});
