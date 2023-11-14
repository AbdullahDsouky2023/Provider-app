import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";
import AppText from "./AppText";
import AppButton from "./AppButton";
import { StyleSheet } from "react-native";

export default function AppModal({onPress,setModalVisible,isModalVisible,message}) {

  const toggleModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1,marginTop:"50%" }} >
          <AppText text={message}/>

          <AppButton title="Comfirm" onPress={onPress} />
          <AppButton title="Cancle" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
    container : 
    {
        height:"100%",
        flex: 1,
        display:"flex",
        alignItems:'center',
        justifyContent:"center",
        // marginTop:1000
    }
})