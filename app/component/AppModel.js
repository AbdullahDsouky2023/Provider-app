import React, { useState } from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import { Colors, Sizes, Fonts } from "../constant/styles";
import Dialog from "react-native-dialog";
import AppText from "./AppText";

const { width } = Dimensions.get("screen");

export default function AppModal({visible,message}) {
  connst [isvisible,setVisible]=useState(visible || false)
  return (
    <Dialog.Container
      visible={isvisible}
      contentStyle={styles.dialogContainerStyle}
    >
      <View style={{ backgroundColor: "white", alignItems: "center" }}>
        {/* <CircleFade size={45} color={Colors.primaryColor} /> */}
        <Text
          style={{
            ...Fonts.primaryColor15Light,
            marginTop: Sizes.fixPadding * 2.0,
          }}
        >
         <AppText text={{message}}/>
        </Text>
        <Button title="Ok" onPress={()=>setVisible(false)}/>
      </View>
    </Dialog.Container>
  );
}
const styles = StyleSheet.create({
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 80,
        paddingBottom: Sizes.fixPadding * 3.0,
      },
})