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

import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";
import Logo from "../../component/Logo";
import AppForm from "../../component/Form/Form";
import ErrorMessage from "../../component/Form/ErrorMessage";
import FormField from "../../component/Form/FormField";
import SubmitButton from "../../component/Form/FormSubmitButton";
import { auth } from "../../../firebaseConfig";
import { SECRET_PASSWORD} from "@env"
import LoadingModal from "../../component/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setItem } from "../../utils/secureStore";
import { setUserData, userRegisterSuccess } from "../../store/features/userSlice";
import { createUser } from "../../../utils/user";
import { getLocationFromStorage } from "../../../utils/location";
const RegisterScreen = ({ navigation,route}) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const memoizedUser = useMemo(() => user, [user]);

  const { phoneNumber } = route?.params
  const validationSchema = yup.object().shape({
    fullName: yup
      .string()
      .required(t("Full name is required"))
      .min(3, "Full Name is too short")
      .max(50, "Full Name is too long"),
    emailAddress: yup
      .string()
      .email(t("Invalid email address"))
      .required(t("Email is required")),
  });

  const handleFormSubmit = async (values) => {
    try {
      const userLocation = await getLocationFromStorage()
      // const validPhone = auth?.currentUser?.phoneNumber?.replace("+", "")
      setIsLoading(true);
      console.log("this is the use data will be submite",{
        email:values.emailAddress,
        username:values.fullName,
        password:SECRET_PASSWORD,
        location:"lkjkln",
        phoneNumber:phoneNumber
      });
      const res = await createUser({
        email:values.emailAddress,
        username:values.fullName,
        password:"hoohofyufyufdh",
        location:userLocation,
        phoneNumber:phoneNumber
      })

      if(res){
        dispatch(userRegisterSuccess(auth?.currentUser));
        setItem("userData", auth?.currentUser);
        setUserData(res)
        navigation.navigate("App");
      }else {
        Alert.alert("الاسم او البريد الالكتروني مستخدم من قبل ")
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <Logo />
          <View style={{ flex: 1, alignItems: "center" }}>
            <AppText
              text={"Register Your Account"}
              style={{ color: Colors.primaryColor, marginBottom: 10 }}
            />
            <AppForm
          enableReinitialize={true}

initialValues={{ fullName: "", emailAddress: "" }}
              onSubmit={handleFormSubmit}
              validationSchema={validationSchema}
            >
              <ErrorMessage error={error} visible={error} />
              <FormField
                autoCorrect={false}
                icon="account"
                name="fullName"
                placeholder="fullName"
              />
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                name="emailAddress"
                placeholder="emailAddress"
                textContentType="emailAddress"
              />

              <SubmitButton title="Register" />
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

export default RegisterScreen;
