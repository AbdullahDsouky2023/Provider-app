import React from 'react'
import {Stack, createStackNavigator} from '@react-navigation/stack'
import SigninScreen from "../screens/auth/signinScreen";
import RegisterScreen from "../screens/auth/registerScreen";
import VerificationScreen from "../screens/auth/verificationScreen";
import { TransitionPresets } from "@react-navigation/stack";
import ChooseCategories from '../screens/ResgisterAccount.js/ChooseCategories';
import { ADDITION_INFO, CHOOSE_CATEGORIES, CHOOSE_DCOUMENT } from './routes';
import AdditionInfoScreen from '../screens/ResgisterAccount.js/AdditionalIInfo';
import ChooseDocumentScreen from '../screens/ResgisterAccount.js/ChooseDocumentScreen';

export default function AuthNavigator() {
    const Stack = createStackNavigator()
    
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false,
    }}
      initialRouteName={"Register"}
    >
       <Stack.Screen name="SignIn"  component={SigninScreen} options={{ ...TransitionPresets.DefaultTransition }} />
        <Stack.Screen name="Verification" component={VerificationScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name={CHOOSE_CATEGORIES} component={ChooseCategories}   />
        <Stack.Screen name={ADDITION_INFO} component={AdditionInfoScreen}   />
        <Stack.Screen name={CHOOSE_DCOUMENT} component={ChooseDocumentScreen}   />

    </Stack.Navigator>
  )
}