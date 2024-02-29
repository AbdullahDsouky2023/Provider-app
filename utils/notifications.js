import { View, Text } from 'react-native'
import React from 'react'
import { useState, useRef,useEffect } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateUserData } from './user';
import { useSelector } from "react-redux";
import { MY_ORDERS } from '../app/navigation/routes';
import { useNavigation } from "@react-navigation/native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function useNotifications() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const navigation = useNavigation()
    const userData = useSelector((state)=>state?.user?.userData)

    const responseListener = useRef();
    const setNotificationsTokenToStroage = async(token)=>{
        await AsyncStorage.setItem(
            "notificationsToken",
            JSON.stringify(token)
          );
          console.log("setting the notification ",token)

    }
    useEffect(() => {
      registerForPushNotificationsAsync().then(token => {
       
        setExpoPushToken(token)
        if(!userData?.expoPushNotificationToken){
          updateUserData(userData?.id,{"expoPushNotificationToken":token})
        }
        setNotificationsTokenToStroage(token)
        });
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
        // const { screen } = notification.request.content.data;
        // if (screen === "MY_ORDERS") {
        //   navigation.navigate(MY_ORDERS);
        // }
      });
      
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        // const { screen } = notification.request.content.data;
        // if (screen === "MY_ORDERS") {
        //   navigation.navigate(MY_ORDERS);
        // }
        // console.log(response);
      });
    //   sendPushNotification("ExponentPushToken[SnJOaPN023o2hr9sTHADnF]")
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);
    async function sendPushNotification(expoPushToken,title,body) {
        const message = {
          to: expoPushToken,
          sound: "default",
          title: title,
          body: body,
          data: {"screen":"MY_ORDERS" },
        
        };
      
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),

        });
      }
      async function registerForPushNotificationsAsync() {
        let token;
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [250, 250, 250, 250],
            lightColor: '#F2652a',
            
          });
        }
      
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig.extra.eas.projectId,
          });
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        return token?.data;
      }

      async function  getExpoPushTokenStorage  () {
        try {
          const token = await AsyncStorage.getItem("notificationsToken");
           if(token) return token 
            return null
           
        } catch (error) {
          console.error("Error retrieving notification token from storage:", error);
        }
      };
      
  return (
  { 
     token:expoPushToken,
    sendPushNotification,
    getExpoPushTokenStorage
}
  )
}
