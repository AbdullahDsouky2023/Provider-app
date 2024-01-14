import { View, Text, TouchableWithoutFeedback, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../constant/styles";
import AppText from "../AppText";
import { useSelector } from "react-redux";
import { getUserCurrentOrders } from "../../../utils/user";
import LoadingScreen from "../../screens/loading/LoadingScreen";
const { width ,height} = Dimensions.get("screen");
import * as geolib from 'geolib';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProviderSectionCard({ image, name, onPress }) {
  const user = useSelector((state) => state?.user?.userData);
  const ordersRedux = useSelector((state) => state?.orders?.orders);
  const [locationCoordinate,setLocationCorrdinate]=useState(null) 
  const [loading, setLoading] = useState(true);
  const userCategories = useSelector((state)=>state?.user?.userData.attributes?.categories)
  const [currentOrders,setCurrentOrders]=useState([])
const [currentOffers,setCurrentOffers]=useState([])
  useEffect(()=>{
      const userId = user?.id;
      const orders = ordersRedux?.data?.filter((item)=>item?.attributes?.provider?.data?.id === userId)
      setCurrentOrders(orders)
      console.log("the user current items",orders?.length)
    },[ordersRedux])

    useEffect(() => {
      (async () => {
        const value = await AsyncStorage.getItem('userLocation');
        if (value !== null) {
          // We have data!!
          setLocationCorrdinate(JSON.parse(value).coordinate);
          setLoading(false);
  
          fetchData(JSON.parse(value).coordinate);
  
        }
      })();
     }, [])
    const fetchData =(coordinate)=>{
      if(ordersRedux  && coordinate){  
        const orders = ordersRedux?.data?.filter(
          (item) => {
           const orderCoordinate = {
             latitude: item?.attributes?.googleMapLocation?.coordinate?.latitude,
             longitude: item?.attributes?.googleMapLocation?.coordinate?.longitude,
           };
           const distance = geolib.getDistance( coordinate , orderCoordinate);
           return distance <= 10000; // 10 kilometers
          }
         );
         const pendingOrders = orders?.filter(
          (item) =>
            item?.attributes?.status === "pending" &&
            item?.attributes?.services?.data?.length > 0
        );
         const filteredOrders = pendingOrders?.filter((order)=>  userCategories?.data?.filter((category)=>{
           return  (order?.attributes?.services?.data[0]?.attributes?.category?.data?.id === category?.id)})[0])
        //  setselectedItemsData(filteredOrders);
        setCurrentOffers(filteredOrders)
          }
    }
    useEffect(() => {
      fetchData(locationCoordinate)
    }, [ordersRedux]);
    if(!currentOrders) return <LoadingScreen/>
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AppText text={"العروض التي تم استقبالها  : "} style={styles.text} centered={false} />
          <AppText text={currentOffers?.length} style={styles.text} />
        </View>
        <View
          style={styles.ItemContainer}
        >
          <AppText text={" الطلبات التي تم استلامها : "} style={styles.text} centered={false} />
          <AppText text={currentOrders?.length} style={styles.text} />
        </View>
       
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  card: {
    minHeight: height*0.15,
    width: width * 0.90,
    backgroundColor: Colors.bodyBackColor,
    borderRadius: 10,
    flex: 1,
    alignSelf:'center',
    paddingHorizontal: 20,
    marginHorizontal:10,
    justifyContent: "center",
    // alignItems: "center",
    gap: 4,
    elevation: 10,
  },
  text: {
    color: Colors.blackColor,
    // ...Fonts.blackColor14Medium
  },
  show: {
    fontSize: 17,
  },
  imageCard: {
    height: 40,
    width: 40,
  },
  ItemContainer:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }
});
