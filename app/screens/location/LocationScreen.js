import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { useTranslation } from "react-i18next";

import ArrowBack from "../../component/ArrowBack";
import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";

import { Ionicons } from "@expo/vector-icons";

import LoadingModal from "../../component/Loading";
import { getLocationFromStorage } from "../../../utils/location";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MANUAL_LOCATION_ADD } from "../../navigation/routes";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LocationAddressItem from "../../component/location/LocationAddressItem";
const { width } = Dimensions.get("screen");

const LocationScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [currentLocation, setCurrentLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [manualLocations, setManualLocations] = useState([]);

  const getCurrentLocationFromStorage = async () => {
    try {
      const location = await getLocationFromStorage();
      setCurrentLocation(location);
      selectedLocation(location);
    } catch (error) {}
    //    console.log(location)
  };
  useEffect(() => {
    getCurrentLocationFromStorage();
  }, []);

  useEffect(() => {
    loadManualLocations();
    console.log("this load function was called")
    // Check if there are updated locations from the AddAddressScreen
    if (route.params?.updatedLocations) {
      setManualLocations(route?.params?.updatedLocations);
    }
  }, [route?.params?.updatedLocations]);

  const loadManualLocations = async () => {
    try {
      const storedLocations = await AsyncStorage.getItem("manualLocations");

      if (storedLocations !== null) {
        setManualLocations(JSON.parse(storedLocations));
        console.log("manual location found ", JSON.parse(storedLocations));
      }
    } catch (error) {
      console.error("Error loading manual locations:", error);
    }
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
                text={"address"}
                style={{
                  color: Colors.primaryColor,
                  marginBottom: 10,
                  fontSize: 19,
                }}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate(MANUAL_LOCATION_ADD)}
              >
                <Ionicons
                  name="ios-add-circle-outline"
                  size={32}
                  color={Colors.blackColor}
                />
              </TouchableOpacity>
            </View>
            <View>

            <AppText
                text={"current Location"}
                centered={false}
                style={{ color: Colors.blackColor, marginBottom: 10 }}
                />
            <LocationAddressItem location={currentLocation} />
                </View>

            <View>
              <AppText
                text={"Manual Location"}
                centered={false}
                style={{ color: Colors.blackColor, marginBottom: 10 }}
              />
              {/* currentLocation primary */}
              <FlatList
                data={manualLocations}
                renderItem={({ item }) => (
                  //   Render your manual location item here
                  <LocationAddressItem location={item} />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </ScrollView>
        <LoadingModal visible={isLoading} />
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

export default LocationScreen;
