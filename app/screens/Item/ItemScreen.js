import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import ItemDetails from "../../component/ItemDetails";
import OtherServicesList from "../../component/Home/OtherServicesList";
import ReserveButton from "../../component/ReverveButton";
import UsersReviews from "../../component/Home/UsersReview";
import { ITEM_ORDER_DETAILS, ORDER_SELECT_LOCATION } from "../../navigation/routes";
export default function ItemScreen({ route,navigation }) {


  const { item } = route.params;
  
  const ReserveButtonHandler = ()=>{
    navigation.navigate(ITEM_ORDER_DETAILS)
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <ItemDetails item={item} />
        <OtherServicesList />
        <UsersReviews/>
      </ScrollView>
     <ReserveButton price={item?.attributes?.Price} onPress={()=>navigation.navigate(ORDER_SELECT_LOCATION,{item})}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  
});
