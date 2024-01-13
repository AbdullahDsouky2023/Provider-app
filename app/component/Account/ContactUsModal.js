import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Colors, Sizes, Fonts, mainFont } from "../../constant/styles";
import Dialog from "react-native-dialog";
import { CircleFade } from "react-native-animated-spinkit";
import AppText from "../AppText";
import AppButton from "../AppButton";
import * as Linking from 'expo-linking'
const { width } = Dimensions.get("screen");

export default function ContactUsModal({visible,hideModal}) {
    const handleWhatsAppPress = () => {
        let phoneNumber = "+201164258122"; // Replace with your phone number
        let message = "Hello, World!"; // Replace with your message
        let encodedMessage = encodeURIComponent(message);
        let url = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
        Linking.openURL(url);
       };
       
       const handlePhoneCallPress = () => {
        let phoneNumber = "111"; // Replace with your phone number
        let url = `tel:${phoneNumber}`;
        Linking.openURL(url);
       };
       
       const handleEmailPress = () => {
        let emailAddress = "Njik_development@gmail.com"; // Replace with your email address
        let subject = "Hello"; // Replace with your subject
        let body = "Hello, World!"; // Replace with your body
        let encodedSubject = encodeURIComponent(subject);
        let encodedBody = encodeURIComponent(body);
        let url = `mailto:${emailAddress}?subject=${encodedSubject}&body=${encodedBody}`;
        Linking.openURL(url);
       };
       
  return (
    <Dialog.Container
    visible={visible}
    transparent={true}
    backdropOpacity={0.1}
    backdropStyle={{ backgroundColor: 'white' }}
    contentStyle={styles.dialogContainerStyle}
    >
      <View style={{ backgroundColor: "white", alignItems: "center" }}>
        {/* <CircleFade size={45} color={Colors.primaryColor} /> */}
        <View
          style={{
              ...Fonts.grayColor18Medium,
              display:'flex',
            flexDirection:'column'
            // marginTopTop: Sizes.fixPadding * 2.0,
          }}
        >
         <AppText text={'كیف تحب تتواصل معانا'}/>
         
         <AppButton title={"Whatsapp"}
         onPress={handleWhatsAppPress}
         style={{backgroundColor:Colors.whiteColor,marginTop:1,marginBottom:0}}  textStyle={{marginTop:0,color:Colors.blackColor}}/>
        
         <AppButton title={"Email"}
                  onPress={handleEmailPress}

         style={{backgroundColor:Colors.whiteColor,marginTop:1,marginBottom:0}} textStyle={{marginTop:0,color:Colors.blackColor}} />
         <AppButton title={"Cancle"} style={{backgroundColor:Colors.redColor,marginTop:4,marginBottom:0,paddingHorizontal:0}} textStyle={{paddingHorizontal:0,color:Colors.whiteColor}} onPress={hideModal} />
        </View>
      </View>
    </Dialog.Container>
  );
}
const styles = StyleSheet.create({
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 80,
        // paddingBottom: Sizes.fixPadding * 3.0,
      },
})