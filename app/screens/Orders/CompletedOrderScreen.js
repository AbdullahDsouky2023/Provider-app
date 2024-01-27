import { RefreshControl  } from 'react-native';
import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-virtualized-view";
import CurrentOrderCard from "../../component/orders/CurrentOrderCard";
import { FlatList } from "react-native";
import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";
import useOrders from "../../../utils/orders";
import LoadingScreen from "../loading/LoadingScreen";
import { COMPLETE_ORDERS_DETAILS, ORDERS_DETAILS } from '../../navigation/routes';
import { setCompleteOrders } from '../../store/features/ordersSlice';
const { width ,height} = Dimensions.get("screen");


export default function CompletedOrdersScreen({navigation}) {
  
  const user = useSelector((state) => state?.user?.userData);
  const ordersRedux = useSelector((state) => state?.orders?.orders);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch()
const [currentOrders,setCurrentData]=useState([])
const { data ,isLoading,refetch}=useOrders()
const fetchData = ()=>{
  const userId = user?.id;
  const orders = ordersRedux?.data?.filter((item)=>item?.attributes?.provider?.data?.id === userId)
  const otherordes = data?.data?.filter((item)=>item?.attributes?.provider?.data?.id === userId)
  const currentOrders = orders?.filter((item)=> item?.attributes?.provider_payment_status === "payed" && item?.attributes?.providerOrderRating !== null)
  setCurrentData(currentOrders)
  refetch()
  dispatch(setCompleteOrders(currentOrders?.length))
  // dispatch(setCompleteOrders(currentOrders?.length))
  setRefreshing(false);


}
  useEffect(()=>{
    fetchData()
    },[data])

    const onRefresh = () => {
      setRefreshing(true);
      fetchData();
    };
    if(isLoading) return <LoadingScreen/>
    return (
    <ScrollView style={styles.wrapper}
    showsVerticalScrollIndicator={false}
    refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
    {currentOrders?.length === 0 ? 
      <View style={styles.noItemContainer}>
      
      <AppText text={"لا يوجد طلبات لعرضها"} /> 
      </View>
      :
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <FlatList
      data={currentOrders}
      style={styles.listContainer}
      renderItem={({item})=>{
        console.log("item render",item?.id)
        return <CurrentOrderCard item={item} onPress={() => navigation.navigate(COMPLETE_ORDERS_DETAILS, { item })}/>
      }}
      keyExtractor={(item)=>item?.id}
      />
      </ScrollView>
    }
        </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper:{
      height: "100%",
      backgroundColor: Colors.whiteColor,
      // paddingTop:10,
      // paddingBottom:10,
  },
  container: {
    height: "100%",
    backgroundColor: Colors.whiteColor,
    width: width,
    paddingHorizontal: 20,
    // paddingTop:10,
    // paddingBottom:10,
    paddingVertical: -10,
  },
 listContainer:{
  display:"flex",
  flexDirection:'column',
  gap:10,
  backgroundColor:Colors.whiteColor,

  // height:height*1,
  alignItems:'center',
  justifyContent:'center'
 },
 noItemContainer:{
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  height:400,
  width:width,
  backgroundColor:Colors.whiteColor
 }

});
