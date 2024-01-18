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
import { createUser, updateUserData } from "../../../utils/user";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

import { getLocationFromStorage } from "../../../utils/location";
import AppButton from "../../component/AppButton";
import ArrowBack from "../../component/ArrowBack";
import CitiesDropDownComponent from "./CitiesDropDownComponent";
import { setCurrentRegisterProperties } from "../../store/features/registerSlice";
import { ORDER_SUCCESS_SCREEN } from "../../navigation/routes";
const { width, height } = Dimensions.get("screen");
const AdditionInfoScreen = ({ navigation, route }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const registerData = useSelector((state) => state.register.currentRegisterDate);
  const user = useSelector((state) => state.user.userData);
  const [city, setCity] = useState(null);

  // const { phoneNumber } = route?.params
  const validationSchema = yup.object().shape({
    Additional_phone: yup.string().required(t("This Field is Required!")),
    IdNumber: yup.string().required(t("This Field is Required!")),
    email:yup.email.required(t("This Field is Required!")),
  });

  const handleFormSubmit = async (values) => {
    try {
      console.log("submiting",route?.params?.status,user?.id );
      let res;
      // const validPhone = auth?.currentUser?.Additional_phone?.replace("+", "")
      setIsLoading(true);
      const  name = `${registerData.FirstName} ${registerData.MiddleName} ${registerData.LastName}`;
      if(route?.params?.status === "rejected"){
        res = await updateUserData(user?.id,{...registerData,...values,city,Provider_status:"pending"})
      }else {

       res = await createUser({...registerData,...values,name,phoneNumber:auth?.currentUser?.phoneNumber,city})
      }// registerData.name = name
      console.log("values",{...registerData,...values,name,phoneNumber:auth?.currentUser?.phoneNumber} );
      dispatch(setCurrentRegisterProperties({...values}))
      if(res){
        dispatch(userRegisterSuccess(auth?.currentUser));
        setItem("userData", auth?.currentUser);
        setUserData(res)
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name:ORDER_SUCCESS_SCREEN }],
          }))
      }else {
        Alert.alert("ثمت مشكلة الرجاء مراجعة البيانات والمحاولة مرة اخري")
        console.log("the is the message befoe email and name is used befoer res",res)
      }
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
        {/* <ProgressBar
          progress={0.9}
          color={Colors.primaryColor}
          style={{ backgroundColor: "white", height: 8 }}
        /> */}
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
                Additional_phone: auth?.currentUser?.phoneNumber,
                IdNumber: "",
              }}
              onSubmit={handleFormSubmit}
              validationSchema={validationSchema}
            >
              <ErrorMessage error={error} visible={error} />
              <HeaderComponent header={"Phone Number"} />
              <FormField
                autoCorrect={false}
                icon="account"
                name="Additional_phone"
                //   value="201144254129"
              />

              <HeaderComponent header={"Identification Number"} />
              <FormField
                autoCorrect={false}
                icon="account"
                name="IdNumber"
                // placeholdesr="fullName"
              />
              <HeaderComponent header={"Choose City"} />
              <CitiesDropDownComponent value={city} setValue={setCity} />
              <View style={styles.termsContainer}>
                <FontAwesome
                  name="edit"
                  size={24}
                  color={Colors.primaryColor}
                />
                <AppText
                  text={
                    "By Creating an account you accept our Terms and Condition"
                  }
                  style={{
                    color: Colors.blackColor,
                    fontSize: RFPercentage(1.5),
                    minWidth: width * 0.9,
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
    // marginTop:-20,
    margin: 0,
    marginBottom: -12,
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
