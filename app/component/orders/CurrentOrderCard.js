import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";
import { useNavigation } from "@react-navigation/native";
import { CHAT_ROOM, ORDERS_DETAILS } from "../../navigation/routes";
import PriceTextComponent from "../PriceTextComponent";
import AppButton from "../AppButton";
import { Entypo } from '@expo/vector-icons'; 

import { setcurrentChatChannel } from "../../store/features/ordersSlice";
const { width } = Dimensions.get("screen");

import { useDispatch} from  'react-redux'
export default function CurrentOrderCard({ item ,onPress}) {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  console.log("fff",    item?.attributes?.user?.data?.attributes?.username )
  return (
    <TouchableWithoutFeedback
    style={styles.scrollContainer}
      onPress={onPress}
    >
      <View style={styles.orderCardContainer}>
        <View style={styles.headerContainer}>

        {/* name */}
        <Image
        height={30}
        width={30}
        source={{uri:item?.attributes?.services?.data[0]?.attributes?.category?.data?.attributes?.image?.data[0]?.attributes?.url}}/>
        <AppText
          text={item?.attributes?.services?.data[0]?.attributes?.category?.data?.attributes?.name}
          style={[styles.header,{color:Colors.primaryColor}]}
          centered={false}
          />
          </View>
        {/* category */}
        <View style={styles.date}>
          <Ionicons name="ios-location-outline" size={24} color="black" />
          <AppText
            text={item?.attributes?.location}
            centered={false}
            style={styles.title}
          />
        </View>
        
        <View style={styles.date}>
          <Ionicons name="time-outline" size={24} color="black" />
          <AppText
            text={`${item?.attributes?.date}`}
            centered={false}
            style={styles.title}
          />
        </View>
        <View style={styles.date}>
          <AppText
            text={`الحاله`}
            centered={false}
            style={styles.status}
          />
           <AppText
            text={
              `${item?.attributes?.status === "assigned"?
              "طلب جديد":item?.attributes?.status =="accepted"?
              "تم القبول":item?.attributes?.status =="working" ?
               "جاري العمل":item?.attributes?.status =="finished" ?
                " تم الانتهاء":item?.attributes?.status =="payed"?
                "تم السداد":item?.attributes?.provider_payment_status =="payment_required" ?"في انتظار السداد":item?.attributes?.provider_payment_status ==="payed"?'تم السداد':"تم الانتهاء"}`}
            centered={false}
            style={styles.title}
          />
        </View>
        {/*time */}
        <View  style={{
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between'
        }}>
          <View style={styles.date}>

          <Ionicons name="person-outline" size={24} color="black" />
          <AppText
            text={
              item?.attributes?.user?.data?.attributes?.username || "العميل"
            }
            centered={false}
            style={styles.title}
            />
            </View>
          <View >

          {item?.attributes?.provider?.data?.attributes?.name &&
         
         <TouchableOpacity style={styles.chatContainer}
         onPress={() => {

           dispatch(setcurrentChatChannel(item?.attributes?.chat_channel_id))
           
           navigation.navigate("Chat")
          }
          }
           >
      <Entypo name="chat" size={24} color="white" />
      </TouchableOpacity >
          
        }
        </View>
        </View>
        {/*time */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  scrollContainer:{
    height: "100%",
    backgroundColor: Colors.redColor,

  },
  container: {
    height: "100%",
    backgroundColor: Colors.redColor,
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor:'red',
    paddingHorizontal: 11,
    paddingVertical: 4,
    gap: 10,
  },
  orderCardContainer: {
    paddingVertical: 10,
    width: width * 0.88,
    paddingHorizontal: 20,
    height: "100%",
    marginTop: 12,
    marginBottom:10,
    flex: 1,
    gap: 5,
    backgroundColor: Colors.whiteColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 1.41,

    elevation: 4,
    borderColor: Colors.blackColor,
    // borderWidth: 0.4,
    borderRadius: 8,
  },
  name: {
    color: Colors.blackColor,
    fontSize: 14,
  },
  title: {
    color: Colors.blackColor,
    fontSize: 14,
  },
  price: {
    color: Colors.primaryColor,
    fontSize: 14,
  },
  status: {
    color: Colors.primaryColor,
    fontSize: 14,
  },
  date: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  chatContainer:{paddingHorizontal:19,
    backgroundColor:Colors.primaryColor,
    width:"auto",
  height:40,
  borderRadius:20,
  // marginHorizontal:width*0.65,
  left:0,
  display:"flex",
  alignItems:'center',
  justifyContent:'center',}
});
