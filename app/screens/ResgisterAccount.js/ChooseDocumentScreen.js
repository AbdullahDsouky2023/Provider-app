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
import AppText from "../../component/AppText";
import Logo from "../../component/Logo";
import AppForm from "../../component/Form/Form";
import ErrorMessage from "../../component/Form/ErrorMessage";
import FormField from "../../component/Form/FormField";
import SubmitButton from "../../component/Form/FormSubmitButton";
import { auth } from "../../../firebaseConfig";
import { EXPO_PUBLIC_SECRET_PASSWORD,EXPO_PUBLIC_BASE_URL } from "@env";
import LoadingModal from "../../component/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setItem } from "../../utils/secureStore";
import {
  setUserData,
  userRegisterSuccess,
} from "../../store/features/userSlice";
import { createUser } from "../../../utils/user";
import { MaterialIcons } from "@expo/vector-icons";

import { getLocationFromStorage } from "../../../utils/location";
import AppButton from "../../component/AppButton";
import ArrowBack from "../../component/ArrowBack";
import CitiesDropDownComponent from "./CitiesDropDownComponent";
import FormImagePicker from "../../component/Form/FormImagePicker";
import { min } from "date-fns";
import { setCurrentRegisterProperties } from "../../store/features/registerSlice";
import { ADDITION_INFO, ORDER_SUCCESS_SCREEN } from "../../navigation/routes";
const { width, height } = Dimensions.get("screen");
const ChooseDocumentScreen = ({ navigation, route }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [city, setCity] = useState(null);
  const currentRegisterData = useSelector((state) => state?.register.currentRegisterDate);
   console.log(currentRegisterData)
  // const { phoneNumber } = route?.params
  const validationSchema = yup.object().shape({
    Personal_image: yup
      .array().min(1,(t("This Field is Required!"))).required(t("This Field is Required!")),
    Personal_card: yup
      .array()
      .min(1,(t("This Field is Required!")))
      .required(t("This Field is Required!")),
    Commercial_record: yup
      .array()
      .min(1,(t("This Field is Required!")))
      .required(t("This Field is Required!")),
      // Optionally, you can also specify the sh,ape of the array items
    professional_licence: yup
      .array()
      .min(1,(t("This Field is Required!")))
      .required(t("This Field is Required!"))
  });
  
  
  const handleFormSubmit = async (values) => {
    try {
      const userLocation = await getLocationFromStorage();

      // const validPhone = auth?.currentUser?.phoneNumber?.replace("+", "")
      setIsLoading(true);
      // const res = await createUser({
      //   email:values.emailAddress,
      //   name:values.fullName,
      //   // phoneNumber:phoneNumber
      // })
      console.log("values", values.Commercial_record[0],"");
     await  uploadImage(values.Commercial_record,values,"Commercial_record")
     await  uploadImage(values.Personal_card,values,"Personal_card")
     await  uploadImage(values.Personal_image,values,"Personal_image")
     await  uploadImage(values.professional_licence,values,"professional_licence")
     navigation.navigate(ADDITION_INFO)
// dispatch(setCurrentRegisterProperties(values))
// navigation.dispatch(
//       CommonActions.reset({
//         index: 0,
//         routes: [{ name: ORDER_SUCCESS_SCREEN}],
//       })
//     );
      // if (res) {
      //   dispatch(userRegisterSuccess(auth?.currentUser));
      //   setItem("userData", auth?.currentUser);
      //   setUserData(res);
      //   navigation.dispatch(
      //     CommonActions.reset({
      //       index: 0,
      //       routes: [{ name: "App" }],
      //     })
      //   );
      // } else {
      //   Alert.alert("الاسم او البريد الالكتروني مستخدم من قبل ");
      //   console.log(
      //     "the is the message befoe email and name is used befoer res",
      //     res
      //   );
      // }
    } catch (err) {
      console.log("error creating the resi", err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const uploadImage = async (image, values,ImageName) => {
    try {
      const imageIds = [];
      console.log("the items is ",image)
      console.log("the images array ",image)
    for (const imageUri of image) {
      const formData = new FormData();
      formData.append("files", {
        name: `Nijk_IMAGE_ORDER`,
        type: "image/jpeg",
        uri: Platform.OS === "ios" ? imageUri.replace("file://", "") : imageUri,
      });

      try {
        const response = await fetch(`${EXPO_PUBLIC_BASE_URL}/api/upload`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Image upload failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        const imageId = responseData[0]?.id;
        imageIds.push(imageId);
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle error gracefully
      }
    }
    console.log("the image ids are ",imageIds)
    dispatch(setCurrentRegisterProperties({ [ImageName]: imageIds }));

    // ... continue with form submission ...
  } catch (error) {
    // ... error handling ...
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
          progress={0.75}
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
                Personal_image:[],
                Personal_card:[],
                Commercial_record:[],
                professional_licence:[]
                
              }}
              onSubmit={handleFormSubmit}
              validationSchema={validationSchema}
            >
              <ErrorMessage error={error} visible={error} />
              <HeaderComponent header={"PersonalCard"} />
              <FormImagePicker name="Personal_card" width={width} />

              <HeaderComponent header={"PersonalImage"} />
              <FormImagePicker name="Personal_image" width={width} />
              <HeaderComponent header={"CommercialRecord"} />
              <FormImagePicker name="Commercial_record" width={width} />
              <HeaderComponent header={"JobLicence"} />
              <FormImagePicker name="professional_licence" width={width} />

             
                <SubmitButton
                  title="Confirm"
                  style={{ paddingHorizontal: 60, marginTop: 40 }}
                />
              
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

export default ChooseDocumentScreen;

const HeaderComponent = ({ header }) => (
  <View style={styles.headerContainer}>
    <AppText text={"*"} centered={false} style={styles.Star} />
    <AppText text={header} centered={false} style={styles.header} />
  </View>
);
