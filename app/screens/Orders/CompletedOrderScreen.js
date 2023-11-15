import { RefreshControl  } from 'react-native';
import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-virtualized-view";
import CurrentOrderCard from "../../component/orders/CurrentOrderCard";
import { FlatList } from "react-native";
import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";
import useOrders from "../../../utils/orders";
import LoadingScreen from "../loading/LoadingScreen";
const { width } = Dimensions.get("screen");


export default function CompletedOrdersScreen({navigation}) {
  
  const user = useSelector((state) => state?.user?.userData);
  const ordersRedux = useSelector((state) => state?.orders?.orders);
  const [refreshing, setRefreshing] = useState(false);
const [currentOrders,setCurrentData]=useState([])
const { data ,isLoading}=useOrders()
const fetchData = ()=>{
  const userId = user?.id;
  const orders = ordersRedux?.data?.filter((item)=>item?.attributes?.provider?.data?.id === userId)
  const otherordes = data?.data?.filter((item)=>item?.attributes?.provider?.data?.id === userId)
  const currentOrders = orders?.filter((item)=>item?.attributes?.PaymentStatus === "payed")
  setCurrentData(orders)
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
    <ScrollView style={styles.wrapper} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
    {currentOrders?.length === 0 ? 
      <View style={styles.noItemContainer}>
      
      <AppText text={"لا يوجد طلبات لعرضها"} /> 
      </View>
      :
      <ScrollView style={styles.container}>
      <FlatList
      data={currentOrders}
      style={styles.listContainer}
      renderItem={({item})=>{
        return <CurrentOrderCard item={item}/>
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
  gap:10,
  height:"100%",
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
