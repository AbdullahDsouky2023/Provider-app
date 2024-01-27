import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState,memo } from "react";
import { useSelector } from "react-redux";
import { ScrollView } from "react-native-virtualized-view";
import { FlatList } from "react-native";
import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";
import useOrders from "../../../utils/orders";
import LoadingScreen from "../loading/LoadingScreen";
import { RefreshControl  } from 'react-native';
import ArrowBack from "../../component/ArrowBack";
import ReviewOrderCard from "../../component/Account/ReviewOrderCard";

const { height , width } = Dimensions.get('screen')
 function MyReviews({navigation}) {
  
  const user = useSelector((state) => state?.user?.userData);
  const ordersRedux = useSelector((state) => state?.orders?.orders);
  const [orders,setOrders] = useState([])
  const {data,isLoading,refetch} = useOrders()
  const [refreshing, setRefreshing] = useState(false);
  const [currentOrders,setCurrentData]=useState([])
   const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };
const fetchData=()=>{
    const orders = ordersRedux?.data?.filter((item)=>item?.attributes?.provider?.data?.id === user?.id)
    const currentOrders = orders?.filter((item)=> item?.attributes?.provider_payment_status === "payed")
    setCurrentData(currentOrders)
  setRefreshing(false)
  refetch()
}
  useEffect(()=>{
    fetchData()
    },[data])

    if(isLoading) return <LoadingScreen/>
    
  return (
    <ScrollView 
    showsVerticalScrollIndicator={false}
    style={{
      backgroundColor:"white",
      height:"100%"
    }}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }>
    <ArrowBack />
    {
      currentOrders?.length === 0  &&
      <View style={styles.noItemContainer}>
        <AppText text={"There is no any Review yet!"} /> 

      </View>
    }
    { currentOrders?.length > 0 &&
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <FlatList
      data={currentOrders}
      style={styles.listContainer}
      renderItem={({item})=>{
        return <ReviewOrderCard item={item}/>
      }}
      keyExtractor={(item)=>item?.id}
      />
      </ScrollView>
    }
        </ScrollView>
  );
}
export default memo(MyReviews)
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
  height:height*0.7
  ,
  // marginVertical:50,
  width:width,
  backgroundColor:Colors.whiteColor
 }

});
