import React from 'react'
import {Stack, createStackNavigator} from '@react-navigation/stack'

import { TransitionPresets } from "@react-navigation/stack";
import AccountScreen from '../screens/account/accountScreen';
import WalletScreen from '../screens/wallet/walletScreen';
import ShareScreen from '../screens/share/ShareScreen';
import CallUsScreen from '../screens/Call/CallUsScreen';
import UserInfo from '../screens/PersonalInfo/UserInfo';
import LocationScreen from '../screens/location/LocationScreen';
import AddManualLocationScreen from '../screens/location/AddManualLocationScreen';
import { MANUAL_LOCATION_ADD } from './routes';
import ConditionsScreen from '../screens/terms/ConditionScreen';
import MyReviews from '../screens/account/MyReviews';

export default function AccountNavigator() {
    const Stack = createStackNavigator()
    
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false,
      }}
    >
       <Stack.Screen name="Account" component={AccountScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="wallet" component={WalletScreen} />
        <Stack.Screen name="share" component={ShareScreen} />
        <Stack.Screen name="social-instagram" component={CallUsScreen} />
        <Stack.Screen name="user" component={UserInfo} />
        <Stack.Screen name ="doc" component={ConditionsScreen} />
        <Stack.Screen name ="star" component={MyReviews} />

        <Stack.Screen name="location-pin" component={LocationScreen} />
        <Stack.Screen name={MANUAL_LOCATION_ADD} component={AddManualLocationScreen} />
    </Stack.Navigator>
  )
}