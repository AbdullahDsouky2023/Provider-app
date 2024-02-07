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
import { CommonActions } from "@react-navigation/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import ArrowBack from "../../component/ArrowBack";
import { Colors, mainFont } from "../../constant/styles";
import AppText from "../../component/AppText";
import AppForm from "../../component/Form/Form";
import ErrorMessage from "../../component/Form/ErrorMessage";
import FormField from "../../component/Form/FormField";
import SubmitButton from "../../component/Form/FormSubmitButton";
import { auth } from "../../../firebaseConfig";
import * as Updates from "expo-updates";

import LoadingModal from "../../component/Loading";
import { useDispatch, useSelector } from "react-redux";
import { EXPO_PUBLIC_BASE_URL } from "@env";

import useOrders, { AddOrderComplain, UpdateOrder, delay_order_request, updateOrderData } from "../../../utils/orders";
import { HOME } from "../../navigation/routes";
import FormImagePicker from "../../component/Form/FormImagePicker";
import FormDatePicker from "../../component/Form/FormDatePicker";
import { updateUserData } from "../../../utils/user";
import useNotifications from "../../../utils/notifications";
import AppFormField from "../../component/Form/FormField";
import FormTextInput from "../../component/Form/FormInput";
import { setOrders } from "../../store/features/ordersSlice";
const { width ,height} = Dimensions.get("screen");
const ChangeDateOrderScreen = ({ navigation, route }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch= useDispatch()
  const { item }= route?.params
  const  {data:orders}=useOrders()
  const { sendPushNotification} = useNotifications()
  const userData = useSelector((state) => state?.user?.userData);
  const validationSchema = yup.object().shape({
    date: yup.date().required(t("الرجاء اختيار التاريخ"))
    ,
      reason: yup.string()
      .required(t("This Field is Required!"))
      .min(10, "السبب  المدخله قصير جدا")
      .max(500, "السبب  المدخله طويل جدا"),
    
  });
  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);
      const date = new Date(values?.date || Date.now());
      
      const formattedDate = format(date, "dd MMMM yyyy", {
        locale: ar,
      });
      const res = await delay_order_request({
        date: formattedDate?.toString(),
        reason:values?.reason,
    orders:{
     connect:[{"id":route?.params?.orderId}]
    }
      })
        if(res?.id){
            const res2 = await UpdateOrder(route?.params?.orderId,{
                delay_request:{
                    connect:[{id:res?.id}]
                }
            })
            if(res2 ){
                Alert.alert("تم  تقديم اعادة  جدولة الطلب  بنجاح");
                dispatch(setOrders(orders))
                if( item?.attributes?.user?.data?.attributes
                  ?.expoPushNotificationToken){
                    sendPushNotification(
                      item?.attributes?.user?.data?.attributes
                      ?.expoPushNotificationToken,
                      "تغيير موعد الطلب",
                      `تم طلب تغيير موعد الطلب الي ${formattedDate?.toString()}`
                      );
                    }
                    navigation.goBack();
      
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: t(HOME) }],
                  })
                );
              }
           
            
        }
      
    } catch (err) {
      console.log("error creating the resi", err);
    } finally {
      setIsLoading(false);
    }
  };
  


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <ArrowBack />
      <ScrollView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <AppText
              text={"تغيير موعد الطلب"}
              style={{ color: Colors.primaryColor, marginBottom: 10 }}
            />
            <AppForm
              enableReinitialize={true}
              initialValues={{
                date:"",
                reason:""
              }}
              onSubmit={(data) => handleFormSubmit(data)}
              validationSchema={validationSchema}
            >
              <ErrorMessage error={error} visible={error} />

              <AppText
                text={"أختر التاريخ"}
                centered={false}
                style={{marginBottom:20,marginHorizontal:17,color:Colors.blackColor}}
              />
              <FormDatePicker name="date" placeholder="date" />
              <AppText
                text={"Please enter delay reason"}
                centered={false}
                style={[styles.header, { marginTop: 10 }]}
              />
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                multiline={true}
                numberOfLines={7}
                // keyboardType="email-address"
                name="reason"
                height={height*0.15}
                width={width*0.97}
                placeholder="reason"
                // textContentType="emailAddress"
               
              />
            

              <SubmitButton title="Confirm"  style={{paddingHorizontal:width*0.2,paddingVertical:14}} />
              
            </AppForm>
          </View>
        </ScrollView>
        <LoadingModal visible={isLoading} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: RFPercentage(2.1),
    paddingHorizontal: width * 0.05,
    color: Colors.blackColor,
    // backgroundColor:'red',
    marginBottom: width * 0.001,
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default ChangeDateOrderScreen;
