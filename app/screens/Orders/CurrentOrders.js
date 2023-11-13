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


export default function CurrentOrders({navigation}) {
  
  const user = useSelector((state) => state?.user?.user);
  const ordersRedux = useSelector((state) => state?.orders?.orders);
  const [orders,setOrders] = useState([])
  const {data,isLoading} = useOrders()
const [currentOrders,setCurrentData]=useState([])
  useEffect(()=>{
      const currentOrders = ordersRedux?.data?.filter(
        (order) => order?.attributes?.phoneNumber === user?.phoneNumber
        );
        setCurrentData(currentOrders)
      console.log("from the current order Screen", currentOrders?.length);
    },[])

    if(isLoading) return <LoadingScreen/>
    
  return (
    <>
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
        </>
  );
}

const styles = StyleSheet.create({
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
  gap:10
 },
 noItemContainer:{
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  height:"100%",
  width:width,
  backgroundColor:Colors.whiteColor
 }

});
