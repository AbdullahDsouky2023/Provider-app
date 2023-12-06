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
import RegionDropDown from "../../component/Region/RegionDropDown";
import OrderOfferCard from "../../component/orders/OrderOfferCard";
import { ITEM_DETAILS } from "../../navigation/routes";
import useNotifications from "../../../utils/notifications";
import { ErrorScreen } from "../Error/ErrorScreen";
import useRegions from "../../../utils/useRegions";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("screen");

const CurrentOffersScreen = ({ route ,subPage}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const regions = useSelector((state) => state?.regions?.regions);
  const orderRedux = useSelector((state) => state?.orders?.orders);
  const [region, setRegion] = useState("");
  const [selectedItemsData, setselectedItemsData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { token} = useNotifications()
  const [enableRefetch,setEnableRefetch]=useState(false)
  // const { refetch} = useRegions()
  const fetchData = () => {
    if(orderRedux ){

      const orders = orderRedux?.data?.filter(
        (item) => item?.attributes?.region?.data?.attributes?.name === region
        );
        const pendingOrders = orders?.filter(
          (item) => item?.attributes?.status === "pending"
          );
          setselectedItemsData(pendingOrders);
          setRefreshing(false);
          setEnableRefetch(false)
        }
  };
  useEffect(() => {
    // if(regions?.data[0]?.length > 0 ){
      const position = regions?.data[0]?.attributes?.name
       if(position) setRegion(position);
      console.log("ther is  regions",regions?.length)
    // }
  }, [regions]);
  useEffect(() => {
    fetchData();
  }, [region]);


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
    fetchData();
  };
  return (
    
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
    {
      !regions?.length > 0 ?
      <>
      <StatusBar backgroundColor={Colors.primaryColor} />
     {!subPage && 
      <AppHeader />
     }
        {/* <RegionDropDown onChange={setRegion} enableRefetch={enableRefetch}/>  */}
       {/* <AppText text={region} centered={false} style={styles.RegionHeader} />  */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {selectedItemsData?.length > 0 ? (
          <View style={styles.container}>
            <View style={styles.listContainer}>
              <View style={{ paddingHorizontal: 10 }}>
                <FlatList
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
        ) : (
          <View style={styles.noItemContainer}>
            <AppText text={"لا يوجد طلبات في المنطقه"} />
          </View>
        )}
      </ScrollView> 
      </>
      :<ErrorScreen hanleRetry={fetchData} />}
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
    height: "100%",
    width: width,
    backgroundColor: Colors.whiteColor,
  },
});

export default CurrentOffersScreen;
