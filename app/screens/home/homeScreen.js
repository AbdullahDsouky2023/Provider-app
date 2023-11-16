import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { Colors } from "../../constant/styles";
import AppHeader from "../../component/AppHeader";

import { setOrders } from "../../store/features/ordersSlice";
import useServices from "../../../utils/services";
import LoadingScreen from "../loading/LoadingScreen";
import { ErrorScreen } from "../Error/ErrorScreen";
import useOrders from "../../../utils/orders";
import ProviderSectionCard from "../../component/ProviderHome/ProviderSectionCard";
import { MY_ORDERS } from "../../navigation/routes";
import { setRegions } from "../../store/features/regionSlice";
import useRegions from "../../../utils/useRegions";
import OverviewComponent from "../../component/ProviderHome/OverviewComponent";
import ChatScreen from "../chat/ChatScreen";
import AppButton from "../../component/AppButton";
import { generateUserToken, useChatConfig } from "../chat/chatconfig";
import { setUserStreamData } from "../../store/features/userSlice";

const HomeScreen = ({ navigation }) => {
const user = useSelector((state)=>state?.user?.userData)
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useRegions()
 const { data:orders } = useOrders()
 
  const [refreshing, setRefreshing] = useState(false);
  const fetchData =async()=>{
    if (data) {
       dispatch(setRegions(data));
       dispatch(setOrders(orders));
       setRefreshing(false);
       const chat = generateUserToken(user)
       dispatch(setUserStreamData(chat));
    } 
    else if (isError) {
      console.log(isError)
    //   // Handle the error
    }
  }

  useEffect(() => {    
    fetchData()
  }, [data]);
  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (isLoading) return <LoadingScreen/>
  if (isError) return <ErrorScreen hanleRetry={fetchData}/>
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}
    >

      <StatusBar backgroundColor={Colors.primaryColor} />
      <ScrollView style={{ flex: 1 }} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
        <AppHeader />
       
            <View style={styles.cardContainer}>
              <ProviderSectionCard  onPress={()=>navigation.navigate(MY_ORDERS)}/>
            </View>
            <View style={styles.cardContainer}>
              <OverviewComponent />
            </View>
       {/* <AppButton onPress={()=>navigation.navigate("Chat")} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer :{
    height:150,
    paddingHorizontal:20,
    marginVertical:50,
  }
})

export default HomeScreen;


