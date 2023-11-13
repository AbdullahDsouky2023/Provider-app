import { TransitionPresets } from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import BottomTabBar from "../component/bottomTabBarScreen";

export default function AppNavigator() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen
        name="BottomTabBar"
        component={BottomTabBar}
        options={{ ...TransitionPresets.DefaultTransition }}
      />
    </Stack.Navigator>
  );
}
