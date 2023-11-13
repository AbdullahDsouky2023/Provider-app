import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { Colors } from '../../constant/styles'
import AppText from '../AppText'
import AppButton from '../AppButton'
import { useSelector } from 'react-redux'

export default function UserImageAndName() {
  const user = useSelector((state)=>state.user.user)
  return (
    <View style={styles.container}> 
      <Image style={styles.userImage} source={{uri:'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600'}}/>
        <AppText text={user?.appName} style={styles.name}/>
        <AppButton title={'تعديل'} style={styles.button} textStyle={{color:Colors.primaryColor}}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container :{
       display:'flex',
       alignItems:'center',
       justifyContent:'center',
       height:200,
       gap:10,
       marginVertical:40,
    },
    userImage :{
        height:100,
        width:100,
        borderRadius:20
    },
    name :{
         color:Colors.blackColor
    },
    button :{
                marginTop: 0,
                backgroundColor:Colors.whiteColor,
                borderWidth:3,
                borderColor:Colors.primaryColor
                
    }
})