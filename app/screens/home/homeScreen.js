import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  RefreshControl,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-virtualized-view";
import { Colors, mainFont } from "../../constant/styles";
import AppHeader from "../../component/AppHeader";

import { setOrders } from "../../store/features/ordersSlice";
import LoadingScreen from "../loading/LoadingScreen";
import { ErrorScreen } from "../Error/ErrorScreen";
import useOrders from "../../../utils/orders";
import ProviderSectionCard from "../../component/ProviderHome/ProviderSectionCard";
import { CURRENCY, MY_ORDERS, PROVIDER_LOCATION } from "../../navigation/routes";
import { setRegions } from "../../store/features/regionSlice";
import useRegions from "../../../utils/useRegions";
import OverviewComponent from "../../component/ProviderHome/OverviewComponent";
import { generateUserToken, useChatConfig } from "../chat/chatconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import ToggleSwitch from "toggle-switch-react-native";

import {
  setUserData,
  setUserStreamData,
  userRegisterSuccess,
} from "../../store/features/userSlice";
import ServicesList from "../../component/Home/ServicesList";
import CurrentOrders from "../Orders/CurrentOrders";
import CurrentOffersScreen from "../CurrentOffersScreen/CurrentOffersScreen";
import AppText from "../../component/AppText";
import UseLocation from "../../../utils/useLocation";
import { t } from "i18next";
import { getUserByPhoneNumber, updateUserData } from "../../../utils/user";
import OrdersListner from "../../component/OrdersListner";
import { useMemo } from "react";
import AppButton from "../../component/AppButton";

const { width, height } = Dimensions.get("screen");
const HomeScreen = ({ navigation }) => {
  const user = useSelector((state) => state?.user?.userData);
  const dispatch = useDispatch();
  // const { data, isLoading, isError ,refetch:refetchRegions } = useRegions();
  const {
    data: orders,
    isError: error,
    refetch: refetchOrders,
    isLoading,
  } = useOrders();
  const [location, setLocation] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { location: currentLocation } = UseLocation();
  const userData = useSelector((state) => state?.user?.userData);
  const switchValue = useMemo(() => {
    return userData?.attributes?.status === "active";
  }, [userData]);
  // useEffect(() => {
  //   setSwitchValue(userData?.attributes?.status === "active");
  // }, [userData]);

  const fetchData = async () => {
    try {
      if (orders) {
        // dispatch(setRegions(data));
        dispatch(setOrders(orders));
        setRefreshing(false);
        const chat = generateUserToken(user);
        dispatch(setUserStreamData(chat));
        if (userData?.attributes?.phoneNumber) {
          const gottenuser = await getUserByPhoneNumber(
            userData?.attributes?.phoneNumber
          );
          if (gottenuser) {
            dispatch(setUserData(gottenuser));
            dispatch(userRegisterSuccess(userData));
          }
        }
        refetchOrders();
        // refetchRegions()
      }
    } catch (error) {
      console.log("error refetch data", error);
    }
  };
  const handleChangeStatus = async (ison) => {
    try {
      const res = await updateUserData(userData?.id, {
        status: ison ? "active" : "inactive",
      });
      if (userData?.attributes?.phoneNumber) {
        const gottenuser = await getUserByPhoneNumber(
          userData?.attributes?.phoneNumber
        );
        if (gottenuser) {
          dispatch(setUserData(gottenuser));
          dispatch(userRegisterSuccess(userData));
        }
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, [orders]);
  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (isLoading ) return <LoadingScreen />;
  if (error) return <ErrorScreen hanleRetry={fetchData} />;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View
        style={{
          // flex: 1,
          flexDirection: "row",
          alignItems: "center",
          width: width,
          paddingHorizontal: 10,
          justifyContent: "space-between",
          // gap: 90,
        }}
      >
        <AppHeader />
        <TouchableWithoutFeedback>
          <View style={styles.WalletContainer}>
            <AppText
              style={{ fontSize: 15, color: "white", paddingVertical: 1 }}
              text={`${userData?.attributes?.wallet_amount} ${CURRENCY}`}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <ScrollView
      showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.cardContainer}>
          <View style={styles.swithContainer}>
            <AppText text={"Receive Orders"} style={styles.switchText} />
            <ToggleSwitch
              isOn={switchValue }
              onColor={Colors.success}
              offColor={Colors.grayColor}
              label={t("Receive Orders")}
              animationSpeed={0}
              labelStyle={{
                color: "black",
                fontWeight: "900",
                fontFamily: mainFont.bold,
                display: "none",
              }}
              size="large"
              onToggle={handleChangeStatus}
            />
          </View>
          <Image
            source={require("../../assets/images/worker.png")}
            resizeMode="contain"
            style={{ height: 130, width: 120, flex: 1.1 }}
          />
        </View>
        {/* <Orders Listner/> */}
        <ProviderSectionCard onPress={() => navigation.navigate(MY_ORDERS)} />
        <ServicesList />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 150,
    paddingHorizontal: 20,
    marginVertical: 10,
    gap: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  FloatHeaderContainer: {},
  container: {
    padding: 15,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row-reverse",
    backgroundColor: Colors.piege,
  },
  WalletContainer: {
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: 19,
    paddingVertical: 3,
    borderRadius: 12,
  },
  swithContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    padding: 15,
    borderRadius: 15,
  },
  switchText: {
    color: Colors.whiteColor,
  },
});

export default HomeScreen;
