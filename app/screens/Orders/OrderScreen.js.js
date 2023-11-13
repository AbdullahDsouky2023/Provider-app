;
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import CurrentOrdersTabNavigator from "../../navigation/CurrentOrdersTabNavigator";
import { ORDERS_DETAILS } from "../../navigation/routes";
import OrderDetails from "./OrderDetails";


function OrderScreen() {
  const Stack = createStackNavigator()
  return (
    <>
      <Stack.Navigator
    screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
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
    </Stack.Navigator>
    </>
  );
}

export default OrderScreen;
