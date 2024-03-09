import { View, Text, TouchableWithoutFeedback, Dimensions } from "react-native";
import React, { useEffect, useState,memo } from "react";
import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../constant/styles";
import AppText from "../AppText";
import { useSelector } from "react-redux";
import LoadingScreen from "../../screens/loading/LoadingScreen";
const { width, height } = Dimensions.get("screen");
import * as geolib from "geolib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderTextComponent from "../Home/HeaderTextComponent";
import { ActivityIndicator } from 'react-native';
import { SUPORTED_DISTANCE } from "../../navigation/routes";

const  ProviderSectionCard = ({ image, name, onPress }) => {
  const user = useSelector((state) => state?.user?.userData);
  const ordersRedux = useSelector((state) => state?.orders?.orders);
  const [locationCoordinate, setLocationCorrdinate] = useState(null);
  const [loading, setLoading] = useState(true);
  const userCategories = useSelector(
    (state) => state?.user?.userData.attributes?.categories
  );
  const [currentOrders, setCurrentOrders] = useState([]);
  const [currentOffers, setCurrentOffers] = useState([]);
  
  useEffect(() => {
    const userId = user?.id;
    if (Array.isArray(ordersRedux?.data)) {
      const orders = ordersRedux.data.filter(
        (item) => item?.attributes?.provider?.data?.id === userId
      );
      setCurrentOrders(orders);
    }
  }, [user, ordersRedux]);
  

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem("userLocation");
      if (value !== null) {
        // We have data!!
        setLocationCorrdinate(JSON.parse(value).coordinate);
        setLoading(false);

        fetchData(JSON.parse(value).coordinate);
      }
    })();
  }, []);
  const fetchData = async(coordinate) => {
    try{

  
    console.log("the provide order data",ordersRedux?.data?.length)
    if (Array.isArray(ordersRedux?.data)) {
    if (ordersRedux && coordinate) {
      const orders = ordersRedux?.data?.filter((item) => {
        const orderCoordinate = {
          latitude: item?.attributes?.googleMapLocation?.coordinate?.latitude,
          longitude: item?.attributes?.googleMapLocation?.coordinate?.longitude,
        };
        if (coordinate && orderCoordinate.latitude !== undefined && orderCoordinate.longitude !== undefined) {

        const distance = geolib?.getDistance(coordinate, orderCoordinate);
        return distance <= SUPORTED_DISTANCE; // 10 kilometers
        }
        return false
      });
      
      const pendingOrders = orders?.filter(
        (item) =>
        item?.attributes?.status === "pending" &&
        (item?.attributes?.services?.data?.length > 0 || item?.attributes?.service_carts?.data?.length)
        );
      const filteredOrders = pendingOrders?.filter(
        (order) =>
        userCategories?.data?.filter((category) => {
            const CartServiceCategoryId = order?.attributes?.service_carts?.data[0]?.attributes?.service?.data?.attributes?.category?.data?.id
            return (
              order?.attributes?.services?.data[0]?.attributes?.category?.data
                ?.id === category?.id
              || CartServiceCategoryId === category?.id

            );
          })[0]
      );
      //  setselectedItemsData(filteredOrders);
      setCurrentOffers(filteredOrders);
    }}
  }catch(error){
    console.log("error geoli")
  }
  };
  useEffect(() => {
    fetchData(locationCoordinate);
  }, []);
  
  // if (loading ) {
  //   // show a loading indicator while data is being fetched
  //   return <ActivityIndicator size="large" color={Colors.primaryColor}/>;
  // }

  // if (loading) return <LoadingScreen />;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <HeaderTextComponent name={"Overview"} showAll={false}>
        <View style={styles.card}>
          <View style={styles.ItemContainer}>
            <View style={styles?.ballContainer}>
              <AppText text={currentOrders?.length} style={styles.text2} />
            </View>
            <View>
              <AppText
                text={" الطلبات المقبولة "}
                style={styles.text}
                centered={false}
              />
            </View>
          </View>
          <View style={styles.ItemContainer}>
            <View style={styles?.ballContainer}>
              <AppText text={currentOffers?.length} style={styles.text2} />
            </View>
            <View style={styles.container2}>
              <AppText
                text={" الـــعروض الــواردة "}
                style={styles.text3}
                centered={false}
              />
            </View>
          </View>
        </View>
      </HeaderTextComponent>
    </TouchableWithoutFeedback>
  );
}
export default memo(ProviderSectionCard)
const styles = StyleSheet.create({
  card: {
    minHeight: height * 0.15,
    width: width * 0.9,
    paddingVertical: 20,
    backgroundColor: Colors.bodyBackColor,
    borderRadius: 10,
    flex: 1,
    alignSelf: "center",
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginTop: 10,
    justifyContent: "center",
    // alignItems: "center",
    gap: 4,
    elevation: 3,
  },
  ballContainer: {
    backgroundColor: Colors.whiteColor,
    // Use a percentage or a relative unit instead of a fixed pixel value
    height: height*0.075, // Example using percentage
    width:  height*0.08, // Should match the height to maintain aspect ratio
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.primaryColor,
    borderWidth: 2,
    // Set the borderRadius to half of the width or height
    borderRadius: height*0.075*0.5, 
    outline: "blue",
    paddingHorizontal: 5,
   },
   
  text: {
    color: Colors.grayColor,
    // ...Fonts.grayColor14Medium
  },
  text2: {
    color: Colors.primaryColor,
    fontSize:20
    // ...Fonts.grayColor14Medium
  },
  text3: {
    color: Colors.grayColor,
    // includeFontPadding:14
    // letterSpacing:10,
    
    // ...Fonts.grayColor14Medium
  },
  show: {
    fontSize: 17,
  },
  imageCard: {
    height: 40,
    width: 40,
  },
  ItemContainer: {
    display: "flex",
    gap: 10,
    // justifyContent:'center',
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  container2: {
    display: "flex",
    justifyContent: "flex-start",
  },
});

