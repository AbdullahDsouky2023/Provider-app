import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
  FlatList,
} from "react-native";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { CommonActions } from "@react-navigation/native";
import { ProgressBar } from "react-native-paper";
import { Colors, Sizes } from "../../constant/styles";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import AppText from "../../component/AppText";
import Logo from "../../component/Logo";
import AppForm from "../../component/Form/Form";
import ErrorMessage from "../../component/Form/ErrorMessage";
import FormField from "../../component/Form/FormField";
import SubmitButton from "../../component/Form/FormSubmitButton";
import { auth } from "../../../firebaseConfig";
import { EXPO_PUBLIC_SECRET_PASSWORD } from "@env";
import LoadingModal from "../../component/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setItem } from "../../utils/secureStore";
import {
  setUserData,
  userRegisterSuccess,
} from "../../store/features/userSlice";
import { createUser } from "../../../utils/user";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

import { getLocationFromStorage } from "../../../utils/location";
import AppButton from "../../component/AppButton";
import ArrowBack from "../../component/ArrowBack";
import CitiesDropDownComponent from "./CitiesDropDownComponent";
const { width, height } = Dimensions.get("screen");
const AdditionInfoScreen = ({ navigation, route }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [city, setCity] = useState(null);

  // const { phoneNumber } = route?.params
  const validationSchema = yup.object().shape({
    PhoneNumber: yup.string().required(t("This Field is Required!")),

    Id: yup.string().required(t("This Field is Required!")),
    LastName: yup
      .string()
      .required(t("This Field is Required!"))
      .min(3, "Full Name is too short")
      .max(50, "Full Name is too long"),
  });

  const handleFormSubmit = async (values) => {
    try {
      console.log("submiting")
      const userLocation = await getLocationFromStorage();
      // const validPhone = auth?.currentUser?.phoneNumber?.replace("+", "")
      setIsLoading(true);
      // const res = await createUser({
      //   email:values.emailAddress,
      //   name:values.fullName,
      //   // phoneNumber:phoneNumber
      // })
      console.log("values", values);

      // if(res){
      //   dispatch(userRegisterSuccess(auth?.currentUser));
      //   setItem("userData", auth?.currentUser);
      //   setUserData(res)
      //   navigation.dispatch(
      //     CommonActions.reset({
      //       index: 0,
      //       routes: [{ name:"App" }],
      //     }))
      // }else {
      //   Alert.alert("الاسم او البريد الالكتروني مستخدم من قبل ")
      //   console.log("the is the message befoe email and name is used befoer res",res)
      // }
    } catch (err) {
      console.log("error creating the resi", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <MaterialIcons
          name="arrow-back"
          size={27}
          color="black"
          style={{
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginTop: Sizes.fixPadding * 2.0,
          }}
          onPress={() => navigation.pop()}
        />
        <ProgressBar
          progress={0.9}
          color={Colors.primaryColor}
          style={{ backgroundColor: "white", height: 8 }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoCotnainer}>{/* <Logo /> */}</View>
          <View style={{ flex: 1, alignItems: "center" }}>
            {/* <AppText
            text={"Register New Account"}
            style={{ color: Colors.primaryColor, marginBottom: 10 }}
          /> */}
            <AppForm
              enableReinitialize={true}
              initialValues={{
                PhoneNumber: "",
                Id: "",
              }}
              onSubmit={handleFormSubmit}
              validationSchema={validationSchema}
            >
              <ErrorMessage error={error} visible={error} />
              <HeaderComponent header={"Phone Number"} />
              <FormField
                autoCorrect={false}
                icon="account"
                name="PhoneNumber"
                //   value="201144254129"
              />

              <HeaderComponent header={"Identification Number"} />
              <FormField
                autoCorrect={false}
                icon="account"
                name="Id"
                // placeholdesr="fullName"
              />
              <HeaderComponent header={"Choose City"} />
              <CitiesDropDownComponent value={city} setValue={setCity} />
          <View style={styles.termsContainer}>
            <FontAwesome name="edit" size={24} color={Colors.primaryColor} />
            <AppText
              text={"By Creating an account you accept our Terms and Condition"}
              style={{
                color: Colors.blackColor,
                fontSize: RFPercentage(1.5),
                minWidth: width*0.9,
                // backgroundColor:'red',
                marginLeft: 10,
              }}
              // centered={false}
            />
          </View>
              {city && (
                <SubmitButton
                  title="Register"
                  style={{ paddingHorizontal: 60, marginTop: 40 }}
                />
              )}
            </AppForm>
          </View>
        </ScrollView>
        {/* <AppButton title={"Confirm"}  onPress={handleSubmit} /> */}
        <LoadingModal visible={isLoading} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  termsContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    gap: 0,
    width: width,
    // flexWrap:'wrap'
  },
  logoCotnainer: {
    margin: 10,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    width: width,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    // paddingVertical: 0,
    margin: 0,
    gap: 4,
  },
  header: {
    fontSize: 14,
    color: Colors.blackColor,
  },
  Star: {
    color: Colors.primaryColor,
  },
});

export default AdditionInfoScreen;

const HeaderComponent = ({ header }) => (
  <View style={styles.headerContainer}>
    <AppText text={"*"} centered={false} style={styles.Star} />
    <AppText text={header} centered={false} style={styles.header} />
  </View>
);
