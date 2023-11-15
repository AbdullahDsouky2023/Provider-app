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

import { Colors } from "../../constant/styles";

import AppHeader from "../../component/AppHeader";
import { useDispatch } from "react-redux";
import useCategories from "../../../utils/categories";
import { setCategories } from "../../store/features/categorySlice";
import { setServices } from "../../store/features/serviceSlice";
import { setOrders } from "../../store/features/ordersSlice";
import useServices from "../../../utils/services";
import LoadingScreen from "../loading/LoadingScreen";
import { ErrorScreen } from "../Error/ErrorScreen";
import useOrders from "../../../utils/orders";
import ProviderSectionCard from "../../component/ProviderHome/ProviderSectionCard";
import { MY_ORDERS } from "../../navigation/routes";
import { setRegions } from "../../store/features/regionSlice";
import useRegions from "../../../utils/useRegions";

const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const { data, isLoading, isError } = useRegions()
  const { data:services } = useServices()
  const { data:orders } = useOrders()
  const [refreshing, setRefreshing] = useState(false);

  const fetchData =async()=>{
    if (data) {
      // Dispatch the fetched categories to the Redux store
       dispatch(setRegions(data));
      //  dispatch(setServices(services));
       dispatch(setOrders(orders));
       setRefreshing(false);
       console.log("dta",orders?.data[0]?.attributes?.region?.data?.attributes?.name)

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
  if (isError) return <ErrorScreen hanleRetry={getData}/>
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


