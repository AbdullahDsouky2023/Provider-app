import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  RefreshControl,
  Dimensions,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {ScrollView} from 'react-native-virtualized-view'
import { Colors } from "../../constant/styles";
import AppHeader from "../../component/AppHeader";

import { setOrders } from "../../store/features/ordersSlice";
import LoadingScreen from "../loading/LoadingScreen";
import { ErrorScreen } from "../Error/ErrorScreen";
import useOrders from "../../../utils/orders";
import ProviderSectionCard from "../../component/ProviderHome/ProviderSectionCard";
import { MY_ORDERS } from "../../navigation/routes";
import { setRegions } from "../../store/features/regionSlice";
import useRegions from "../../../utils/useRegions";
import OverviewComponent from "../../component/ProviderHome/OverviewComponent";
import { generateUserToken, useChatConfig } from "../chat/chatconfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location'

import { setUserStreamData } from "../../store/features/userSlice";
import ServicesList from "../../component/Home/ServicesList";
import CurrentOrders from "../Orders/CurrentOrders";
import CurrentOffersScreen from "../CurrentOffersScreen/CurrentOffersScreen";
import AppText from "../../component/AppText";
const { width } = Dimensions.get('screen')
const HomeScreen = ({ navigation }) => {
  const user = useSelector((state) => state?.user?.userData);
  const dispatch = useDispatch();
  // const { data, isLoading, isError ,refetch:refetchRegions } = useRegions();
  const { data: orders, isError: error ,refetch:refetchOrders,isLoading} = useOrders();
  const [location,setLocation]=useState(null)
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = async () => {
    if (orders) {
      // dispatch(setRegions(data));
      dispatch(setOrders(orders));
      setRefreshing(false);
      const chat = generateUserToken(user);
      dispatch(setUserStreamData(chat));

      refetchOrders()
      // refetchRegions()
    } 
  };

  useEffect(() => {
    fetchData();
  }, [orders]);
  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      const coordinate = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }
          setLocation(JSON.stringify(coordinate))
// Store the location in AsyncStorage
try {
  await AsyncStorage.setItem('userLocation', JSON.stringify(coordinate));
 } catch (error) {
  console.log(error);
 }    })();
  }, []);
  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen hanleRetry={fetchData} />;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >

        <AppHeader />
    
        <View style={styles.cardContainer}>
          <ProviderSectionCard onPress={() => navigation.navigate(MY_ORDERS)} />
          <Image source={require("../../assets/images/worker.png")} 
           resizeMode='contain' style={{height:130,
          width:120,flex:1.1}}/>
        </View>
        {/* <View style={styles.cardContainer}>
          <OverviewComponent />
        </View> */}
        <ServicesList/>
        {/* <AppText text={location} centered={false} style={{paddingHorizontal:19,fontSize:19,color:Colors.blackColor}}/> */}
        {/* <CurrentOffersScreen subPage={true}/> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 150,
    paddingHorizontal: 20,
    marginVertical: 10,
    display:'flex',
    flexDirection:'row'
  },
  FloatHeaderContainer:{
  }
});

export default HomeScreen;
