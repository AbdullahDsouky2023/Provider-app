import { View, Text, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ITEM_DETAILS } from "../navigation/routes";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native-expo-image-cache";
const { width } = Dimensions.get("screen");
export default function SlideItem({ item }) {
  const navigation = useNavigation();
  const uri = item?.attributes?.image?.data?.attributes?.url 
//  const preview = "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/b47b03a1e22e3f1fd884b5252de1e64a06a14126.png?alt=media&token=d636c423-3d94-440f-90c1-57c4de921641";

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ITEM_DETAILS, { item: item?.attributes?.service?.data });
      }}
    >
      <View 
        style={{ width: width, height: 180.0 }}
      >

      <Image
        style={{ width: width, height: 180.0 }}
      {...{uri}}
      resizeMode="cover"
      />
      </View>
    </TouchableOpacity>
  );
}
