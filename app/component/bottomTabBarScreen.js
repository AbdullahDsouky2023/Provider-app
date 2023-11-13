import React, { useState, useCallback } from "react";
import { BackHandler, View, Text, StyleSheet } from 'react-native'
import { Colors, Sizes, Fonts } from "../constant/styles";
import HomeScreen from "../screens/home/homeScreen";
import OrderScreen from "../screens/Orders/OrderScreen.js";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import AccountNavigator from "../navigation/AccountNavigator";
import { Octicons } from '@expo/vector-icons'; 
import CurrentOffersScreen from "../screens/CurrentOffersScreen/CurrentOffersScreen";
import { MY_ORDERS, OFFERS } from "../navigation/routes.js";

const Tab = createBottomTabNavigator();

const BottomTabBar = () => {
    const { t } = useTranslation()
    const backAction = () => {
        backClickCount == 1 ? BackHandler.exitApp() : _spring();
        return true;
    }

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
        }, [backAction])
    );

    function _spring() {
        setBackClickCount(1);
        setTimeout(() => {
            setBackClickCount(0)
        }, 1000)
    }

    const [backClickCount, setBackClickCount] = useState(0);

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: Colors.primaryColor,
                    tabBarInactiveTintColor: Colors.grayColor,
                    tabBarLabelStyle: {
                        fontSize: 14.0,
                        fontFamily: 'Janna-Lt',
                        fontWeight:700

                    },
                    tabBarStyle: { ...styles.tabBarStyle, },
                }}
            >
                <Tab.Screen
                    name={t('Home')}
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color }) => 
                        <Octicons name="home" size={27} color={color}/>

                    }}
                />
                <Tab.Screen
                    name={OFFERS}
                    component={CurrentOffersScreen}
                    options={{
                        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="gift-open-outline" size={27} color={color} />
                    }}
                />
                <Tab.Screen
                     name={MY_ORDERS}
                    component={OrderScreen}
                    options={{
                        tabBarIcon: ({ color }) => <Feather name="shopping-bag" size={27} color={color} />
                    }}
                />
                <Tab.Screen
                    name={t('Account')}
                    component={AccountNavigator}
                    options={{
                        tabBarIcon: ({ color, }) => (
                            <AntDesign name="user" size={27} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
            {exitInfo()}
        </>
    )

    function exitInfo() {
        return (
            backClickCount == 1
                ?
                <View style={[styles.animatedView]}>
                    <Text style={{ ...Fonts.whiteColor15Regular }}>
                        Press back once again to exit
                    </Text>
                </View>
                :
                null
        )
    }
}

const styles = StyleSheet.create({
    animatedView: {
        backgroundColor: '#333333',
        position: "absolute",
        bottom: 20,
        alignSelf: 'center',
        borderRadius: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding,
        justifyContent: "center",
        alignItems: "center",
    },
    tabBarStyle: {
        height: 70.0,
        elevation: 3.0,
        borderTopColor: 'gray',
        borderTopWidth: 0.20,
        borderTopLeftRadius: Sizes.fixPadding + 10.0,
        borderTopRightRadius: Sizes.fixPadding + 10.0,
        paddingTop: Sizes.fixPadding - 5.0,
        paddingBottom: Sizes.fixPadding - 5.0,
    }
})

export default BottomTabBar;