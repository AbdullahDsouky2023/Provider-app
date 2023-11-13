import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";

import { Colors } from "../../constant/styles";
import GeneralSettings from "../../component/Account/GeneralSettings";
import Logo from "../../component/Logo";
import AppText from "../../component/AppText";
import { useSelector } from "react-redux";



const AccountScreen = ({ navigation }) => {
  const user = useSelector((state)=>state.user?.user)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <Logo />
        {/* <AppText text={user?.phoneNumber}/> */}
        <GeneralSettings/>
      </View>
    </SafeAreaView>
  );
};


export default AccountScreen;
