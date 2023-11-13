import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Util } from 'expo';

import ArrowBack from "../../component/ArrowBack";
import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";
import Logo from "../../component/Logo";
import AppForm from "../../component/Form/Form";
import ErrorMessage from "../../component/Form/ErrorMessage";
import FormField from "../../component/Form/FormField";
import SubmitButton from "../../component/Form/FormSubmitButton";
import { auth, db, fireStore } from "../../../firebaseConfig";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import * as Updates from 'expo-updates';
import { AntDesign } from '@expo/vector-icons'; 

import LoadingModal from "../../component/Loading";
import { useDispatch, useSelector } from "react-redux";
import { storeUserInfo } from "../../utils/firebase/user";
import { setItem } from "../../utils/secureStore";
import { getUserByPhoneNumber, updateUserData } from "../../../utils/user";
import { setUserData } from "../../store/features/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
const UserInfo = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const validPhone = auth?.currentUser?.phoneNumber?.replace("+", "");
  const userData = useSelector((state)=>state?.user?.userData)
  // let user = useSelector((state) => state.user?.user?.phoneNumber);
  const validationSchema = yup.object().shape({
    fullName: yup
      .string()
      // .required(t("Full name is required"))
      .min(2, "الاسم  المدخل قصير جدا")
      .max(50, "الاسم المدخل طويل جدا"),
    emailAddress: yup
      .string()
      .email(("الايميل المدخل غير صالح"))
      // .required("الايميل مطلوب"),
     , location:yup.string()
      // .required(t("Email is required")),
  });
  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);
      console.log("this is the use data will be submite", {
        email: values.emailAddress || userData?.email,
        username: values.fullName || userData?.username,
        location: values.location,
        phoneNumber: Number(validPhone),
      });
      const res = await updateUserData(userData?.id,{
        email: values.emailAddress || userData?.email,
        username: values.fullName || userData?.username,
        location: values.location,
        // phoneNumber: Number(validPhone),
      });
      if (res) {
        const gottenuser = await getUserByPhoneNumber(Number(validPhone))
        dispatch(setUserData(gottenuser));
        // console.log("success",gottenuser)
        Alert.alert("تم التعديل بنجاح");
        // Updates.reloadAsync()

        // navigation.navigate("Splash")
      } else {
        console.log(res)
        Alert.alert("Something goes wrong");
      }}
     catch (err) {
      console.log("error creating the resi", err);
    } finally {
      setIsLoading(false);
    }
  };

  const convertNumber =(phoneNumber)=>{

// Convert the number to a string
let phoneNumberString = phoneNumber?.toString();

// Remove the first character
let phoneNumberWithoutFirstDigit = phoneNumberString.slice(1);

// Add "0" at the beginning
let finalPhoneNumber =  phoneNumberWithoutFirstDigit;
return finalPhoneNumber
  }
  const getUserInfo =async()=>{
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      const userData = JSON.parse(userDataString);
      const validPhone = `${userData?.phoneNumber?.replace(/\s/g, "").trim()}`;
      const PhoneNumberValidated = convertPhoneTovalid(validPhone)
      console.log(PhoneNumberValidated," this is the use data in loca")
      if (userData?.phoneNumber ) {
        const gottenuser = await getUserByPhoneNumber(PhoneNumberValidated )
        dispatch(setUserData(gottenuser));
        console.log("this function was called  ",gottenuser)
      } else {
        console.log("this function was called to auth ")
        // navigation.push("App");
      }
      
    } catch (error) {
      console.log("error getting the user fo rthe fir",error)
    }
  }
  const convertPhoneTovalid=(phone)=>{
    const phoneNumberWithoutPlus = phone?.replace("+", "");
              
              // Convert the string to a number
              const phoneNumber = Number(phoneNumberWithoutPlus);
              return phoneNumber
  }

  useEffect(()=>{
    getUserInfo()
  },[dispatch])
  console.log("ths is from user info ",userData)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ArrowBack />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <AppText
              text={"Register Your Account"}
              style={{ color: Colors.primaryColor, marginBottom: 10 }}
            />
            <AppForm
              enableReinitialize={true}
              initialValues={{ fullName: "", emailAddress: "",location:"" }}
              onSubmit={(data) => handleFormSubmit(data)}
              validationSchema={validationSchema}
            >
              <ErrorMessage error={error} visible={error} />
              <FormField
                autoCorrect={false}
                name="fullName"
                // placeholder="fullName"
                icon = {"user"}
                placeholder={userData?.username }
              />

              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                name="emailAddress"
                // placeholder="emailAddress"
                textContentType="emailAddress"
                placeholder={userData?.email}

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
  // Your styles remain the same
});

export default UserInfo;
