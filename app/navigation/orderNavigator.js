import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";


import { ITEM_DETAILS, ITEM_ORDER_DETAILS } from "./routes";
import ItemScreen from "../screens/Item/ItemScreen";
import ItemOrderDetails from "../screens/Item/ItemOrderDetails";


const OrderNavigator = ({route}) => {
    const Stack = createSharedElementStackNavigator();
    const { item } = route.params
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,

          ...TransitionPresets.SlideFromRightIOS,
          
        }}
        
      >
        <Stack.Screen
          name={ITEM_DETAILS}
          component={ItemScreen}
          initialParams={{ item }} // Pass the item object to ItemOrderDetails

          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ITEM_ORDER_DETAILS}
          component={ItemOrderDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
};

export default OrderNavigator;
