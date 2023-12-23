;
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import CurrentOrdersTabNavigator from "../../navigation/CurrentOrdersTabNavigator";
import { COMPLETE_ORDERS_DETAILS, ORDERS_DETAILS } from "../../navigation/routes";
import OrderDetails from "./OrderDetails";
import CompletedOrderDetails from './CompletedOrderDetails'

function OrderScreen() {
  const Stack = createStackNavigator()
  return (
      <Stack.Navigator
    screenOptions={{
        headerShown: false,
   }}
    >
        <Stack.Screen
                    name={"CurrentOrdersTabNavigator"}
                    component={CurrentOrdersTabNavigator}
                   
                />
        <Stack.Screen
                    name={ORDERS_DETAILS}
                    component={OrderDetails}
                   
                />
        <Stack.Screen
                    name={COMPLETE_ORDERS_DETAILS}
                    component={CompletedOrderDetails}
                   
                />
    </Stack.Navigator>
  );
}

export default OrderScreen;
