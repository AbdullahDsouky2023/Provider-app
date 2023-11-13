import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import AppText from '../AppText'
import { Colors } from '../../constant/styles'
import { StyleSheet } from 'react-native'
const { width } = Dimensions.get('screen')
import { Ionicons } from '@expo/vector-icons'; 

export default function LocationAddressItem({location}) {
  return (
    <View>
            
              {/* currentLocation primary */}
              <View style={[styles.currentLocation,{
                backgroundColor: Colors.piege
                ,borderWidth:1
              }]}>
                <Ionicons name="md-location-outline" size={24} color={Colors.primaryColor} />
                <AppText
                  text={location}
                  centered={false}
                  style={{  color:Colors.blackColor, marginBottom: 10 }}
                />
              </View>
            </View>
  )
}
const styles = StyleSheet.create({
    currentLocation: {
      height: "auto",
      width: width * 0.85,
      borderRadius: 10,
      backgroundColor: Colors.primaryColor,
      display: "flex",
      alignContent: "center",
      gap:10,
    //   justifyContent: "center",
      flexDirection: "row",
      marginVertical:10,
      padding: 10,
    },
    headerContainer:{
      display: "flex",
      alignContent: "center",
      width:width*0.94,
      marginTop:10,
      justifyContent: "space-between",
      flexDirection: "row",
    }
  });
  