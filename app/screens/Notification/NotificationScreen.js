import { View, Text, StatusBar, Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArrowBack from "../../component/ArrowBack";
import LoadingScreen from "../loading/LoadingScreen";
import { SafeAreaView } from "react-native";
import { Colors } from "../../constant/styles";
import { FlatList } from "react-native";
import AppText from "../../component/AppText";
import { ScrollView } from "react-native-virtualized-view";
import NotificationItem from "../../component/notifications/NotificationItem";
import AppButton from "../../component/AppButton";
const { width } = Dimensions.get('screen')
export default function NotificationScreen() {
  const [notifications, setNotifications] = useState(null);
  useEffect(() => {
    (async () => {
      const notifications = JSON.parse(
        await AsyncStorage.getItem("notifications")
      );
      setNotifications(notifications);
      console.log(notifications[0] === null,"current notificaiton")
    })();
  },[]);
  const deleteNotification = async(item) => {
    try {
      
      console.log("deletei",item)
  
      setNotifications(notifications.filter((n) => n !== item));
      await AsyncStorage.setItem("notifications",JSON.stringify(notifications.filter((n) => n !== item)))
    } catch (error) {
      
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
        <ArrowBack />
      
      <ScrollView style={{padding:20}}>
        {
          notifications?.length > 0 ?
          <FlatList
          showsVerticalScrollIndicator={false}

          data={notifications}
          style={{
            display: "flex",
            gap: 20,
            flexWrap:'wrap',
            // backgroundColor:'red',
            flexDirection:'column'
          }}
          renderItem={({ item,index }) => {
            return <NotificationItem  
            text={item?.request?.content?.title} 
            time={item?.date}
            onDeleteNotfication={()=>deleteNotification(item)} />;
          }}
          keyExtractor={(item, index) => item + index}
          />
        :<AppText text={"There is no notifications yet"} style={{marginTop:width*0.5}}/>}
      </ScrollView>
    </SafeAreaView>
  );
}
