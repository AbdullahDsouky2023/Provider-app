import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-virtualized-view";
import * as Location from "expo-location";
import { Colors, Sizes } from "../constant/styles";
import AppText from "../component/AppText";
import AppHeader from "../component/AppHeader";
import LoadingScreen from "./loadingScreen";
import { useNavigation } from "@react-navigation/native";
import * as geolib from "geolib";
import useOrders from "../../utils/orders";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
import { isEqual } from 'lodash';
import { Audio } from 'expo-av';
import { setOrders } from "../store/features/ordersSlice";

const { width, height } = Dimensions.get("screen");

export default OrdersListner = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { data: orderRedux } = useOrders(); // Get new orders from useOrders
  const userData = useSelector((state) => state?.user?.userData);
  const prevOrderRedux = useSelector((state) => state?.orders?.orders);
  const [selectedItemsData, setselectedItemsData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [enableRefetch, setEnableRefetch] = useState(false);
  const [locationCoordinate, setLocationCorrdinate] = useState(null);
  const [loading, setLoading] = useState(true);
  const userCategories = useSelector(
    (state) => state?.user?.userData.attributes?.categories
  );

  // Move Sound management inside fetchData
  async function playSound() {
    console.log("Playing Sound due to new orders");
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/Ring-tone-sound.mp3")
    );
    sound.playAsync();
  }

  const fetchData = async (coordinate) => {
    try {
        
    
    if (orderRedux && coordinate) {
      const orders = orderRedux?.data?.filter((item) => {
        const orderCoordinate = {
          latitude: item?.attributes?.googleMapLocation?.coordinate?.latitude,
          longitude: item?.attributes?.googleMapLocation?.coordinate?.longitude,
        };
        const distance = geolib?.getDistance(coordinate, orderCoordinate);
        return distance <= 10000; // 10 kilometers
      });

      const pendingOrders = orders?.filter(
        (item) =>
          item?.attributes?.status === "pending" &&
          item?.attributes?.services?.data?.length > 0
      );
      const filteredOrders = pendingOrders?.filter((order) =>
        userCategories?.data?.filter((category) => {
          return (
            order?.attributes?.services?.data[0]?.attributes?.category?.data
              ?.id === category?.id
          );
        })[0]
        );
        setselectedItemsData(filteredOrders);
        dispatch(setOrders(orderRedux))
        // Play sound only if orderRedux data has changed
        console.log("first opening the app ",(prevOrderRedux?.data=== orderRedux?.data))
        if (!isEqual(prevOrderRedux?.data, orderRedux?.data) && prevOrderRedux?.data?.length>0 ) {
          playSound();
            console.log("current order from api ",orderRedux?.data)
      }
    //   setOdersorderRedux; // Update prevOrderRedux after playing sound
    }
    setRefreshing(false);
    setEnableRefetch(false);
    setLoading(false);
} catch (error) {
        console.log("error listnent to the orders",error)
}
  };

  // Remove useEffect for prevOrderRedux comparison
  // Removed prevOrderRedux state

  useEffect(() => {
    (async () => {
      try {
        const CurrentLocation = await AsyncStorage.getItem("userLocation");
        if (CurrentLocation) {
          setLocationCorrdinate(JSON.parse(CurrentLocation).coordinate);
          fetchData(JSON.parse(CurrentLocation).coordinate);
        }
      } catch (error) {
        console.log("erraf",error);
      } finally {
        setLoading(false);
      }
    })();
  }, [orderRedux,prevOrderRedux]);



    
    return <AppText text={"FF"} />;
  };
