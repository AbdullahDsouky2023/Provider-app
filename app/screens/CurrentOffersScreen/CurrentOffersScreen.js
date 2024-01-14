import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  RefreshControl,
} from "react-native";
import { Colors, Sizes } from "../../constant/styles";
import AppText from "../../component/AppText";
import AppHeader from "../../component/AppHeader";
import { useDispatch, useSelector } from "react-redux";
import { setServices } from "../../store/features/serviceSlice";
import { ScrollView } from "react-native-virtualized-view";
import LottieView from "lottie-react-native";
import OrderOfferCard from "../../component/orders/OrderOfferCard";
import { ITEM_DETAILS } from "../../navigation/routes";
import useNotifications from "../../../utils/notifications";
import { ErrorScreen } from "../Error/ErrorScreen";
import * as Sound from 'expo-av';

import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
const { width, height } = Dimensions.get("screen");
import * as geolib from "geolib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "../loading/LoadingScreen";
import ChargeWalletScreen from "../wallet/ChargeWalletScreen";

const CurrentOffersScreen = ({ route, subPage }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const orderRedux = useSelector((state) => state?.orders?.orders);
  const userData = useSelector((state) => state?.user?.userData);
  const [selectedItemsData, setselectedItemsData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { token } = useNotifications();
  const [enableRefetch, setEnableRefetch] = useState(false);
  const [locationCoordinate, setLocationCorrdinate] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log("wallet ",userData?.attributes?.wallet_amount )
const userCategories = useSelector((state)=>state?.user?.userData.attributes?.categories)
  const fetchData = (coordinate) => {
    if (orderRedux && coordinate) {

      const orders = orderRedux?.data?.filter((item) => {
        const orderCoordinate = {
          latitude: item.attributes.googleMapLocation.coordinate.latitude,
          longitude: item.attributes.googleMapLocation.coordinate.longitude,
        };
        const distance = geolib.getDistance(coordinate, orderCoordinate);
        return distance <= 10000; // 10 kilometers
      });

      const pendingOrders = orders?.filter(
        (item) =>
          item?.attributes?.status === "pending" &&
          item?.attributes?.services?.data?.length > 0
      );
      const filteredOrders = pendingOrders?.filter((order)=>  userCategories?.data?.filter((category)=>{
        return  (order?.attributes?.services?.data[0]?.attributes?.category?.data?.id === category?.id)})[0])
      setselectedItemsData(filteredOrders);
    }
    setRefreshing(false);
    setEnableRefetch(false);
    setLoading(false)
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
  const getServices = async () => {
    if (data) {
      dispatch(setServices(data));
      
    } else if (isError) {
      console.log(isError);
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    setEnableRefetch(true);
    setLoading(true)
    fetchData(locationCoordinate);
  };
  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      {!orderRedux?.length > 0 ? (
        <>
          <StatusBar backgroundColor={Colors.primaryColor} />
          {!subPage && <AppHeader />}
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {selectedItemsData?.length > 0 ? (

userData?.attributes?.wallet_amount > 0 ? 
              <View style={styles.container}>
                <View style={styles.listContainer}>
                  <View style={{ paddingHorizontal: 10 }}>
                    <FlatList
                    style={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center'}}
                      data={selectedItemsData}
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
                </View>
              </View>
            :
            <ChargeWalletScreen/>
            ) 
            : (
              <View style={styles.noItemContainer}>
                <LottieView
        autoPlay
        // loop={false}
        // ref={animation}
        style={{
          width: width*0.3,
          height: height*0.4,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../assets/empty_orders.json")}
      />
                <AppText text={"لا يوجد طلبات متاحه حاليا"} />
              </View>
            )}
          </ScrollView>
        </>
      ) : (
        <ErrorScreen hanleRetry={fetchData} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  listContainer: {
    display: "flex",
    paddingTop: 15,
    width: width * 1,
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  item: {
    height: 50,
    borderRadius: 8,
    width: "auto",
    paddingHorizontal: 18,
    backgroundColor: Colors.blackColor,
    marginLeft: 15,
    display: "flex",
    justifyContent: "center",
  },
  activeItem: {
    height: 50,
    borderRadius: 8,
    width: "auto",
    paddingHorizontal: 18,
    backgroundColor: Colors.primaryColor,
    marginLeft: 15,
    display: "flex",
    justifyContent: "center",
  },

  animatedView: {
    backgroundColor: "#333333",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    borderRadius: Sizes.fixPadding + 5.0,
    paddingHorizontal: Sizes.fixPadding + 5.0,
    paddingVertical: Sizes.fixPadding,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 18,
    color: Colors.blackColor,
    paddingHorizontal: 18,
  },
  RegionHeader: {
    fontSize: 22,
    color: Colors.primaryColor,
    paddingHorizontal: 18,
  },
  noItemContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.7,
    width: width,
    backgroundColor: Colors.whiteColor,
  },
});

export default CurrentOffersScreen;
