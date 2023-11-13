import {
  Alert,
  Dimensions,
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
import useOrders, { acceptOrder, cancleOrder } from "../../../utils/orders";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../../store/features/ordersSlice";
import LoadingModal from "../../component/Loading";
import { ORDERS } from "../../navigation/routes";
import PriceTextComponent from "../../component/PriceTextComponent";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import LoadingScreen from "../loading/LoadingScreen";

const { width } = Dimensions.get("screen");
export default function ItemScreen({ navigation, route }) {
  const { item } = route?.params;
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state)=>state?.user?.userData)  
 
const dispatch = useDispatch()
const handleOrderCancle = async (id) => {
  try {
    setIsLoading(true);
    const res = await acceptOrder(id,user?.id);
    if (res) {
    //   // Update Redux store to remove the cancelled order
    //   dispatch(setOrders(orders.filter(order => order.id !== id)));
      Alert.alert("تم قبول بنجاح");
      navigation.goBack();
    } else {
      Alert.alert("حدثت مشكله حاول مرة اخري");
    }
  } catch (error) {
    console.log(error, "error deleting the order");
  } finally {
    setIsLoading(false);
  }
};

  if(isLoading) return <LoadingScreen/>
  return (
    <ScrollView style={styles.scrollContainer}>
      <AppHeader subPage={true} />
      <ScrollView style={styles.container}>
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
          <AppText centered={false} text={" المنطقه"} style={styles.title} />
          <AppText
            centered={false}
            text={item?.attributes?.region?.data?.attributes?.name}
            style={styles.price}
          />
        </View>

        <View style={styles.itemContainer}>
          <AppText centered={false} text={" الموعد"} style={styles.title} />
          <AppText
            centered={false}
            text={`${item?.attributes?.date} - ${item?.attributes?.time}`}
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
  
        <AppButton
          title={"accept offer"}
          onPress={() => handleOrderCancle(item.id)}
        />
      </ScrollView>
      <LoadingModal visible={isLoading} />
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
