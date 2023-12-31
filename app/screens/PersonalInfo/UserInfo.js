import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, StatusBar, View, ScrollView, Alert } from "react-native";
import * as yup from "yup";

import ArrowBack from "../../component/ArrowBack";
import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";
import AppForm from "../../component/Form/Form";
import ErrorMessage from "../../component/Form/ErrorMessage";
import FormField from "../../component/Form/FormField";
import SubmitButton from "../../component/Form/FormSubmitButton";
import { auth } from "../../../firebaseConfig";

import LoadingModal from "../../component/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getUserByPhoneNumber, updateUserData } from "../../../utils/user";
import { setUserData } from "../../store/features/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { HOME } from "../../navigation/routes";
const UserInfo = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const validPhone = auth?.currentUser?.phoneNumber?.replace("+", "");
  const userData = useSelector((state) => state?.user?.userData);

  const validationSchema = yup.object().shape({
    fullName: yup
      .string()
      .min(2, "الاسم  المدخل قصير جدا")
      .max(50, "الاسم المدخل طويل جدا"),
    emailAddress: yup.string().email("الايميل المدخل غير صالح"),
    location: yup.string(),
  });

  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);
      const res = await updateUserData(userData?.id, {
        email: values?.emailAddress || userData?.attributes?.email,
        name: values?.fullName || userData?.attributes?.name,
      });
      if (res) {
        const gottenuser = await getUserByPhoneNumber(Number(validPhone));
        dispatch(setUserData(gottenuser));
        Alert.alert("تم التعديل بنجاح");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: HOME }],
          })
        );
      } else {
        Alert.alert("Something goes wrong");
      }
    } catch (err) {
      console.log("error creating the resi", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserInfo = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      const userData = JSON.parse(userDataString);
      const validPhone = `${userData?.phoneNumber?.replace(/\s/g, "").trim()}`;
      const PhoneNumberValidated = convertPhoneTovalid(validPhone);
      if (userData?.phoneNumber) {
        const gottenuser = await getUserByPhoneNumber(PhoneNumberValidated);
        dispatch(setUserData(gottenuser));
      } else {
      }
    } catch (error) {
      console.log("error getting the user fo rthe fir", error);
    }
  };
  const convertPhoneTovalid = (phone) => {
    const phoneNumberWithoutPlus = phone?.replace("+", "");

    // Convert the string to a number
    const phoneNumber = Number(phoneNumberWithoutPlus);
    return phoneNumber;
  };

  useEffect(() => {
    getUserInfo();
  }, [dispatch]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1 }}>
        <ArrowBack />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <AppText
              text={"Your Data"}
              style={{ color: Colors.primaryColor, marginBottom: 10 }}
            />
            <AppForm
              enableReinitialize={true}
              initialValues={{ fullName: "", emailAddress: "", location: "" }}
              onSubmit={(data) => handleFormSubmit(data)}
              validationSchema={validationSchema}
            >
              <ErrorMessage error={error} visible={error} />
              <FormField
                autoCorrect={false}
                name="fullName"
                icon={"user"}
                placeholder={userData?.attributes?.name}
              />
              {/* <FormField
                autoCorrect={false}
                name="fullName"
                icon={"user"}
                disabled
                placeholder={userData?.attributes?.phoneNumber}
              /> */}

              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                name="emailAddress"
                textContentType="emailAddress"
                placeholder={userData?.attributes?.email}
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

export default UserInfo;
