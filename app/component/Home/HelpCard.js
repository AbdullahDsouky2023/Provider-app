import { Dimensions, View } from 'react-native'
import { Image } from 'react-native'
import React from 'react'

import { StyleSheet } from 'react-native'
import AppText from '../AppText'
import { Colors } from '../../constant/styles'
const { width} = Dimensions.get('screen')
export default function HelpCard({image,name}) {
  return (
        <View style={styles.card}>
             <Image style={styles.image} source= {{uri:image}}/>
            <AppText text={name} style={styles.text} />
        </View>
  )
}
const styles = StyleSheet.create({
    card:{
        height: 120,
        width: width * 0.27,
      marginVertical: 1,
      marginRight: 1,
      borderRadius: 10,
      backgroundColor: "#FFF",
      overflow: "hidden",
      elevation: 4,
    },
    text:{
        fontSize:14,
        color:Colors.blackColor,
        marginTop:5
    },
    image:{
        height:'70%',
        width:'100%'
    }
})