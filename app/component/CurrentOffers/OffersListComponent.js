import { View, Text, FlatList, Dimensions } from "react-native";
import React from "react";
import { Colors } from "../../constant/styles";
import OfferCard from "../OfferCard";
import AppText from "../AppText";
import { useNavigation } from "@react-navigation/native";
import { ITEM_DETAILS } from "../../navigation/routes";
const { width } = Dimensions.get("screen");
export default function OffersServiceComponentList({ data, slectedItem }) {
  const navigation = useNavigation();
  const name = data[0]?.attributes?.category?.data?.attributes?.name;

  if (data.length === 0) return;

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: 10,
        marginBottom: 10,
        width: width,
      }}
    >
      <View style={{ marginBottom: 10 }}>
        <AppText
          text={name}
          centered={false}
          style={{ fontSize: 22, color: Colors.blackColor }}
        />
      </View>
      <FlatList
        data={data}
        scrollEnabled={false}
        renderItem={({ item }) => {
          return (
            <OfferCard
              service={item?.attributes?.name}
              price={item?.attributes?.Price}
              onPress={() => navigation.navigate(ITEM_DETAILS, { item })}
              image={item?.attributes?.image?.data?.attributes?.url}
            />
          );
        }}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={<View style={{ height: 10 }} />}
      />
    </View>
  );
}
