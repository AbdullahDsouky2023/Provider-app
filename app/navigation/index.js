import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { LogBox } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import LoadingScreen from "../component/loadingScreen";
import SplashScreen from "../screens/splashScreen";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { ITEM_DETAILS, ITEM_ORDER_DETAILS, MANUAL_LOCATION_ADD, ORDER_SELECT_LOCATION, ORDER_SELECT_REGION, ORDER_SUCCESS_SCREEN } from "./routes";
import ItemScreen from "../screens/Item/ItemScreen";
import OrderNavigator from "./orderNavigator";
import ItemOrderDetails from "../screens/Item/ItemOrderDetails";
import OrderCreationSuccess from "../screens/OrderCreationSuccess";
import SlectLocationOrderScreen from "../screens/location/SelectLocationOrderScreen";
import AddManualLocationScreen from "../screens/location/AddManualLocationScreen";
import PaymentScreen from "../screens/payment/paymentScreen";
import SelectRegionScreen from "../screens/RegionScreen";

LogBox.ignoreAllLogs();

const Stack = createSharedElementStackNavigator();
const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,

          ...TransitionPresets.SlideFromRightIOS,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="App" component={AppNavigator} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen
          name={ITEM_DETAILS}
          component={ItemScreen}
          // initialParams={{ item }} // Pass the item object to ItemOrderDetails
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ITEM_ORDER_DETAILS}
          component={ItemOrderDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ORDER_SUCCESS_SCREEN}
          component={OrderCreationSuccess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ORDER_SELECT_LOCATION}
          component={SlectLocationOrderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ORDER_SELECT_REGION}
          component={SelectRegionScreen}
          options={{ headerShown: false }}
        />
             <Stack.Screen name={MANUAL_LOCATION_ADD} component={AddManualLocationScreen} />
             <Stack.Screen name={"Payment"} component={PaymentScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
