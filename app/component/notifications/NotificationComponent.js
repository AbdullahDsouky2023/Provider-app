import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { Sizes } from '../../constant/styles';
import { useNavigation } from "@react-navigation/native";
import { NOTIFICATION_SCREEN } from '../../navigation/routes';

export default function NotificationComponent() {
    const navigation = useNavigation()
  return (
    <TouchableWithoutFeedback>
    <Ionicons
            name="notifications-outline"
            size={27}
            color="black"
            style={{
                marginHorizontal: Sizes.fixPadding * 2.0,
                marginVertical: Sizes.fixPadding * 2.0,
            }}
            onPress={() => navigation.navigate( NOTIFICATION_SCREEN)}
        />
    </TouchableWithoutFeedback>
  )
}