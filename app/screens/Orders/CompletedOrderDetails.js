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
  import AppHeader from "../../component/AppHeader";
  import useOrders, { acceptOrder, cancleOrder, changeOrderStatus, finishOrder, requestPayment } from "../../../utils/orders";
  import { useDispatch, useSelector } from "react-redux";
  import { setOrders } from "../../store/features/ordersSlice";
  import LoadingModal from "../../component/Loading";
  import { HOME, OFFERS, ORDERS } from "../../navigation/routes";
  import PriceTextComponent from "../../component/PriceTextComponent";
  import { Image } from "react-native";
  import { ScrollView } from "react-native-virtualized-view";
  import LoadingScreen from "../loading/LoadingScreen";
  import { color } from "@rneui/base";
  import AppModal from "../../component/AppModal";
  import { CommonActions } from "@react-navigation/native";
  
  const { width } = Dimensions.get("screen");
  export default function CompletedOrderDetails({ navigation, route }) {
    const item = route?.params?.item;
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
  
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
          routes: [{ name: HOME}],
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
          routes: [{ name: HOME}],
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
          routes: [{ name: HOME}],
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
      <ScrollView style={styles.scrollContainer}>
        <AppHeader subPage={true} />
        <ScrollView style={styles.container}>
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
                    style={[styles.name, { fontSize: 14, paddingRight: 10 }]}
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
          <View style={styles.itemContainer}>
            <AppText centered={false} text={" السعر"} style={styles.title} />
            <PriceTextComponent
            style={{color:Colors.blackColor,fontSize:14,marginTop:4}}
            price={item?.attributes?.service?.data?.attributes?.name}
            />
          </View>
          <View style={styles.itemContainer}>
            <AppText centered={false} text={" العنوان"} style={styles.title} />
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
              style={styles.price}
            />
          </View>
          }
           {
              item?.attributes?.images?.data  && (
          <View style={styles.descriptionContainer}>
            <AppText centered={false} text={" صور للطلب"} style={styles.title} />
             <Image 
             source={{
              uri:item?.attributes?.images?.data[0]?.attributes?.url}} style={{
               height:120,
               width:200,
               borderRadius:10
             }}/> 
          </View>
           )
            
          }
   
        </ScrollView>
        <LoadingModal visible={isLoading} />
        <AppModal isModalVisible={isModalVisible} 
        message={"تأكيد رفض الطلب"}
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
      fontSize: 17,
      color: Colors.blackColor,
      marginTop: 5,
    },
    title: {
      fontSize: 21,
      color: Colors.primaryColor,
    },
  });
  
  