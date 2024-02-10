import { View, Dimensions, TextInput, ScrollView, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
// import { ScrollView } from "react-native-virtualized-view";
import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CommonActions } from "@react-navigation/native";

import * as geolib from "geolib";
const { width, height } = Dimensions.get("screen");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import AppText from "../component/AppText";
import { Colors } from "../constant/styles";
import ArrowBack from "../component/ArrowBack";
import { CURRENCY, HOME } from "../navigation/routes";
import AppButton from "../component/AppButton";
import PaymentBottomSheetAddPrice from "./payment/PaymentBottomSheetAddPrice";
import ModalComponent from "../component/Modal";
import AppModal from "../component/AppModal";
import { CreateAdditionalPrice } from "../../utils/AddionalOrderPrice";
import { UpdateOrder } from "../../utils/orders";
import useNotifications from "../../utils/notifications";
import LoadingModal from "../component/Loading";
import LoadingScreen from "./loading/LoadingScreen";
// import AppText from '../../'
export default function AddAddionalPriceScreen({route,navigation}) {
  const [AddedAmount, setAddedAmount] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const refRBSheet = useRef();
  const { sendPushNotification } = useNotifications();
    const [loading,setLoading]=useState(false)
  const [additionalAmounts, setAdditionalAmounts] = useState([]);
  const [additionalAmount, setAdditionalAmount] = useState(null);
  const [AdditionalAmountIDs,setAddionalAmountIds]=useState([]);
  const { t }= useTranslation()
  const [additionalAmountDescription, setAdditionalAmountDescription] =
    useState("");
    const orders = useSelector((state) => state?.orders?.orders);
    const provider = useSelector((state) => state?.user?.userData);
  const handleAmountChange = (text) => {
    const parsedAmount = Number(text);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      setAddedAmount(parsedAmount);
    } else {
      setAddedAmount(null); // Clear invalid input
    }
  };
  const handleAddAdditionalPrice = (text) => {
    const parsedAmount = Number(text);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      setAdditionalAmount(parsedAmount);
    } else {
      setAdditionalAmount(null); // Clear invalid input
    }
  };
  const handleAddAdditionalAmount = (amount, description) => {
    setAdditionalAmounts((prevAmounts) => [
      ...prevAmounts,
      { amount: additionalAmount, description: additionalAmountDescription },
    ]);
    setAdditionalAmount(null);
    setAdditionalAmountDescription("");
    refRBSheet.current.close()
  };
  const getAdditionalPriceSum = () => {
    const amounts = additionalAmounts?.map((item) => item?.amount);
    const sum = amounts.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0); //
    return Number(sum) 
  };
 const handleConfirmAddPrice = async()=>{
    try {
        setShowModal(false)
        setLoading(true)

        let addionalAmmountIds ;
        if(additionalAmounts){

             addionalAmmountIds = await Promise.all(additionalAmounts?.map(async(item)=>await CreateAdditionalPriceAndGetId(item)))
            console.log("the adional aomound ids ",addionalAmmountIds)
        }
      const res = await  UpdateOrder(route?.params?.orderID,{
        totalPrice:getAdditionalPriceSum() + route?.params?.totalPrice,
        provider_fee:AddedAmount,
        PaymentStatus:'pending',
        additional_prices:{
            connect: addionalAmmountIds?.length > 0 ? addionalAmmountIds:[],

        },
        status: "payment_required",
        provider_payment_status:"payment_required",
        addtional_prices_state:'pending'

       })
       console.log("the comming repsons ",route?.params?.orderID)
       const selectedOrder = orders?.data.filter((order) => order?.id === route?.params?.orderID);
      const userNotificationToken =
        selectedOrder[0]?.attributes?.user?.data?.attributes
          ?.expoPushNotificationToken;
      if (res) {
        sendPushNotification(
          userNotificationToken,
          ` قام ${provider?.attributes?.name}  بانهاء العمل علي الطلب و طلب الدفع`
        );
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: t(HOME)  }],
          })
        );
        navigation.goBack()
        Alert.alert("تم بنجاح");
      } else {
        Alert.alert("حدثت مشكله حاول مرة اخري");
      }
    } catch (error) {
        console.log("error creaing addional orce",error)
    }finally{
        setLoading(false)
        setAddionalAmountIds([])

    }
}
 const CreateAdditionalPriceAndGetId = async(item)=>{
    try {
        const response = await CreateAdditionalPrice({
            Price:Number(item.amount),
            details:item?.description,
        })
        setAddionalAmountIds((prevAmounts) => [
            ...prevAmounts,
         { id: response?.data?.id}
          ])
          return    response?.data?.id
    } catch (error) {
        console.log("error creaing addional orce",error)
    }
 }
 if(loading) return <LoadingScreen/>
  return (
    <>
      <ScrollView
      showsVerticalScrollIndicator={false}
        keyboardDismissMode="ondrag"
        style={{
          height: height * 1,
          backgroundColor: Colors.whiteColor,
        }}
      >
        <ArrowBack />
        <View style={styles.container2}>
          {/* <View style={styles.amountContainer}>
            <AppText
              text={"Price"}
              centered={false}
              style={styles.amountText}
            />
            <TextInput
              keyboardType="numeric"
              selectionColor={Colors.blueColor}
              value={AddedAmount?.toString()}
              onChangeText={(text) => handleAmountChange(text)}
              style={styles.input}
            />
            <AppText
              text={`${CURRENCY}`}
              centered={false}
              style={styles.amountText}
            />
          </View> */}
          <View>
            <AppText
              text={"Add Additional Price"}
              centered={false}
              style={styles.amountText}
            />
            <PaymentBottomSheetAddPrice refRBSheet={refRBSheet}>
              <View style={styles.amountContainer}>
                <AppText
                  text={"Enter Amount"}
                  centered={false}
                  style={styles.amountText}
                />
                <TextInput
                  keyboardType="numeric"
                  selectionColor={Colors.blueColor}
                  value={additionalAmount?.toString()}
                  onChangeText={(text) => handleAddAdditionalPrice(text)}
                  style={styles.input}
                />
              </View>
              <View style={styles.descriptionContainer2}>
                <AppText
                  text={"Amount Details"}
                  centered={false}
                  style={styles.amountText}
                />
                <TextInput
                  // keyboardType="numeric"
                  textAlignVertical="top"
                  selectionColor={Colors.blueColor}
                  value={additionalAmountDescription}
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(text) => setAdditionalAmountDescription(text)}
                  style={styles.TextinputStyle}
                />
              </View>

              <AppButton
                disabled={
                  additionalAmount === null ||
                  additionalAmountDescription === ""
                    ? true
                    : false
                }
                
                title={"Confirm"}
                onPress={handleAddAdditionalAmount}
              />
            </PaymentBottomSheetAddPrice>
            <View style={styles.AdditionalAmmountsContainer}>
              {additionalAmounts?.map((amount,index) => (
                <View key={index} style={styles.container3}>
                  <View style={styles?.additionalAmountContainer}>
                    <AppText
                      text={"Amount"}
                      style={styles.price}
                      centered={false}
                    />
                    <AppText
                      text={`${amount.amount } ${CURRENCY}`}
                      centered={false}
                      style={{ color: Colors.blackColor }}
                    />
                  </View>
                  <View style={styles?.additionalAmountContainer}>
                    <AppText
                      text={"Description"}
                      style={styles.price}
                      centered={false}
                    />

                    <AppText
                      text={amount.description}
                      style={{
                        color: Colors.blackColor,
                        maxWidth: width * 0.5,
                        fontSize: 13,
                        marginTop: 5,
                      }}
                      centered={false}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <AppModal
        message={<AppText text={`السعر الكلي : ${getAdditionalPriceSum().toString()} ${CURRENCY}`}/>}
        setModalVisible={setShowModal}
        isModalVisible={showModal}
        onPress={handleConfirmAddPrice}
      />
      {additionalAmounts?.length  > 0 && (
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AppButton
            title={"Continue"}
            style={{ paddingHorizontal: 50 }}
            // textStyle={{fontSize:100}}

            onPress={() => setShowModal(true)}
          />
        </View>
      )}
      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: Colors.whiteColor,
  },
  header: {
    textAlign: "center",
  },
  name: {
    fontSize: 17,
    color: Colors.blackColor,
  },
  amountContainer: {
    paddingTop: 18,
    display: "flex",
    backgroundColor: "red",
    marginHorizontal: 30,
    alignItems: "center",
    // justifyContent:'center',
    flexDirection: "row",
    gap: 10,
  },
  AdditionalAmmountsContainer: {
    paddingTop: 18,
    display: "flex",
    flexDirection: "column",
    marginHorizontal: 30,
    marginVertical: 30,
    alignItems: "center",
    // justifyContent:'center',
    gap: 10,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "auto",
    width: width * 0.95,
    padding: 10,
    // borderWidth: 0.7,
    borderRadius: 10,
    marginHorizontal: 8,
    backgroundColor: Colors.whiteColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 4,
    gap: 10,
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "auto",
    width: width * 0.9,
    padding: 10,
    // borderWidth: 0.7,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: Colors.whiteColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 4,
    gap: 10,
  },
  descriptionContainer2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "auto",
    width: width * 0.99,
    padding: 10,
    // paddingHorizontal:20,
    // borderWidth: 0.7,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: Colors.whiteColor,

    gap: 10,
  },
  price: {
    fontSize: 17,
    color: Colors.primaryColor,
    marginTop: 5,
    fontWeight: 700,
  },
  title: {
    fontSize: 21,
    color: Colors.primaryColor,
  },
  itemContainer2: {
    display: "flex",
    flex: 2,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  increaseButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 40,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    borderRadius: 5.0,
    marginTop: 4.0,
    borderRadius: 40,
    backgroundColor: Colors.primaryColor,
  },
  buttonText: {
    color: Colors.whiteColor,
  },
  amountText: {
    paddingHorizontal: 10,
    color: Colors.blackColor,
    // paddingTop:10
  },
  input: {
    color: Colors.blueColor,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 35,
    paddingVertical: 5,
    marginTop: -1,
    fontSize: 18,
    width: "auto",
    borderColor: Colors.blueColor,
  },
  TextinputStyle: {
    color: Colors.blackColor,
    borderWidth: 1,
    width: width * 0.9,
    paddingHorizontal: 10,
    marginTop: 1,
    paddingVertical: 10,
    fontSize: 18,
    borderColor: Colors.blueColor,
    borderRadius: 10,
    marginHorizontal: 20,
    alignSelf: "center",
    display: "flex",
  },
  amountContainer: {
    paddingTop: 18,
    display: "flex",
    alignItems: "center",
    // justifyContent:'center',
    flexDirection: "row",
    gap: 10,
  },
  container2: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  container3: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    borderWidth: 1,
    width: width * 0.9,
    borderColor:Colors.blackColor,
    // elevation: 4,  
      borderRadius: 10,
    padding: 10,
  },
  additionalAmountContainer: {
    display: "flex",
    paddingHorizontal: 10,
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
});
