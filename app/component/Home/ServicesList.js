import React from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";

import ServiceCard from "./ServiceCard";
import HeaderTextComponent from "./HeaderTextComponent";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { BROWSE_ORDERS, OFFERS } from "../../navigation/routes";
import useCategories from "../../../utils/categories";
import LoadingScreen from "../../screens/loading/LoadingScreen";
const  { width } = Dimensions.get('screen')

export default function ServicesList() {
  // const categories = useSelector((state) => state?.categories?.categories);
  const navigation = useNavigation();
  const {data:categories,isLoading} = useCategories()
  const user = useSelector((state)=>state?.user?.userData?.attributes?.categories?.data)
  const selectedCategries = user.map((category)=>{
    return categories?.data?.filter((item)=>item?.id == category?.id)[0]
  })
  console.log("the usre current state is :",)
  const handleServiceCardPress = (item) => {
    navigation.navigate(BROWSE_ORDERS, { name: item?.attributes?.name });

  };

  
  if(isLoading) return <LoadingScreen/>
  return (
    <HeaderTextComponent name={"Services"} showAll={false}>
      <FlatList
        data={selectedCategries}
        style={styles.listContainer}
        renderItem={({ item }) => {
          return (
            <ServiceCard
              onPress={() => handleServiceCardPress(item)}
              name={item?.attributes?.name}
              image={item?.attributes?.image?.data[0]?.attributes.url}
            />
          );
        }}
        keyExtractor={(item, index) => item.id}
      />
    </HeaderTextComponent>
  );
}
const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    padding: 16,
    width:width
  },
});
