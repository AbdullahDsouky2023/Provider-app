import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import { TransitionPresets } from "@react-navigation/stack";
import HomeScreen from '../screens/home/homeScreen';
import { useTranslation } from 'react-i18next';

export default function HomeNavigator() {
    const Stack = createStackNavigator()
    const { t } = useTranslation()
    
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false,
      }}
    >
        <Stack.Screen
                    name={t('Home')}
                    component={HomeScreen}
                />
    </Stack.Navigator>
  )
}