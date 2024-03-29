
import React from 'react'
import { ORDERS, PREVIOUS_ORDERS } from './routes';
import { useTranslation } from 'react-i18next';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors, mainFont } from '../constant/styles';
import CurrentOrders from '../screens/Orders/CurrentOrders';
import CompletedOrdersScreen from '../screens/Orders/CompletedOrderScreen';

export default function CurrentOrdersTabNavigator() {
    const Tab = createMaterialTopTabNavigator();
    const { t } = useTranslation()
    
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: Colors.primaryColor,
      tabBarInactiveTintColor: Colors.grayColor,
      tabBarLabelStyle: {
        fontSize: 14.0,
        fontFamily: mainFont.light,
      },
      tabBarIndicatorStyle: {
        backgroundColor: Colors.primaryColor, // Change this to the color you want
        height: 3, // Change the height of the indicator line
      },
    }}
    >
    <Tab.Screen name={t(ORDERS)} component={CurrentOrders} />
    <Tab.Screen name=
    { t(PREVIOUS_ORDERS)} component={CompletedOrdersScreen} />
    </Tab.Navigator>
    
  )
}