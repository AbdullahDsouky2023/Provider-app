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
import * as yup from "yup";
import { useTranslation } from "react-i18next";

import ArrowBack from "../../component/ArrowBack";
import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";
import LoadingModal from "../../component/Loading";
import { useSelector } from "react-redux";
import { getLocationFromStorage } from "../../../utils/location";
import AppForm from "../../component/Form/Form";
import AppFormField from "../../component/Form/FormField";
import ErrorMessage from "../../component/Form/ErrorMessage";
import SubmitButton from "../../component/Form/FormSubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ORDER_SELECT_LOCATION } from "../../navigation/routes";
const { width } = Dimensions.get("screen");

const AddManualLocationScreen = ({ navigation,route }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const userData = useSelector((state) => state.user?.userData);

  const handleAddLocation = async (data) => {
    if (data.location.trim() !== "") {
      try {
        const storedLocations = await AsyncStorage.getItem("manualLocations");
        const existingLocations = storedLocations
          ? JSON.parse(storedLocations)
          : [];

        const updatedLocations = [...existingLocations, data.location];
        console.log("the new location ", updatedLocations);
        await AsyncStorage.setItem(
          "manualLocations",
          JSON.stringify(updatedLocations)
        );
          if(route.params?.order){
            navigation.navigate(ORDER_SELECT_LOCATION, { updatedLocations });
          }else {
            navigation.navigate("location-pin", { updatedLocations });
          }
          // Navigate back to the Address screen
          
      } catch (error) {
        console.error("Error adding manual location:", error);
      }
    }
  };
  // let user = useSelector((state) => state.user?.user?.phoneNumber);
  const validationSchema = yup.object().shape({
    location: yup
      .string()
      .min(5, "العنوان المدخل قصير جدا ")
      .max(100, "العنوان المدخل قصير جدا ")
      .required(t("Please add the location")),
    // .required(t("Email is required")),
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ArrowBack />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <AppText
              text={"Add Address"}
              style={{
                color: Colors.primaryColor,
                marginBottom: 10,
                fontSize: 19,
              }}
            />

            <AppForm
              enableReinitialize={true}
              initialValues={{ location: "" }}
              onSubmit={(data) => handleAddLocation(data)}
              validationSchema={validationSchema}
            >
              <ErrorMessage error={error} visible={error} />
              <AppFormField
                autoCorrect={false}
                name="location"
                // placeholder="fullName"
                icon={"user"}
                // placeholder={"location"}
              />
              <SubmitButton title="Save" />
            </AppForm>
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

export default AddManualLocationScreen;
