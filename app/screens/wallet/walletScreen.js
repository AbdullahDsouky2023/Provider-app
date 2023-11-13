import { View, Text, Dimensions } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constant/styles";
import { StyleSheet } from "react-native";
import AppText from "../../component/AppText";
import AppButton from "../../component/AppButton";
import AppHeader from "../../component/AppHeader";
const amount = "0.0";
const { width } = Dimensions.get("screen");
export default function WalletScreen() {
  const [operation, setOperation] = useState("سحب");
  return (
    <View style={styles.container}>
      <AppHeader subPage={true} />

      <View style={styles.wrapper}>
        <AppText text={"رصيدك الحالي"} style={styles.text} />
        <AppText text={`${amount} جنيه`} style={styles.amount} />
      </View>
      <AppButton
        title={"أدخل كود شحن المحفظه "}
        style={styles.button}
        textStyle={{ color: Colors.primaryColor }}
      />
      <View style={styles.buttonsContainer}>
        {/* <AppButton onPress={setOperation('سحب')} title={'سحب'} style={ operation === 'سحب' ? styles.button : '' } textStyle={ operation === 'سحب' ? {color:Colors.primaryColor}: ''}/>
        <AppButton onPress={setOperation('ايداع')} title={'سحب'} style={ operation === 'ايداع' ? styles.button : '' } textStyle={ operation === 'ايداع' ? {color:Colors.primaryColor}: ''}/> */}
      </View>
      <View style={styles.operation}>
        <AppText text={"لا يوجد عمليات اخيرة"} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.whiteColor,
    height: "100%",
  },
  text: {
    color: Colors.blackColor,
  },
  amount: {
    color: Colors.primaryColor,
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: Colors.whiteColor,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    // width:width * 0.7.toFixed,
    // marginHorizontal:20
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    width: width,
    alignItems: "center",
    justifyContent: "center",
  },
  operation: {
    paddingVertical: 100,
    display: "flex",
    alignItems: "center",
  },
});
