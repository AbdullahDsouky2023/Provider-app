import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TransitionPresets } from "@react-navigation/stack";
import { LogBox } from "react-native";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import LoadingScreen from "../component/loadingScreen";
import SplashScreen from "../screens/splashScreen";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { ADDITION_INFO, BROWSE_ORDERS, CHARGE_WALLET_SCREEN, CHAT_ROOM, CHOOSE_CATEGORIES,PROVIDER_LOCATION, CHOOSE_DCOUMENT, ITEM_DETAILS, ITEM_ORDER_DETAILS, MANUAL_LOCATION_ADD, ORDER_SELECT_LOCATION, ORDER_SELECT_REGION, ORDER_SUCCESS_SCREEN, PAY_AFTER_SERVICES_SCREEN, RATE_CLIENT_sSCREEN, REGISTER_ERROR_DOCS, NO_CONNECTION_SCREEN, CHANGE_ORDER_DATE, ADD_ADDITIONAL_SERVICES_SCREEN, CHAT_ROOM_fireBase } from "./routes";
import ItemScreen from "../screens/Item/ItemScreen";
import ItemOrderDetails from "../screens/Item/ItemOrderDetails";
import OrderCreationSuccess from "../screens/OrderCreationSuccess";
import SlectLocationOrderScreen from "../screens/location/SelectLocationOrderScreen";
import AddManualLocationScreen from "../screens/location/AddManualLocationScreen";
import PaymentScreen from "../screens/payment/paymentScreen";
import SelectRegionScreen from "../screens/RegionScreen";
import ChatNavigator from "./ChatNavigator";
import OrdersScreen from "../screens/OrdersScreen";
import RegisterErrorDocument from "../screens/registerStatus/RegisterErrorDocument";
import ChooseDocumentScreen from "../screens/ResgisterAccount.js/ChooseDocumentScreen";
import AdditionInfoScreen from "../screens/ResgisterAccount.js/AdditionalIInfo";
import ChooseCategories from "../screens/ResgisterAccount.js/ChooseCategories";
import ChargeWalletScreen from "../screens/wallet/ChargeWalletScreen";
import PaymentAfterServiceDetails from "../screens/PaymentAfterServiceDetails";
import StarsComponent from "../component/StarsComponent";
import ProviderLocationScreen from "../screens/location/ProviderLocationScreen";
import NoConnectionScreen from "../screens/NoConnectionScreen";
import ChangeDateOrderScreen from "../screens/Orders/ChangeOrderDate";
import AddAddionalPriceScreen from "../screens/AddAddionalPriceScreen";
import ChatRoom from "../component/FirebaseChat/ChatRoom";
LogBox.ignoreAllLogs();

const Stack = createSharedElementStackNavigator();
const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,

       }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="App" component={AppNavigator} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Chat" component={ChatNavigator} />
        <Stack.Screen
          name={ITEM_DETAILS}
          component={ItemScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={PROVIDER_LOCATION}
          component={ProviderLocationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={BROWSE_ORDERS}
          component={OrdersScreen}
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
          name={REGISTER_ERROR_DOCS}
          component={RegisterErrorDocument}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ORDER_SELECT_LOCATION}
          component={SlectLocationOrderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={RATE_CLIENT_sSCREEN}
          component={StarsComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={CHARGE_WALLET_SCREEN}
          component={ChargeWalletScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={CHANGE_ORDER_DATE}
          component={ChangeDateOrderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={PAY_AFTER_SERVICES_SCREEN}
          component={PaymentAfterServiceDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ADD_ADDITIONAL_SERVICES_SCREEN}
          component={AddAddionalPriceScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={CHAT_ROOM_fireBase}
          component={ChatRoom}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ORDER_SELECT_REGION}
          component={SelectRegionScreen}
          options={{ headerShown: false }}
        /> <Stack.Screen name={CHOOSE_CATEGORIES} component={ChooseCategories}   />
        <Stack.Screen name={ADDITION_INFO} component={AdditionInfoScreen}   />
        <Stack.Screen name={CHOOSE_DCOUMENT} component={ChooseDocumentScreen}   />
        <Stack.Screen name={NO_CONNECTION_SCREEN} component={NoConnectionScreen}   />

             <Stack.Screen name={MANUAL_LOCATION_ADD} component={AddManualLocationScreen} />
             <Stack.Screen name={"Payment"} component={PaymentScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
