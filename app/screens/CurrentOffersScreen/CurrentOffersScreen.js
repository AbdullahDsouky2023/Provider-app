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
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-virtualized-view";
import { isEqual } from 'lodash';
import * as geolib from "geolib";

import LottieView from "lottie-react-native";
import * as Sound from 'expo-av';

import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { Colors, Sizes } from "../../constant/styles";
import AppText from "../../component/AppText";
import AppHeader from "../../component/AppHeader";
import { setServices } from "../../store/features/serviceSlice";
import OrderOfferCard from "../../component/orders/OrderOfferCard";
import { ITEM_DETAILS, SUPORTED_DISTANCE } from "../../navigation/routes";
import useNotifications from "../../../utils/notifications";
import { ErrorScreen } from "../Error/ErrorScreen";
const { width, height } = Dimensions.get("screen");
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "../loading/LoadingScreen";
import ChargeWalletScreen from "../wallet/ChargeWalletScreen";
import ActiveScreenAlert from "../ActiveScreenAlert";
import { Audio } from 'expo-av';
import { setProviderCurrentOffers } from "../../store/features/ordersSlice";
import ChargeMoreWalletScreen from "../wallet/ChargeMoreWalletScreen";

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
const userCategories = useSelector((state)=>state?.user?.userData.attributes?.categories)
const [sound, setSound] = useState();
const [prevOrderRedux, setPrevOrderRedux] = useState(null);




  const fetchData = (coordinate) => {
    if (orderRedux && coordinate) {
      if (Array.isArray(orderRedux?.data)) {

      const orders = orderRedux?.data?.filter((item) => {
        const orderCoordinate = {
          latitude: item?.attributes?.googleMapLocation?.coordinate?.latitude,
          longitude: item?.attributes?.googleMapLocation?.coordinate?.longitude,
        };
        if (coordinate && orderCoordinate.latitude !== undefined && orderCoordinate.longitude !== undefined) {

          const distance = geolib.getDistance(coordinate, orderCoordinate);
          return distance <= SUPORTED_DISTANCE; // 10 kilometers
          }
          return false;
      });

      const pendingOrders = orders?.filter(
        (item) =>
          item?.attributes?.status === "pending" &&
          (item?.attributes?.services?.data?.length > 0 || item?.attributes?.service_carts?.data?.length)
          );
      const filteredOrders = pendingOrders?.filter((order)=>  userCategories?.data?.filter((category)=>{
        const CartServiceCategoryId = order?.attributes?.service_carts?.data[0]?.attributes?.service?.data?.attributes?.category?.data?.id

        return  (order?.attributes?.services?.data[0]?.attributes?.category?.data?.id === category?.id || CartServiceCategoryId === category?.id)})[0])
      setselectedItemsData(filteredOrders);
     dispatch( setProviderCurrentOffers(filteredOrders?.length))
    }
    setRefreshing(false);
    setEnableRefetch(false);
    setLoading(false)
  }
  };
// Pass the orderRedux state as a dependency
  
  // Pass the selectedItemsData state as a dependency
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
  if (userData?.attributes?.status === "inactive") {
    return <ActiveScreenAlert />;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      {!orderRedux?.length > 0 ? (
        <>
          <StatusBar backgroundColor={Colors.primaryColor} />
          {/* {!subPage && <AppHeader />} */}
          <ScrollView
          showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {selectedItemsData?.length > 0 ? (

userData?.attributes?.wallet_amount >= 300 ? 
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
            userData?.attributes?.wallet_amount > 0 ? 
                      <ChargeMoreWalletScreen amount={           userData?.attributes?.wallet_amount}/>:
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
        // Find more Lottie files at https:/dds/lottiefiles.com/featured
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
    height: height * 0.9,
    width: width,
    backgroundColor: Colors.whiteColor,
  },
});

export default CurrentOffersScreen;
