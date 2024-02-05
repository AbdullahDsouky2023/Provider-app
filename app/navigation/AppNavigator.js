import { TransitionPresets } from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import BottomTabBar from "../component/bottomTabBarScreen";
import OrdersListner from "../component/OrdersListner";

export default function AppNavigator() {
  const Stack = createStackNavigator();
  return (
    <>
    {/* <OrdersListner/> */}
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="BottomTabBar"
        component={BottomTabBar}
        options={{ ...TransitionPresets.DefaultTransition }}
        />
    </Stack.Navigator>
        </>
  );
}
