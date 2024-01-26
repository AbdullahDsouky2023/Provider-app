import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import AppButton from "../../component/AppButton";
import AppText from "../../component/AppText";
import { Colors } from "../../constant/styles";
import AppHeader from "../../component/AppHeader";
import { ScrollView } from "react-native-virtualized-view";

import useOrders, {
  acceptOrder,
  cancleOrder,
  changeOrderStatus,
} from "../../../utils/orders";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../../store/features/ordersSlice";
import LoadingModal from "../../component/Loading";
import { HOME, MY_ORDERS, OFFERS, ORDERS } from "../../navigation/routes";
import PriceTextComponent from "../../component/PriceTextComponent";
import { Image } from "react-native";

import LoadingScreen from "../loading/LoadingScreen";
import AppModal from "../../component/AppModal";
import { CommonActions } from "@react-navigation/native";
import useNotifications from "../../../utils/notifications";
import { useTranslation } from "react-i18next";
import ArrowBack from "../../component/ArrowBack";

const { width, height } = Dimensions.get("screen");
export default function ItemScreen({ navigation, route }) {
  const { item } = route?.params;
  const [ModalisLoading, setModalIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const provider = useSelector((state) => state?.user?.userData);
  const orders = useSelector((state) => state?.orders?.orders);
  const { data, isLoading } = useOrders();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sendPushNotification } = useNotifications();
  const createUniqueName = (userId, providerId, orderId) => {
    return `user_${userId}_provider_${providerId}_order_${orderId}`;
  };

  const handleOrderAccept = async (id) => {
    try {
      setModalIsLoading(true);
      const selectedOrder = orders?.data.filter((order) => order?.id === id);
      const userId = selectedOrder[0]?.attributes?.user?.data?.id;
      const userNotificationToken =
        selectedOrder[0]?.attributes?.user?.data?.attributes
          ?.expoPushNotificationToken;
      const channel_id = createUniqueName(userId, provider?.id, id);
      const res = await acceptOrder(id, provider?.id, channel_id);
      if (res) {
        dispatch(setOrders(data));
        sendPushNotification(
          userNotificationToken,
          "قبول طلب",
          `تم قبول طلبك بواسطه ${provider?.attributes?.name}`
        );
        navigation.goBack();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: t(HOME) }],
          })
        );

        // navigation.goBack()
        Alert.alert("تم قبول بنجاح");
      } else {
        Alert.alert("حدثت مشكله حاول مرة اخري");
      }
    } catch (error) {
      console.log(error, "error deleting the order");
    } finally {
      setModalIsLoading(false);
      setModalVisible(false);
    }
  };

  return (
    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      {ModalisLoading ? (
        <View style={styles.container2}>
          <LoadingScreen />
        </View>
      ) : (
        <>
          <ArrowBack subPage={true} />
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
                        style={[
                          styles.name,
                          { fontSize: 14, paddingRight: 10 },
                        ]}
                      />
                      <AppText
                        text={`${item.attributes?.Price} جنيه`}
                        style={{
                          backgroundColor: Colors.primaryColor,
                          fontSize: 14,
                          padding: 6,
                          borderRadius: 40,
                          color: Colors.whiteColor,
                        }}
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
                style={{ color: Colors.blackColor, fontSize: 16, marginTop: 4 }}
                price={item?.attributes?.totalPrice}
              />
            </View>
            <View style={styles.itemContainer}>
              <AppText
                centered={false}
                text={" العنوان"}
                style={styles.title}
              />
              <AppText
                centered={false}
                text={item?.attributes?.location}
                style={styles.price}
              />
            </View>
            <View style={styles.itemContainer}>
              <AppText centered={false} text={" الموعد"} style={styles.title} />
              <AppText
                centered={false}
                text={`${item?.attributes?.date}`}
                style={styles.price}
              />
            </View>
            {item?.attributes?.description && (
              <View style={styles.descriptionContainer}>
                <AppText
                  centered={false}
                  text={" ملاحظات"}
                  style={styles.title}
                />
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
            {item?.attributes?.images?.data && (
              <View style={styles.descriptionContainer}>
                <AppText
                  centered={false}
                  text={" صور للطلب"}
                  style={styles.title}
                />
                <Image
                  source={{
                    uri: item?.attributes?.images?.data[0]?.attributes?.url,
                  }}
                  style={{
                    height: 120,
                    width: 200,
                    borderRadius: 10,
                  }}
                />
              </View>
            )}

            <AppButton
              title={"accept offer"}
              onPress={() => setModalVisible(true)}
            />
          </ScrollView>
          <AppModal
            isModalVisible={isModalVisible}
            message={<AppText text={"تأكيد قبول الطلب"}/>}
            setModalVisible={setModalVisible}
            onPress={() => handleOrderAccept(item.id)}
          />
        </>
      )}
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
  container2: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    display: "flex",
    alignItems: "center",
    height: height,
  },
  name: {
    fontSize: 17,
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
    fontSize: 17,
    color: Colors.blackColor,
    marginTop: 5,
  },
  title: {
    fontSize: 21,
    color: Colors.primaryColor,
  },
});
