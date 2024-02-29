import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from "react-redux";
import { useQuery } from '@tanstack/react-query';
import useNotifications from '../../utils/notifications'; // Adjust the path to your notifications utility file
import api from '../../utils';
import * as BackgroundFetch from 'expo-background-fetch';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as geolib from "geolib";
import { setOrders, setProviderCurrentOffers } from '../store/features/ordersSlice';
import io from 'socket.io-client';
import useOrders from '../../utils/orders';
import * as TaskManager from 'expo-task-manager';
import { Audio } from 'expo-av';
import { EXPO_PUBLIC_BASE_URL} from '@env'
import { SUPORTED_DISTANCE } from '../navigation/routes';
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
const ProviderCurrentOffers = useSelector((state)=>state?.orders?.currentOffers)
const { sendPushNotification, token } = useNotifications();
  const dispatch = useDispatch();
const { data:ordersData,refetch:refetchOrders}=useOrders()




  const checkForNewOrders = async (newOrderId) => {
    try {
   const ordersData =   await  refetchOrders()
  //  console.log("orders fetched",ordersData)
      dispatch( setOrders(ordersData?.data))
      console.log("setting the redux order",ordersData?.data?.data)
      const newOrders = await fetchData(locationCoordinate);
      if(newOrders){
        const newOrderFetched = newOrders?.filter((item)=>item?.id === newOrderId)

        if ( newOrderFetched?.length === 1  ) {

            play()
          
      dispatch( setProviderCurrentOffers(selectedItemsData?.length))
    }
  }
    } catch (error) {
      console.error('Error checking for new orders:', error);
    }
  };
  /******* sound part  */
  let soundObject;

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/notification-sound.mp3'),
      { shouldPlay: true, staysActiveInBackground: true }
    );
    await sound.playAsync();
  };
  

  const play = async () => {
    await playSound();
    await soundObject.playAsync();
  };
  
  useEffect(() => {
    return soundObject
      ? () => {
          soundObject.unloadAsync(); // Make sure to unload the sound
        }
      : undefined;
  }, [soundObject]);

 /******* sound part  */

    /******* fetchData part  */

  const fetchData = async(coordinate) => {
    const newOrdersData = await refetchOrders();
    if (newOrdersData?.data?.data && coordinate) {
      if (Array.isArray(newOrdersData?.data?.data)) {

      const nearOrders = newOrdersData?.data?.data?.filter((item) => {
        const orderCoordinate = {
          latitude: item.attributes.googleMapLocation.coordinate.latitude,
          longitude: item.attributes.googleMapLocation.coordinate.longitude,
        };
        const distance = geolib.getDistance(coordinate, orderCoordinate);
        return distance <= SUPORTED_DISTANCE; // 10 kilometers
      });
      console.log("searching near location",coordinate)
      const pendingOrders = nearOrders?.filter(
        (item) =>
          item?.attributes?.status === "pending" &&
          (item?.attributes?.services?.data?.length > 0 || item?.attributes?.service_carts?.data?.length)
      );
      const filteredOrders = pendingOrders?.filter((order)=>  userCategories?.data?.filter((category)=>
      {
        const CartServiceCategoryId = order?.attributes?.service_carts?.data[0]?.attributes?.service?.data?.attributes?.category?.data?.id
        return  ((order?.attributes?.services?.data[0]?.attributes?.category?.data?.id === category?.id ) || (CartServiceCategoryId === category?.id))
      })[0])
      console.log("filtered one ",filteredOrders?.length)
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
    /******* location part  */

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
  }, [ordersData]);
        /******* socket part  */

        useEffect(() => {
          const newSocket = io(EXPO_PUBLIC_BASE_URL);
        
          newSocket.on('order:create', async (data) => {
            console.log("connecting to the strapi");
            try {
              // First, refetch the orders
              const newOrdersData = await refetchOrders();
              // After refetching, dispatch the new orders
              dispatch(setOrders(newOrdersData?.data));
              // Now, fetch the data based on the updated location coordinate
              const orders = await fetchData(locationCoordinate);
              console.log("data", orders?.length, newOrdersData?.data?.length);
              if (orders?.length >  0) {
                console.log('Order created! Listening for order...2', data?.data?.id, newOrdersData?.data?.data?.length, orders?.length);
                checkForNewOrders(data?.data?.id);
              }
            } catch (error) {
              console.log("error reor", error);
            }
          });
        
          setSocket(newSocket);
        
          // Clean up the socket connection when the component unmounts
          return () => {
            if (newSocket) {
              newSocket.off('order:create');
              newSocket.disconnect();
            }
          };
        }, [locationCoordinate]); // Add locationCoordinate to the dependency array to rerun this effect if the location changes
        
  const ORDER_LISTENER_TASK = 'order-listener-task';

TaskManager.defineTask(ORDER_LISTENER_TASK, async ({ data: { orderId }, error }) => {
  try {
    
    if (error) {
      console.log("error define task mangagte",defineTask)
      // Error occurred - check `error.message` for more details.
      return;
    }
    if (orderId) {
      // Play the sound for the new order
      await playSound();
      sendPushNotification(token,"new order hhhhhhhhhhhhh")
    }
    return;
  } catch (error) {
    console.log("error define task mangagte2",error)

  }
});
  useEffect(() => {
    // Register the task when the component mounts
    TaskManager.defineTask(ORDER_LISTENER_TASK, async ({ orderId }) => {
      try {
        
        if (orderId) {
          // This will be called when the task is executed
          await playSound();
          sendPushNotification(token, "New order received.");
        }
      } catch (error) {
        console.log("error define the task ",error)
      }
    });
  
    // Other setup code...
  }, []);
  



  return null;
}


