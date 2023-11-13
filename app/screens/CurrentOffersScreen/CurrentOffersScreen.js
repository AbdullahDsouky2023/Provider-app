import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Colors, Sizes } from "../../constant/styles";
import AppText from "../../component/AppText";
import AppHeader from "../../component/AppHeader";
import { useDispatch, useSelector } from "react-redux";
import useServices from "../../../utils/services";
import { setServices } from "../../store/features/serviceSlice";
import LoadingScreen from "../loading/LoadingScreen";
import { ErrorScreen } from "../Error/ErrorScreen";
import OffersServiceComponentList from "../../component/CurrentOffers/OffersListComponent";
import AllOffersList from "../../component/CurrentOffers/AllOffersList";
import { ScrollView } from "react-native-virtualized-view";

const { width } = Dimensions.get("screen");

const CurrentOffersScreen = ({route, navigation }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const [selectedItem, setSelectedItem] = useState("all");

  const selectedItemsData = categories?.data?.find(
    (category) => category?.attributes?.name === selectedItem
  );
  const { data, isLoading, isError } = useServices();
  const services = data?.data?.filter(
    (item) => item?.attributes?.category?.data?.id === selectedItemsData?.id
  );

 const getServices = async () => {
    if (data) {
      dispatch(setServices(data));
    } else if (isError) {
      console.log(isError);
    }
  };

 // Use useEffect to monitor changes in route.params.name
 useEffect(() => {
  if (route.params?.name) {
    console.log("setting the item ",route.params.name)
    setSelectedItem(route.params.name);
  }
}, [route.params?.name]);

useEffect(() => {
  getServices();
}, [dispatch, data]);

 

  if (isLoading) return <LoadingScreen />;
  if (isError) return <ErrorScreen />;
  // console.log(services.length,"abdul")
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <AppHeader />
      <ScrollView style={styles.container}>
        <View style={styles.listContainer}>
          <View style={{ paddingHorizontal: 10 }}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              extraData={selectedItem}
              ListHeaderComponent={
                <TouchableOpacity
                  style={selectedItem == "all" ? styles.activeItem : styles.item}
                  onPress={() => setSelectedItem("all")}
                >
                  <AppText text={"الكل"} style={{ color: Colors.whiteColor }} />
                </TouchableOpacity>
              }
              data={categories.data}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                flex: 1,
              }}
              keyExtractor={(item, index) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={
                    item == selectedItemsData ? styles.activeItem : styles.item
                  }
                  onPress={() => setSelectedItem(item?.attributes?.name)}
                >
                  <AppText
                    text={item?.attributes.name}
                    style={{ color: Colors.whiteColor }}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View>
          {selectedItem === "all" ? (
            <AllOffersList categories={categories} />
          ) : (
            <OffersServiceComponentList
              data={services}
              selectedItem={selectedItem}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingBottom:1000,
    height: "100%",
  },
  listContainer: {
    display: "flex",
    paddingTop: 15,
    paddingBottom: 20,
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
});

export default CurrentOffersScreen;
