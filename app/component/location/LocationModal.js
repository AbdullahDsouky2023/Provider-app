import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Dialog from "react-native-dialog";
import AppText from '../AppText';
import { Colors, Sizes ,Fonts} from '../../constant/styles';
import AppButton from '../AppButton';
const { width } = Dimensions.get('screen')
 const   LocationModal = ({ visible, onConfirm }) => {
  const handleConfirm = async () => {
    try {
      // Request permission to access the user's location
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        // Fetch user's location
        const location = await Location.getLastKnownPositionAsync({});
        
        // Save the location to storage
        await AsyncStorage.setItem('userLocation', JSON.stringify(location?.coords));
        console.log("llllll",location)
        // Close the modal and notify the parent component
        onConfirm();
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  return (
    <Dialog.Container
      visible={visible}
      contentStyle={styles.dialogContainerStyle}
    >
      <View style={{ backgroundColor: "white", alignItems: "center" ,justifyContent:'center'}}>
        <View
          style={{
            ...Fonts.grayColor18Medium,
            marginTop: Sizes.fixPadding * 2.0,
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
          }}
        >
         <AppText text={' يجب السماح للتطبيق بالوصول لموقعك '} style={{color:Colors.blackColor}}/>
         <AppButton title={'تاكيد'}onPress={handleConfirm}/>
        </View>
      </View>
    </Dialog.Container>
  );
};

const styles = StyleSheet.create({
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 80,
        paddingBottom: Sizes.fixPadding * 3.0,
      },
})




export default  LocationModal