import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  Alert,
  Dimensions,
  FlatList,
} from "react-native";

import ArrowBack from "../component/ArrowBack";
import { Colors } from "../constant/styles";
import AppText from "../component/AppText";
import {  ScrollView} from 'react-native-virtualized-view'
import { useDispatch, useSelector } from "react-redux";
import {
  ITEM_ORDER_DETAILS,
  
} from "../navigation/routes";
import SelectLocationItem from "../component/location/SelectLocationItem";
import AppButton from "../component/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setCurrentOrderProperties } from "../store/features/ordersSlice";
import useRegions, { getRegionsFromLocalStorage } from "../../utils/region";
const { width } = Dimensions.get("screen");

const SelectRegionScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedId, setSelectedId] = useState(0);
  const {data:regions}= useRegions();
    const getRegions = async() => {
        try {
            const data =     getRegionsFromLocalStorage();
            // setRegions(data)
                console.log("this region function was called",regions?.data[0]?.attributes?.name);
              
            
        } catch (error) {
            
        }
          }
         
  useEffect(()=>{
    getRegions()
  }, [regions]);
  const handleSelecItem =(item)=>{
    setSelectedId(item)
    setSelectedRegion(item?.attributes?.name)
  }

  const handleSubmitRegion = () => {
    const item = regions?.data.find((item)=>item?.attributes?.name === selectedRegion)
    console.log("this is the region submiteed", item?.id);
    dispatch(setCurrentOrderProperties({ region:  item?.id }));
    navigation.navigate(ITEM_ORDER_DETAILS, { item: route?.params?.item });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ArrowBack />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={styles.headerContainer}>
              <AppText
                text={"choose region"}
                style={{
                  color: Colors.primaryColor,
                  marginBottom: 10,
                  fontSize: 19,
                }}
              />
              
            </View>
            <View>
              {/* region primary */}
              <FlatList
                data={regions?.data}
                renderItem={({ item }) => (
                  <SelectLocationItem
                    selectedLocation={selectedRegion}
                    item={item?.attributes?.name}
                    setSelectedLocation={setSelectedRegion}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </ScrollView>
        {selectedRegion && (
          <AppButton title={"comfirm"} onPress={handleSubmitRegion} />
        )}
        {/* <LoadingModal visible={!currentLocation} /> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  currentLocation: {
    height: "auto",
    width: width * 0.95,
    borderRadius: 10,
    backgroundColor: Colors.primaryColor,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 10,
    padding: 10,
  },
  headerContainer: {
    display: "flex",
    alignContent: "center",
    width: width * 0.94,
    marginTop: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default SelectRegionScreen;
