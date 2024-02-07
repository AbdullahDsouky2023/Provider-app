import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useQuery } from '@tanstack/react-query';
import useNotifications from '../../utils/notifications'; // Adjust the path to your notifications utility file
import api from '../../utils';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as geolib from "geolib";
import { setOrders, setProviderCurrentOffers } from '../store/features/ordersSlice';
import io from 'socket.io-client';
import useOrders from '../../utils/orders';


const NEW_ORDER_NOTIFICATION_ID = 'NEW_ORDER_NOTIFICATION';
const BACKGROUND_FETCH_TASK = 'background-fetch'; // Task name

export default function OrdersListener() {
  const currentOrders = useSelector((state) => state?.orders?.orders);
  const orderRedux = useSelector((state) => state?.orders?.orders);
  const [socket, setSocket] = useState(null);
  const [locationCoordinate, setLocationCorrdinate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItemsData, setselectedItemsData] = useState(null);
  const [enableRefetch, setEnableRefetch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [currentOffers, setCurrentOffers] = useState([]);

const userCategories = useSelector((state)=>state?.user?.userData.attributes?.categories)
const SERVER_URL = 'http://192.168.1.3:1337';
const ProviderCurrentOffers = useSelector((state)=>state?.orders?.currentOffers)
const { sendPushNotification, token } = useNotifications();
  const dispatch = useDispatch();
const { data:ordersData,refetch:refetchOrders}=useOrders()
  const checkForNewOrders = async (newOrderId) => {
    try {
      refetchOrders()
      dispatch( setOrders(ordersData))
      const newOrders = await fetchData(locationCoordinate);
      // console.log('Fetching new order updates...', token, newOrders?.filter((item)=>item?.id === newOrderId), currentOrders?.data?.length,selectedItemsData?.length);
      if(newOrders){
        
        const newOrderFetched = newOrders?.filter((item)=>item?.id === newOrderId)
        const newOrderFetched2 = orderRedux?.data?.filter((item)=>item?.id === newOrderId)
        // console.log("fiiiiiiiiiiiiiiii",newOrderFetched,newOrderFetched2?.length,newOrderId)
        if ( newOrderFetched?.length === 1  ) {
        sendPushNotification(token, 'New Order Added', 'A new order has been added.');
      console.log("the current selected prders ",selectedItemsData?.length)
      // console.log("seeing order b use are ",ProviderCurrentOffers)
      dispatch( setProviderCurrentOffers(selectedItemsData?.length))
      
      
    }
  }
    } catch (error) {
      console.error('Error checking for new orders:', error);
    }
  };

  const fetchData = async(coordinate) => {
    const newOrdersData = await refetchOrders();
    if (newOrdersData && coordinate) {
      if (Array.isArray(newOrdersData?.data?.data)) {

      const orders = newOrdersData?.data?.data?.filter((item) => {
        const orderCoordinate = {
          latitude: item.attributes.googleMapLocation.coordinate.latitude,
          longitude: item.attributes.googleMapLocation.coordinate.longitude,
        };
        const distance = geolib.getDistance(coordinate, orderCoordinate);
        return distance <= 10000; // 10 kilometers
      });
      console.log("searching near location")
      const pendingOrders = orders?.filter(
        (item) =>
          item?.attributes?.status === "pending" &&
          item?.attributes?.services?.data?.length > 0
      );
      const filteredOrders = pendingOrders?.filter((order)=>  userCategories?.data?.filter((category)=>{
        return  (order?.attributes?.services?.data[0]?.attributes?.category?.data?.id === category?.id)})[0])
      setselectedItemsData(filteredOrders);
      setCurrentOffers(filteredOrders)
      // dispatch( setProviderCurrentOffers(filteredOrders?.length))
        return filteredOrders
    }
    setRefreshing(false);
    setEnableRefetch(false);
    setLoading(false)
  }
  };
  useEffect(() => {
    (async () => {
      try {
        const CurrentLocation = await AsyncStorage.getItem("userLocation");
        if (CurrentLocation){

          setLocationCorrdinate(JSON.parse(CurrentLocation).coordinate);
          fetchData(JSON.parse(CurrentLocation).coordinate);

          }
      } catch (error) {
        console.log(error);
      }finally {
        setLoading(false)
      }
    })();
  }, []);
    
  useEffect(() => {
    // Initialize the socket connection when the component mounts
    const newSocket = io(SERVER_URL);

    // Attach event listeners to the socket
    newSocket.on('order:create', async (data) => {
      console.log("connecting to the strapi")
      try {

        // Fetch orders and wait for the response
        const newOrdersData = await refetchOrders();
        // Dispatch the action with the new orders data
        dispatch(setOrders(newOrdersData?.data));
        // Now you can use the updated orders data
        const orders = await fetchData(locationCoordinate);
        if (orders) {
          console.log('Order createxd! Listening for order...', data?.data?.id, newOrdersData?.data?.data?.length,orders?.length);
          checkForNewOrders(data?.data?.id);
        }
      } catch (error) {
        console.log("error reor");
      }
    });
    

    // Save the socket reference in state
    setSocket(newSocket);

    // Clean up the socket connection when the component unmounts
    return () => {
      if (newSocket) {
        newSocket.off('order:create');
        newSocket.disconnect();
      }
    };
  }, []); 


// // //   //intervalu function 
//   useEffect(() => {
//     const intervalId = setInterval(checkForNewOrders, 10000); // Check every minute

//     return () => {
//       clearInterval(intervalId);
//     };
//  }, [currentOrders, refetchOrders, sendPushNotification, token]);

  // Define the background fetch task
  TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    const now = Date.now();
    console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);
    // Be sure to return the successful result type!
    return BackgroundFetch.Result.NewData;
  });

  // Register the background fetch task
  const registerBackgroundFetchAsync = async () => {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 60 * 15, // 15 minutes
      stopOnTerminate: false, // Android only
      startOnBoot: true, // Android only
    });
  };

  useEffect(() => {
    // Register the task when the component mounts
    registerBackgroundFetchAsync();

    // Clean up when the component unmounts
    return () => {
      BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
    };
  }, []);

  return null;
}


