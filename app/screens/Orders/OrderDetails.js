import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import AppButton from "../../component/AppButton";
import AppText from "../../component/AppText";
import { Colors } from "../../constant/styles";
import Carousel from "react-native-snap-carousel-v4";
import useOrders, {
  acceptOrder,
  cancleOrder,
  changeOrderStatus,
  finishOrder,
  requestPayment,
} from "../../../utils/orders";

import { Entypo } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../../store/features/ordersSlice";
import LoadingModal from "../../component/Loading";
import { CHAT_ROOM, CURRENCY, HOME, OFFERS, ORDERS, PAY_AFTER_SERVICES_SCREEN, RATE_CLIENT_sSCREEN } from "../../navigation/routes";
import PriceTextComponent from "../../component/PriceTextComponent";
import { Image } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import LoadingScreen from "../loading/LoadingScreen";
import { color } from "@rneui/base";
import AppModal from "../../component/AppModal";
import { CommonActions } from "@react-navigation/native";
import useNotifications from "../../../utils/notifications";
import { useTranslation } from "react-i18next";
import ArrowBack from "../../component/ArrowBack";

const { width, height } = Dimensions.get("screen");
export default function OrderDetails({ navigation, route }) {
  const { item } = route?.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation()
  const { data } = useOrders();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state?.orders?.orders);
  const provider = useSelector((state) => state?.user?.userData);
  const { sendPushNotification } = useNotifications();
  const handleOrderCancle = async (id) => {
    try {
      setIsLoading(true);
      const selectedOrder = orders?.data.filter((order) => order?.id === id);
      console.log(id, selectedOrder[0]?.attributes);
      const userNotificationToken =
        selectedOrder[0]?.attributes?.user?.data?.attributes
          ?.expoPushNotificationToken;
      if (
        selectedOrder[0]?.attributes?.PaymentStatus !== "Payed" &&
        selectedOrder[0]?.attributes?.status !== "finish_work"
      ) {
        const res = await cancleOrder(id);

        if (res) {
          dispatch(setOrders(data));
          console.log(`the user token `, selectedOrder[0].attributes?.user);
          sendPushNotification(
            userNotificationToken,
            ` قام ${provider?.attributes?.name} بالغاء الطلب`
          );
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: t(HOME) }],
            })
          );
          Alert.alert("تم بنجاح");
        } else {
          Alert.alert("حدثت مشكله حاول مرة اخري");
        }
      }
    } catch (error) {
      console.log(error, "error deleting the order");
    } finally {
      setIsLoading(false);
      setModalVisible(false);
    }
  };
  const handleFinishOrder = async (id) => {
    try {
      const res = await changeOrderStatus(id, "finish_work");
      const selectedOrder = orders?.data.filter((order) => order?.id === id);
      const userNotificationToken =
        selectedOrder[0]?.attributes?.user?.data?.attributes
          ?.expoPushNotificationToken;
      if (res) {
        dispatch(setOrders(data));
        sendPushNotification(
          userNotificationToken,
          ` قام ${provider?.attributes?.name} بانهاء العمل علي الطلب`
        );
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: t(HOME) }],
          })
        );
        Alert.alert("تم بنجاح");
      } else {
        Alert.alert("حدثت مشكله حاول مرة اخري");
      }
    } catch (error) {
      console.log(error, "error finsihed the order");
    } finally {
      setModalVisible(false);
    }
  };
  const handleOrderAccept = async (id) => {
    try {
      const res = await changeOrderStatus(id, "accepted");
      const selectedOrder = orders?.data.filter((order) => order?.id === id);
      const userNotificationToken =
        selectedOrder[0]?.attributes?.user?.data?.attributes
          ?.expoPushNotificationToken;
      if (res) {
        dispatch(setOrders(data));
        sendPushNotification(
          userNotificationToken,
          ` قام ${provider?.attributes?.name} بقبول العمل علي الطلب`
        );
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: t(HOME) }],
          })
        );
        Alert.alert("تم بنجاح");
      } else {
        Alert.alert("حدثت مشكله حاول مرة اخري");
      }
    } catch (error) {
      console.log(error, "error finsihed the order");
    } finally {
      setModalVisible(false);
    }
  };
  const handleStartWorking = async (id) => {
    try {
      const res = await changeOrderStatus(id, "working");
      const selectedOrder = orders?.data.filter((order) => order?.id === id);
      const userNotificationToken =
        selectedOrder[0]?.attributes?.user?.data?.attributes
          ?.expoPushNotificationToken;
      if (res) {
        dispatch(setOrders(data));
        sendPushNotification(
          userNotificationToken,
          ` قام ${provider?.attributes?.name} ببدء العمل علي الطلب`
        );
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: t(HOME) }],
          })
        );
        Alert.alert("تم بنجاح");
      } else {
        Alert.alert("حدثت مشكله حاول مرة اخري");
      }
    } catch (error) {
      console.log(error, "error finsihed the order");
    } finally {
      setModalVisible(false);
    }
  };
  const handleRequestPayment = async (id) => {
    try {
      setIsLoading(true);

      const res = await requestPayment(id);
      if (res) {
        dispatch(setOrders(data));
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: t(HOME) }],
          })
        );
        Alert.alert("تم بنجاح");
      } else {
        Alert.alert("حدثت مشكله حاول مرة اخري");
      }
    } catch (error) {
      console.log(error, "error finsihed the order");
    } finally {
      setModalVisible(false);
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingScreen />;
  return (
    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <ArrowBack />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.itemContainer}>
          <FlatList
            data={item?.attributes?.services.data}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item.id}
            style={{
              display: "flex",
              flexDirection: "row",
              direction: "rtl",
              flexWrap: "wrap",
              marginTop: 15,
              gap: 15,
              width: width,
            }}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 15,
                  }}
                >
                  <AppText
                    centered={false}
                    text={item.attributes?.name}
                    style={[styles.name, { fontSize: RFPercentage(1.7), paddingRight: 10 }]}
                  />
                    
                    <PriceTextComponent
                style={{
                  backgroundColor: Colors.primaryColor,
                  fontSize: RFPercentage(1.5),
                  padding: 6,
                  borderRadius: 40,
                  color: Colors.whiteColor,
                }}
                price={item?.attributes?.totalPrice}
              />
                </View>
              );
            }}
          />
        </View>
        <View>
          <AppText
            centered={false}
            text={item?.attributes?.service?.data?.attributes?.name}
            style={styles.name}
          />
        </View>
        <View style={styles.itemContainer}>
          <AppText centered={false} text={" السعر"} style={styles.title} />
          <PriceTextComponent
            style={{ color: Colors.blackColor, fontSize:  RFPercentage(2), marginTop: 4 }}
            price={item?.attributes?.totalPrice}
          />
        </View>
        <View style={styles.descriptionContainer}>
          <AppText centered={false} text={" العنوان"} style={styles.title} />
          <AppText
            centered={false}
            text={item?.attributes?.location}
            style={styles.location}
          />
        </View>
        {/* <View style={styles.itemContainer}>
          <AppText centered={false} text={" المنطقه"} style={styles.title} />
          <AppText
            centered={false}
            text={item?.attributes?.region?.data?.attributes?.name}
            style={styles.price}
          />
        </View> */}

        <View style={styles.descriptionContainer}>
          <AppText centered={false} text={" الموعد"} style={styles.title} />
          <AppText
            centered={false}
            text={`${item?.attributes?.date}`}
            style={styles.price}
          />
        </View>

        {item?.attributes?.description && (
          <View style={styles.descriptionContainer}>
            <AppText centered={false} text={" ملاحظات"} style={styles.title} />
            <AppText
              centered={false}
              text={
                item?.attributes?.description
                  ? item?.attributes?.description
                  : "لا يوجد"
              }
              style={styles.price}
            />
          </View>
        )}
         {item?.attributes?.images?.data ? (
          <View style={styles.descriptionContainer}>
            <>
              <AppText centered={false} text={"Images"} style={styles.title} />
              <Carousel
                data={item?.attributes?.images?.data}
                sliderWidth={width}
                slideStyle={{
                  backgroundColor: "transparent",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                autoplay={true}
                loop={true}
                autoplayInterval={10000}
                itemWidth={width}
                renderItem={({ item }) => {
                  return (
                    <Image
                      //  resizeMethod="contain"
                      source={{
                        uri: item?.attributes?.url,
                      }}
                      style={{
                        height: height * 0.2,
                        width: width * 0.6,
                        objectFit: "contain",
                        borderRadius: 10,
                      }}
                    />
                  );
                }}
              />
            </>
          </View>
        ) : null}
        {(item?.attributes?.provider_payment_status === "payed" && item?.attributes?.providerOrderRating === null ) && (
          <AppButton
            title={"Rate and Finish Work"}
            style={{ backgroundColor: Colors.success }}
            onPress={() =>navigation.navigate(RATE_CLIENT_sSCREEN,{orderID:item?.id})}
          />
        )}
        {item?.attributes?.status === "finish_work"  && item?.attributes?.provider_payment_status === "pending" ? (
          <AppButton
            title={"Request Payment"}
            style={{ backgroundColor: Colors.success }}
            onPress={() => item?.attributes?.totalPrice > 0 ? handleRequestPayment(item?.id):navigation.navigate(PAY_AFTER_SERVICES_SCREEN,{orderID:item?.id})}
          />
        ) : item?.attributes?.status === "accepted" ? (
          <View>
            <AppButton
              title={"Start Work"}
              style={{ backgroundColor: Colors.success }}
              onPress={() => handleStartWorking(item.id)}
            />
          </View>
        ) : item?.attributes?.status === "working" ? 
          (
            <View>
            <AppButton
              title={"finish work"}
              style={{ backgroundColor: Colors.success }}
              onPress={() => handleFinishOrder(item.id)}
            />

           
          </View>
          ) :item?.attributes?.status === "assigned" ?(
          <View>
            <AppButton
              title={"Accept Order"}
              style={{ backgroundColor: Colors.success }}
              onPress={() => handleOrderAccept(item.id)}
            />
            <AppButton
              title={"Reject Order"}
              style={{ backgroundColor: Colors.redColor }}
              onPress={() => handleOrderCancle(item.id)}
            />

           
          </View>)
          :null
        }
      </ScrollView>
     {
      isLoading && <LoadingScreen/>
     }
      <AppModal
        isModalVisible={isModalVisible}
        message={<AppText text={"تأكيد رفض الطلب"}/>}
        setModalVisible={setModalVisible}
        onPress={() => handleOrderCancle(item.id)}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    height: "100%",
    backgroundColor: Colors.whiteColor,
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  name: {
    fontSize: RFPercentage(1.7),
    color: Colors.blackColor,
  },
  itemContainer: {
    display: "flex",
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.9,
    padding: 10,
    // borderWidth: 0.7,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: Colors.whiteColor,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 3,
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
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  price: {
    fontSize: RFPercentage(1.83),
    color: Colors.blackColor,
    marginTop: 5,
    width:width*1,
    // backgroundColor:'red'
  },
  location:{
    fontSize: RFPercentage(1.7),
    color: Colors.blackColor,
    marginTop: 5,
    paddingHorizontal:10,
    minWidth:width*0.8,
    // backgroundColor:'red'
  },
  title: {
    fontSize: RFPercentage(2.3),
    color: Colors.primaryColor,
  },
  chatContainer: {
    paddingHorizontal: 19,
    backgroundColor: Colors.primaryColor,
    width: 60,
    height: 40,
    borderRadius: 20,
    marginHorizontal: width * 0.8,
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
