import {
    View,
    Text,
    FlatList,
    Dimensions,
    Image,
    Button,
    TouchableOpacity,
    RefreshControl,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { ScrollView } from "react-native-virtualized-view";
  import LoadingScreen from "./loading/LoadingScreen";
  import { StyleSheet } from "react-native";
  import { Colors } from "../constant/styles";
  import AppText from "../component/AppText";
  import AppButton from "../component/AppButton";
  import { useDispatch, useSelector } from "react-redux";
  import { color } from "react-native-reanimated";
  import ReserveButton from "../component/ReverveButton";
  import { ITEM_DETAILS, ORDER_SELECT_LOCATION } from "../navigation/routes";
import useCategories from "../../utils/categories";
import useOrders from "../../utils/orders";
import OrderOfferCard from "../component/orders/OrderOfferCard";
import * as geolib from 'geolib';
  const { width, height } = Dimensions.get("screen");
  import AsyncStorage from '@react-native-async-storage/async-storage';

  export default function OrdersScreen({ route ,navigation}) {
    const category = route.params?.name;
    const { data:categories, isLoading:loading, isError } = useCategories();
    // const { data:orders} = useOrders();
    const [services, setServices] = useState([]);
    const dispatch = useDispatch();
    const reduxOrders = useSelector(state=>state.orders.orders)
    const [slectedCategory, setSelectedCategory] = useState([]);
    const [locationCoordinate,setLocationCorrdinate]=useState(null) 
    const [isLoading,setIsLoading]=useState(false)

    const [categoryOrders,setCategoryOrders]=useState([])
    useEffect(() => {
      (async () => {
        const value = await AsyncStorage.getItem('userLocation');
        console.log("this is value",JSON.parse(value).coordinate)
        if (value !== null) {
          // We have data!!
          setLocationCorrdinate(JSON.parse(value).coordinate);
          console.log(JSON.parse(value)," this is the data that will be setting first mount")
          setIsLoading(false);
  
          fetchData(JSON.parse(value).coordinate);
  
        }
      })();
     }, [])
    const fetchData =(coordinate)=>{
      console.log('etch',coordinate)
      if(reduxOrders  && coordinate){  
        const orders = reduxOrders?.data?.filter(
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
            (item) => item?.attributes?.status === "pending"
            );
            const categoryOrders = pendingOrders.filter((order)=>order?.attributes?.services?.data[0]?.attributes?.category?.data?.attributes?.name === category )
            setCategoryOrders(categoryOrders)
          }
    }
    useEffect(() => {
      fetchData(locationCoordinate)
    }, [reduxOrders]);
    const onRefresh = () => {
      fetchData(locationCoordinate);
    };
    if ( isLoading || loading) return <LoadingScreen />;
    return (
      <>
        <ScrollView
       
          style={{
            height: height * 0.78,
          }}
        >
          <View style={styles.header}>
            <AppText
              text={` خدمات ${category} `}
              centered={true}
              style={{
                backgroundColor: "white",
                width: width,
                textAlign: "center",
                color: Colors.blackColor,
                marginTop: 10,
                padding: 5,
                borderRadius: 15,
              }}
            />
          </View>
          <View style={{ paddingHorizontal: 10,marginTop:10 }}>
                <FlatList
                  data={categoryOrders}
                  renderItem={({ item }) => {
                    return (
                      <OrderOfferCard
                        onPress={() =>
                          navigation.navigate(ITEM_DETAILS, { item })
                        }
                        item={item}
                      />
                    );
                  }}
                />
              </View>
        
        
        </ScrollView>
        
            
        </>
  
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      paddingVertical: 10,
      paddingHorizontal: 18,
      backgroundColor: Colors.whiteColor,
    },
    header: {
      textAlign: "center",
    },
    name: {
      fontSize: 17,
      color: Colors.blackColor,
    },
    itemContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      height: "auto",
      width: width * 0.95,
      padding: 10,
      // borderWidth: 0.7,
      borderRadius: 10,
        marginHorizontal: 8,
      backgroundColor: Colors.whiteColor,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 4,
      gap: 10,
    },
    descriptionContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "auto",
      width: width * 0.9,
      padding: 10,
      // borderWidth: 0.7,
      borderRadius: 10,
      marginVertical: 10,
      backgroundColor: Colors.whiteColor,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 4,
      gap: 10,
    },
    price: {
      fontSize: 17,
      color: Colors.primaryColor,
      marginTop: 5,
      fontWeight: 700,
    },
    title: {
      fontSize: 21,
      color: Colors.primaryColor,
    },
    itemContainer2: {
      display: "flex",
      flex: 2,
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    buttonsContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    increaseButtonContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: 80,
      height: 40,
      paddingHorizontal: 10,
      marginHorizontal: 5,
      borderRadius: 5.0,
      marginTop: 4.0,
      borderRadius: 40,
      backgroundColor: Colors.primaryColor,
    },
    buttonText: {
      color: Colors.whiteColor,
    },
  });
  