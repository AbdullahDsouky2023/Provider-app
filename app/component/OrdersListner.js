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
import BackgroundActions from 'react-native-background-actions';
import Sound from 'react-native-sound';

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
      console.log("setting the redux order")
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
  try {
    const sound = new Sound(
      require('../assets/notification-sound.mp3'),
      (error) => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        // Play the sound
        sound.play((success) => {
          if (success) {
            console.log('Successfully finished playing');
          } else {
            console.log('Playback failed due to audio decoding errors');
          }
          // Release the sound resource
          sound.release();
        });
      }
    );
  } catch (error) {
    console.log('Error playing sound', error);
  }
};

  

const play = async () => {
  await playSound();
};

// Remove this useEffect hook
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
        

        // / Define the background task
        const backgroundTask = async (taskData) => {
         // Establish a socket connection
         const socket = io(EXPO_PUBLIC_BASE_URL);
        
         // Listen for new order events
         socket.on('order:create', async (data) => {
            console.log("New order event received in background task",data?.data?.id);
            // Call checkForNewOrders function
          //  await sendPushNotification(token,"new order is fuond")
          // play()
            await checkForNewOrders(data?.data?.id);
         });
        
         // Keep the task alive
         while (true) {
            await new Promise(resolve => setTimeout(resolve, 1000));
         }
        };
        
        // Start the background task
        useEffect(() => {
         const options = {
            taskName: 'Listen for New Orders',
            taskTitle: 'Background Task',
            taskDesc: 'Listening for new orders in the background',
            taskIcon: {
              name: 'ic_launcher',
              type: 'mipmap',
            },
            color: '#ff00ff',
            parameters: {},
         };
        
         BackgroundActions.start(backgroundTask, options);
        
         return () => {
            // Stop the task when the component unmounts
            BackgroundActions.stop();
         };
        }, []);
        


  return null;
}


