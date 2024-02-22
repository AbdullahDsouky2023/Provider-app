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
import { CHAT_ROOM, CHAT_ROOM_fireBase, ORDERS_DETAILS, PROVIDER_LOCATION } from "../../navigation/routes";
import PriceTextComponent from "../PriceTextComponent";
import AppButton from "../AppButton";
import { Entypo } from '@expo/vector-icons';
import * as Linking from "expo-linking";

import { setcurrentChatChannel } from "../../store/features/ordersSlice";
const { width, height } = Dimensions.get("screen");

import { useDispatch } from 'react-redux'
export default function CurrentOrderCard({ item, onPress }) {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  return (
    <TouchableWithoutFeedback
      style={styles.scrollContainer}
      onPress={onPress}
    >
      <View style={[styles.orderCardContainer, { backgroundColor: item?.attributes?.packages?.data.length > 0 ? Colors.piege : Colors.whiteColor }]}>
        <View style={styles.headerContainer}>
          {item?.attributes?.services?.data?.length > 0 && (
            <>
              <Image
                height={22}
                width={22}
                source={{
                  uri: item?.attributes?.services?.data[0]?.attributes?.category
                    ?.data?.attributes?.image?.data[0]?.attributes?.url,
                }}
              />
              <AppText
                text={
                  item?.attributes?.services?.data[0]?.attributes?.category
                    ?.data?.attributes?.name
                }
                style={[
                  styles.header,
                  { color: Colors.primaryColor, fontSize: 17 },
                ]}
                centered={false}
              />
            </>
          )}
          {item?.attributes?.service_carts?.data?.length >  0 && 
  <>
    <AppText
      text={item?.attributes?.service_carts?.data[0]?.attributes?.service?.data?.attributes?.category?.data?.attributes?.name }
      style={[
        styles.header,
        { color: Colors.primaryColor, fontSize:  17 },
      ]}
      centered={false}
      />
  </>
    }
          {item?.attributes?.packages?.data?.length > 0  && (
            <AppText
              text={item?.attributes?.packages?.data[0]?.attributes?.name}
              style={[
                styles.header,
                { color: Colors.primaryColor, fontSize: 17 },
              ]}
              centered={false}
            />
          )}
        </View>
        <View style={styles.date}>
          <AppText text={`Status`} centered={false} style={styles.status} />
          <AppText
            text={`${item?.attributes?.status === "assigned"
                ? "New"
                : item?.attributes?.status === "pending"
                  ? "New"
                  : item?.attributes?.status === "accepted"
                    ? "Accepted"
                    : item?.attributes?.status === "working"
                      ? "Working"
                      : item?.attributes?.status === "finish_work"
                        ? "Finished"
                        : item?.attributes?.status === "payed"
                          ? "Payed" : item?.attributes?.provider_payment_status === "payment_required" ? "انتظار استلام الدفع"
                            : "Finished"
              }`}
            centered={false}
            style={styles.title}
          />
        </View>
        {/* Price */}
        <View style={styles.date}>
          <FontAwesome5 name="money-check" size={16} color="black" />
          <PriceTextComponent price={item?.attributes?.totalPrice} />
        </View>
        {/* date */}
        <View style={styles.date}>
          <FontAwesome name="calendar" size={21} color="black" />
          <AppText
            text={`${item?.attributes?.date}`}
            centered={false}
            style={styles.title}
          />
        </View>

        {/*time */}
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
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
            {(item?.attributes?.provider?.data?.attributes?.name && item?.attributes?.userOrderRating === null) &&
          <View style={styles.IconContainer}>


              <TouchableOpacity style={styles.chatContainer}
                onPress={() => {

                  dispatch(setcurrentChatChannel(item?.attributes?.chat_channel_id))
                  // console.log("current chat channel abdllah ",item?.attributes?.chat_channel_id)
                  navigation.navigate(CHAT_ROOM_fireBase,{
                    ProviderToken:item?.attributes?.provider?.data?.attributes?.expoPushNotificationToken                    ,
                    ProviderId:item?.attributes?.provider?.data?.id
                  })
                }
                }
              >
                <Entypo name="chat" size={20} color="white" />
              </TouchableOpacity >

              <TouchableOpacity style={styles.chatContainer}
                onPress={() => {
                  
                // navigation.navigate( PROVIDER_LOCATION,{apiData:item?.attributes?.googleMapLocation})
                Linking.openURL("https://maps.app.goo.gl/UXMEAg7v7eAQCQAp9")
                }
                }
              >
                <Entypo name="location-pin" size={20} color="white" />
              </TouchableOpacity >
          </View>
                }
        </View>
        {/*time */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    height: "100%",
    backgroundColor: Colors.redColor,

  },
  container: {
    height: "100%",
    backgroundColor: Colors.whiteColor,
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
    // maxHeight: height * 0.23,
    height: "auto",
    // minHeight: height * 0.2,
    // marginTop: 12,
    marginBottom: 10,
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
  chatContainer: {
    paddingHorizontal: 15,
    backgroundColor: Colors.primaryColor,
    width: width*0.131,
    height: height*0.04,
    borderRadius: 20,
    // marginHorizontal:width*0.65,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  IconContainer:{
    display:'flex',
    flexDirection:'row',
    gap:10
  }
});
