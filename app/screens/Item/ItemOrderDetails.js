import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
  Platform,
} from "react-native";
import * as yup from "yup";
import { format } from "date-fns";
import { arDZ } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";

import ArrowBack from "../../component/ArrowBack";
import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";
import AppForm from "../../component/Form/Form";
import ErrorMessage from "../../component/Form/ErrorMessage";
import FormField from "../../component/Form/FormField";

import FormDatePicker from "../../component/Form/FormDatePicker";
import SubmitButton from "../../component/Form/FormSubmitButton";
import FormTimePicker from "../../component/Form/FormTimePicker";
import SuccessModel from "../../component/SuccessModal";
import FormImagePicker from "../../component/Form/FormImagePicker";
import { postOrder } from "../../../utils/orders";
import { ORDER_SUCCESS_SCREEN } from "../../navigation/routes";
import { CommonActions } from "@react-navigation/native";
import { getLocationFromStorage } from "../../../utils/location";
import { clearCurrentOrder, setCurrentOrderProperties } from "../../store/features/ordersSlice";
import PriceTextComponent from "../../component/PriceTextComponent";
import LoadingModal from "../../component/Loading";
import axios from "axios";

const { width } = Dimensions.get("window");

export default function ItemOrderDetails({ route, navigation }) {
  const { item } = route.params;
  const [error, setError] = useState();
  const dispatch = useDispatch()
  const [showSuccess, setShowSuccess] = useState(false);
const [isLoading,setIsLoading]=useState(false)
  const user = useSelector((state) => state?.user?.user);
  const userData = useSelector((state) => state?.user?.userData);
  const currentOrderData = useSelector((state) => state?.orders?.currentOrderData);
  console.log(userData?.location);
  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);
  
      // Wait for the image upload to complete
      await uploadImage(values.image);
  
      // Create valid Date objects
      const date = new Date(values?.Date);
      const time = new Date(values?.Time);
  
      // Format the date and time
      const formattedDate = format(date, "dd MMMM yyyy", {
        locale: arDZ,
      });
      const formattedTime = format(time, "hh:mm a", {
        locale: arDZ,
      });
  
      const formSubmitionData = {
        date: formattedDate?.toString(),
        time: formattedTime?.toString(),
        description: values?.description,
        service: item?.id,
        phoneNumber: user?.phoneNumber,
        user: userData?.id,
      };
  
      dispatch(setCurrentOrderProperties(formSubmitionData));
  
      console.log("***********************");
      console.log("user order will be su", currentOrderData);
      console.log("***********************");
  
      const ITEM_PRICE = Number(item?.attributes?.Price);
      const data = await postOrder(currentOrderData);
  
      if (data) {
        dispatch(clearCurrentOrder());
        console.log("current order DAta", currentOrderData);
  
        if (ITEM_PRICE > 0) {
          navigation.navigate("Payment");
          console.log("navigaion hap");
        } else if (ITEM_PRICE === 0) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: ORDER_SUCCESS_SCREEN }],
            })
          );
        }
      }
    } catch (error) {
      Alert.alert("حدثت مشكله حاول مرة اخري");
      console.error("Error parsing date or time:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const validationSchema = yup.object().shape({
    Date: yup.date().required("من فضلك اختار يوم التنفيذ"),
    Time: yup.string().required("من فضلك اختار وقت التنفيذ"),
    description: yup.string(),
  });
  const uploadImage = async (image, values) => {
    try {
      const formData = new FormData();
      const uri = image; // from any library, you just need the file path
  
      formData.append("files", {
        name: `Nijk_IMAGE_ORDER`,
        type: "image/jpeg",
        uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
      });
  
      const response = await fetch(`http://192.168.1.6:1337/api/upload`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Image upload failed with status: ${response.status}`);
      }
  
      const responseData = await response.json();
      const imageId = responseData[0]?.id;
  
      if (!imageId) {
        throw new Error("Image upload response did not contain an ID");
      }
  
      dispatch(setCurrentOrderProperties({ images: imageId }));
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle the error, you might want to show a user-friendly message
    }
  };
  
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.bodyBackColor,
        position: "relative",
        height: "100%",
      }}
    >
      <StatusBar backgroundColor={Colors.primaryColor} />
      <View style={{ flex: 1, paddingBottom: 100 }}>
        <ArrowBack />
        <AppForm
          enableReinitialize={true}
          initialValues={{ Date: "", Time: "", description: "", image: null }}
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <AppText
                text={item?.attributes?.name}
                style={{
                  color: Colors.primaryColor,
                  marginBottom: 10,
                  fontSize: 15,
                }}
              />
              <ErrorMessage error={error} visible={error} />
              <AppText
                text={"يوم التنفيذ"}
                centered={false}
                style={styles.label}
              />
              <FormDatePicker name="Date" placeholder="Date" />
              <AppText
                text={"وقت التنفيذ"}
                centered={false}
                style={styles.label}
              />
              <FormTimePicker name="Time" placeholder="Time" />
              <AppText
                text={"معلومات  اخري"}
                centered={false}
                style={styles.label}
              />
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                name="description" // Make sure the name matches the field in the form values
                // placeholder="description"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top" // Add this line

                // ... other props
              />
              <AppText
                text={"اختيار صورة"}
                centered={false}
                style={styles.label}
              />
              <FormImagePicker name="image" width={width} />
            </View>
          </ScrollView>
          <View style={styles.orderButtonContainer}>
           <PriceTextComponent price={item?.attributes?.Price} style={{fontSize:19}}/>
            <SubmitButton title={"Book"} style={styles.buttonSubmit} />
          </View>
        </AppForm>

        <LoadingModal visible={isLoading} />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    color: Colors.blackColor,
  },
  orderButtonContainer: {
    height: 100,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.grayColor,
    borderRadius: 20,
    width: width,
    bottom: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  buttonSubmit: {
    width: width * 0.3,
    marginTop: 10,
  },
});