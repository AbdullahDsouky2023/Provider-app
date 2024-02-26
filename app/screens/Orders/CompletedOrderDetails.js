import {
    Alert,
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
  } from "react-native";
  import React, { useState } from "react";
  import AppButton from "../../component/AppButton";
  import AppText from "../../component/AppText";
  import { Colors } from "../../constant/styles";
  import { RFPercentage } from "react-native-responsive-fontsize";

  import Carousel from "react-native-snap-carousel-v4";
  import useOrders, { acceptOrder, cancleOrder, changeOrderStatus, finishOrder, requestPayment } from "../../../utils/orders";
  import { useDispatch, useSelector } from "react-redux";
  import { setOrders } from "../../store/features/ordersSlice";
  import LoadingModal from "../../component/Loading";
  import { CURRENCY, HOME, OFFERS, ORDERS, RATE_CLIENT_sSCREEN } from "../../navigation/routes";
  import PriceTextComponent from "../../component/PriceTextComponent";
  import { Image } from "react-native";
  import { ScrollView } from "react-native-virtualized-view";
  import LoadingScreen from "../loading/LoadingScreen";
  import { color } from "@rneui/base";
  import AppModal from "../../component/AppModal";
  import { CommonActions } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import ArrowBack from "../../component/ArrowBack";
  
  const { width ,height} = Dimensions.get("screen");
  export default function CompletedOrderDetails({ navigation, route }) {
    const item = route?.params?.item;
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const { t } = useTranslation()
    const {data}=useOrders()
  const dispatch = useDispatch()
  const handleOrderCancle = async (id) => {
    try {
      const res = await cancleOrder(id);
      if (res) {
      dispatch(setOrders(data));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: t(HOME)}],
        })
      )
      Alert.alert("تم بنجاح");
      } else {
        Alert.alert("حدثت مشكله حاول مرة اخري");
      }
    } catch (error) {
      console.log(error, "error deleting the order");
    } finally {
      // setIsLoading(false);
      setModalVisible(false)
    }
  };
  const handleFinishOrder = async (id) => {
    try {
      const res = await changeOrderStatus(id,"finished")
      if (res) {
      dispatch(setOrders(data));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: t(HOME)}],
        })
      )
      Alert.alert("تم بنجاح");
      } else {
        Alert.alert("حدثت مشكله حاول مرة اخري");
      }
    } catch (error) {
      console.log(error, "error finsihed the order");
    } finally {
      setModalVisible(false)
    }
  };
  const handleRequestPayment = async (id) => {
    try {
      const res = await requestPayment(id)
      if (res) {
      dispatch(setOrders(data));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: t(HOME)}],
        })
      )
      Alert.alert("تم بنجاح");
      } else {
        Alert.alert("حدثت مشكله حاول مرة اخري");
      }
    } catch (error) {
      console.log(error, "error finsihed the order");
    } finally {
      setModalVisible(false)
    }
  };
  
    if(isLoading) return <LoadingScreen/>
    return (
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <ArrowBack />
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {item?.attributes?.services.data.length > 0 ? (
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
                      style={[styles.name, { fontSize: RFPercentage(1.8), paddingRight: 10 }]}
                    />
                     
                     <PriceTextComponent
                style={{
                  backgroundColor: Colors.primaryColor,
                  fontSize: RFPercentage(1.5),
                  padding: 6,
                  borderRadius: 40,
                  color: Colors.whiteColor,
                }}
                price={item?.attributes?.Price}
              />
                  </View>
                );
              }}
            />
          </View>
        ) : (item?.attributes?.service_carts?.data?.length > 0) ? 
        <View style={styles.itemContainer}>
        <FlatList
          data={ item?.attributes?.service_carts?.data}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}

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
                  flexWrap:'wrap',
                  maxWidth:width*0.90,
                  gap: 15,
                }}
              >
                <AppText
                  centered={false}
                  text={item?.attributes?.service?.data?.attributes?.name}
                  style={[styles.name, { fontSize:RFPercentage(1.65), paddingRight: 10,paddingTop:10 }]}
                />
                 <View style={styles.CartServiceStylesContainer}>
                 <PriceTextComponent
            style={{
              backgroundColor: Colors.primaryColor,
              fontSize: RFPercentage(1.5),
              padding: 6,
              borderRadius: 40,
              color: Colors.whiteColor,
            }}
            price={item?.attributes?.service?.data?.attributes?.Price}
          />
                 <AppText
            style={{
              backgroundColor: Colors.whiteColor,
              fontSize: RFPercentage(1.8),
              padding: 6,
              borderRadius: 40,
              paddingHorizontal:15,
              color: Colors.primaryColor,
            }}
            text={"x"}
          />
                 <AppText
            style={{
              backgroundColor: Colors.primaryColor,
              fontSize: RFPercentage(1.5),
              padding: 6,
              borderRadius: 40,
              paddingHorizontal:15,
              color: Colors.whiteColor,
            }}
            text={item?.attributes?.qty}
          />
                  </View>
              </View>
            );
          }}
        />
      </View>: (
          <View style={styles.itemContainer}>
            <FlatList
              data={item?.attributes?.packages.data}
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
                console.log('item')
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
                      style={[styles.name, { fontSize:RFPercentage(1.65), paddingRight: 10 }]}
                    />
                     <PriceTextComponent
                style={{
                  backgroundColor: Colors.primaryColor,
                  fontSize: RFPercentage(1.5),
                  padding: 6,
                  borderRadius: 40,
                  color: Colors.whiteColor,
                }}
                price={item?.attributes?.price}
              />
                  </View>
                );
              }}
            />
          </View>
        )}
          <View style={styles.itemContainer}>
            <AppText centered={false} text={" السعر"} style={styles.title} />
            <PriceTextComponent
            style={{color:Colors.blackColor,fontSize:RFPercentage(1.8),marginTop:4}}
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
         
  
          <View style={styles.descriptionContainer}>
            <AppText centered={false} text={" الموعد"} style={styles.title} />
            <AppText
              centered={false}
              text={`${item?.attributes?.date}`}
              style={styles.price}
            />
          </View>
          {
             item?.attributes?.description && 
          <View style={styles.descriptionContainer}>
            <AppText centered={false} text={" ملاحظات"} style={styles.title} />
            <AppText
              centered={false}
              text={
                item?.attributes?.description
                  ? item?.attributes?.description
                  : "لا يوجد"
              }
              style={[styles.price,{minWidth:width*0.8}]}
              />
          </View>
          }
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
                inactiveSlideOpacity={1}
                inactiveSlideScale={1}
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
            title={"Rate"}
            style={{ backgroundColor: Colors.success }}
            onPress={() =>navigation.navigate(RATE_CLIENT_sSCREEN,{orderID:item?.id})}
          />
        )}
        </ScrollView>
        <LoadingModal visible={isLoading} />
        <AppModal isModalVisible={isModalVisible} 
        message={<AppText text={"تأكيد رفض الطلب"}/>}
        setModalVisible={setModalVisible} onPress={()=> handleOrderCancle(item.id)}/>
      </ScrollView>
    );
  }
  const styles = StyleSheet.create({
    scrollContainer:{
      height: "100%",
      backgroundColor: Colors.whiteColor,
  
    },
    container: {
      paddingVertical: 10,
      paddingHorizontal: 18,
      
    },
    name: {
      fontSize: RFPercentage(1.8),
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
      shadowColor: '#000',
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
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    price: {
      fontSize: RFPercentage(1.8),
      color: Colors.blackColor,
      marginTop: 5,
    },
    title: {
      fontSize: RFPercentage(2.3),
      color: Colors.primaryColor,
    },
    location:{
      fontSize: RFPercentage(1.7),
      color: Colors.blackColor,
      marginTop: 5,
      paddingHorizontal:10,
      minWidth:width*0.8,
      // backgroundColor:'red'
    },
    CartServiceStylesContainer:{
      display:'flex',
    flexDirection:'row',
    borderWidth:0.5,
   
    padding:5,
    borderRadius:10,
    // height:100,
    // width:100,
    gap:4,
    backgroundColor:Colors.piege,
    borderColor:Colors.grayColor}
  });
  
  