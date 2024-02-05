import { View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Colors,Fonts } from '../../constant/styles'
import { Image } from 'react-native'
import AppText from '../AppText'
import { RFPercentage } from 'react-native-responsive-fontsize'
const  { width, height } = Dimensions.get('screen')
export default function ServiceCard({image,name,onPress}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.card}>
            <Image style={styles.imageCard} source={{uri:image}}/>
            <AppText text={name} style={styles.text}/>
        </View>
    </TouchableWithoutFeedback>
  )
}
const styles = StyleSheet.create({
    card :{
        height:height*0.12,
        width:width*0.28,
        backgroundColor:'#FCF1EA',
        borderRadius:10,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        gap:4
    },
    text:{
        color:Colors.blackColor,
        ...Fonts.blackColor14Medium,
        fontSize:RFPercentage(1.66)
    },
    imageCard :{
        height:40,
        width:40
    }
})