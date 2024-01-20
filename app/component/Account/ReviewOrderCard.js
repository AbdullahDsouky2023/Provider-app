import { View, Text, StyleSheet,Dimensions } from 'react-native'
import React from 'react'
import { Colors } from '../../constant/styles'
import AppText from '../AppText'
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import Stars from 'react-native-stars';

// import i18n from 'i18n-js'; // import i18n-js library
const { width , height} = Dimensions.get("screen")
export default function ReviewOrderCard({item}) {
  const date = moment(item?.attributes?.date);
// format the date as you like, for example:
// const readableDate =  date.locale(i18n.locale).format('LL')
  return ( 
    <View style={styles.container}>
      <AppText text={item?.attributes?.user?.data?.attributes?.username} style={styles.name} centered={false}/>
      <AppText text={item?.attributes?.date} style={styles.date} centered={false}/>
    <View style={styles.reviewContainer}>
    <Stars
  default={5} // set the default rating value
  count={Number(item?.attributes?.userOrderRating)} // set the total number of stars
  half={true} // enable half star mode
  starSize={24} // set the size of the stars
  fullStar={<AntDesign name="star" size={24} color={Colors.primaryColor} />} 
  />
    </View>
      <AppText

       text={item?.attributes?.userOrderReview || "لا يوجد تعليق"}
        style={styles.review} centered={false}/>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    borderWidth:1,
    backgroundColor:Colors.whiteColor,
    padding:10,
    borderColor:Colors.grayColor,
    borderRadius:15
  },
  name :{
    color:Colors.primaryColor,
    fontSize:17,

  },
  review:{
    color:Colors.blackColor,
    fontSize:15,
    maxWidth:width*0.9,
    paddingHorizontal:4,
    paddingVertical:4
  },
  reviewContainer:{
    display:"flex",
    alignItems:'center',
    flexDirection:'row',
    gap:10
  },
  date:{
    color:Colors.grayColor,
    fontSize:15,

  }
})