import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { Colors, Sizes } from "../../constant/styles";
import AppText from "../../component/AppText";
import AppHeader from "../../component/AppHeader";
import { useDispatch, useSelector } from "react-redux";
import { setServices } from "../../store/features/serviceSlice";
import { ScrollView } from "react-native-virtualized-view";
import RegionDropDown from "../../component/Region/RegionDropDown";
import useRegions from "../../../utils/useRegions";
import OrderOfferCard from "../../component/orders/OrderOfferCard";
import { ITEM_DETAILS } from "../../navigation/routes";

const { width } = Dimensions.get("screen");

const CurrentOffersScreen = ({route, navigation }) => {
  const dispatch = useDispatch();
  const {data:regions} = useRegions()
  const [region,setRegion]=useState("")
  const [selectedItemsData,setselectedItemsData] = useState()

   useEffect(() => {
    if(region !== ""){

      const selectedOrders = regions?.data.filter((item)=>item?.attributes?.name === region)
      setselectedItemsData(selectedOrders[0]?.attributes?.orders?.data)
      console.log(selectedOrders[0]?.attributes?.orders?.data?.length,"this is selecte")
    }else {
      const name = regions?.data[0]?.attributes?.name
      if(name) setRegion(name)
      console.log("add",regions?.data[0]?.attributes?.name) 
    }
    }, [region])
    
 const getServices = async () => {
    if (data) {
      dispatch(setServices(data));
    } else if (isError) {
      console.log(isError);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <AppHeader />
      {/* <RegionDropDown onChange={setRegion}/> */}
      <ScrollView style={styles.container}>
          <AppText text={region} centered={false} style={styles.RegionHeader}/>
        <View style={styles.listContainer}>
          <View style={{ paddingHorizontal: 10 }}>
            <FlatList
            data={selectedItemsData}
            renderItem={({item})=>{
              // console.log("this item",item)
              return <OrderOfferCard onPress={()=>navigation.navigate(ITEM_DETAILS,{item})} item={item}/>

            }}
            />
          
          </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingBottom:1000,
    height: "100%",
    // backgroundColor: "#333333",

  },
  listContainer: {
    display: "flex",
    paddingTop: 15,
    // paddingBottom: 20,
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
  header:{
    fontSize:18,
    color:Colors.blackColor,
    paddingHorizontal:18
  },
  RegionHeader:{
    fontSize:22,
    color:Colors.primaryColor,
    paddingHorizontal:18
  }
});

export default CurrentOffersScreen;