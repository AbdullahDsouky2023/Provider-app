
import React from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { Sizes } from "../constant/styles";
import { useNavigation } from "@react-navigation/native";

export default function ArrowBack() {
    const navigation = useNavigation()
    return (
        <MaterialIcons
            name="arrow-back"
            size={27}
            color="black"
            style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginVertical: Sizes.fixPadding * 2.0,
            }}
            onPress={() =>{
                
                if (navigation.canGoBack()) {
                    navigation.goBack();
                  }
            }}
        />
    )
}