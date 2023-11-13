import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";

import { Colors, Fonts, Sizes } from "../../constant/styles";
import {
  topCategoriesList,
} from "../../data/home";
import OffersBanner from "../../component/Home/OffersBanner";
import ServicesList from "../../component/Home/ServicesList";
import LowOffers from "../../component/Home/LowOffers";
import OtherServicesList from "../../component/Home/OtherServicesList";
import ReadyPackages from "../../component/Home/ReadyPackages";
import CleaningServices from "../../component/Home/CleaningServices";
import AskWorker from "../../component/Home/AskWorker";
import UsersReviews from "../../component/Home/UsersReview";
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
const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const { data, isLoading, isError } = useCategories()
  const { data:services } = useServices()
  const { data:orders } = useOrders()
  const getData =async()=>{
    if (data) {
      // Dispatch the fetched categories to the Redux store
       dispatch(setCategories(data));
       dispatch(setServices(services));
       dispatch(setOrders(orders));
    } else if (isError) {
      console.log(isError)
      // Handle the error
    }
  }

  useEffect(() => {    
    getData()
  }, [dispatch,data]);

  if (isLoading) return <LoadingScreen/>
  if (isError) return <ErrorScreen hanleRetry={getData}/>
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <AppHeader />
        <FlatList
          ListHeaderComponent={
            <>
              <OffersBanner />
              <ServicesList />
              <LowOffers />
              <ReadyPackages />
              <OtherServicesList />
              <CleaningServices />
              <AskWorker />
            </>
          }
          data={topCategoriesList}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          // renderItem={renderItem}
          ListFooterComponent={<UsersReviews />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchButtonStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 1.0,
    marginTop: Sizes.fixPadding + 5.0,
  },
  headerInfoWrapStyle: {
    flexDirection: "row",
    paddingLeft: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "space-between",
  },
  cartItemCountWrapStyle: {
    position: "absolute",
    right: -8.0,
    height: 17.0,
    width: 17.0,
    borderRadius: 8.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.redColor,
    elevation: 10.0,
  },
  sliderActiveDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5.0,
    backgroundColor: Colors.primaryColor,
    marginHorizontal: Sizes.fixPadding - 15.0,
  },
  sliderInactiveDotStyle: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: Colors.primaryColor,
  },
  sliderPaginationWrapStyle: {
    position: "absolute",
    bottom: -20.0,
    left: 0.0,
    right: 0.0,
  },
  boughtItemAndPastOrderInfoStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.whiteColor,
    borderColor: "rgba(0, 150, 136, 0.3)", //Colors.primaryColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    flex: 1,
    paddingHorizontal: Sizes.fixPadding,
    height: 65.0,
  },
  boughtItemAndPastOrderTextStyle: {
    flex: 1,
    paddingTop: 10.0,
    marginLeft: Sizes.fixPadding,
    ...Fonts.blackColor20Medium,
    lineHeight: 24.0,
  },
  boughtItemAndPastOrderInfoWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    margin: Sizes.fixPadding * 2.0,
    justifyContent: "space-between",
  },
  orderAndProductInfoStyle: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
    borderColor: "rgba(0, 150, 136, 0.3)",
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingTop: Sizes.fixPadding,
    paddingBottom: Sizes.fixPadding * 3.0,
  },
  percentageOffWrapStyle: {
    position: "absolute",
    left: -0.6,
    top: -0.5,
    backgroundColor: Colors.redColor,
    borderTopLeftRadius: Sizes.fixPadding,
    borderBottomRightRadius: Sizes.fixPadding,
    padding: Sizes.fixPadding - 4.0,
  },
  handPickedItemsImageWrapStyle: {
    backgroundColor: Colors.whiteColor,
    borderColor: "rgba(0, 150, 136, 0.3)",
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding,
    marginRight: Sizes.fixPadding * 2.0,
    width: 190.0,
    height: 180.0,
    alignItems: "center",
    justifyContent: "center",
  },
  featuredBrandsImageStyle: {
    width: 165.0,
    height: 240.0,
    borderColor: "rgba(0, 150, 136, 0.5)",
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding,
    marginRight: Sizes.fixPadding * 2.0,
  },
  dealsOfTheDayInfoWrapStlye: {
    backgroundColor: Colors.whiteColor,
    borderColor: "rgba(0, 150, 136, 0.3)",
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding,
    marginRight: Sizes.fixPadding * 2.0,
    width: 190.0,
    height: 180.0,
    alignItems: "center",
    justifyContent: "center",
  },
  rateNowButtonStyle: {
    backgroundColor: Colors.whiteColor,
    borderColor: "rgba(0, 150, 136, 0.5)",
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding - 5.0,
    flexDirection: "row",
    alignItems: "center",
    margin: Sizes.fixPadding * 2.0,
    paddingVertical: Sizes.fixPadding,
    paddingHorizontal: Sizes.fixPadding + 5.0,
  },
  topCategoriesWrapStyle: {
    backgroundColor: Colors.whiteColor,
    width: width / 2.0,
    alignItems: "center",
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
});

export default HomeScreen;


