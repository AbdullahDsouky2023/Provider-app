import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, StatusBar, ScrollView, Image, Dimensions, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';
import { Dialog } from "react-native-paper";
import ArrowBack from "../../component/ArrowBack";
import { CommonActions } from "@react-navigation/native";
import { ORDER_SUCCESS_SCREEN } from "../../navigation/routes";
import { useTranslation } from "react-i18next";
const { width , height } = Dimensions.get("screen");

import AppText from "../../component/AppText";
export default function  PaymentMethod({ icon, paymentType, index ,currentPaymentMethodIndex,updateState}) {
    const {t} = useTranslation()
    return (
        <TouchableOpacity
        
            
        onPress={() => updateState({ currentPaymentMethodIndex: index })}
        style={{
                borderColor: currentPaymentMethodIndex == index ? Colors.primaryColor : '#E0E0E0',
                ...styles.paymentMethodWrapStyle
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center',height: height*0.03,width:width*0.7 }}>
                {/* <AppText numberOfLines={1} style={{
                     ...Fonts.primaryColor18Medium,
                     marginLeft: Sizes.fixPadding,
                     width: width / 2.2,
                 }}
                    text={paymentType} /> */}
                <Image
                    source={icon}
                    style={{
                        width: width*0.6,
                        height: 50,
                    }}
                    resizeMode="contain"
                />
            </View>
            {/* <View style={{
                borderColor: currentPaymentMethodIndex == index ? Colors.primaryColor : '#E0E0E0',
                ...styles.radioButtonStyle
            }}>
                {
                    currentPaymentMethodIndex == index ?
                        <View style={{
                            width: 12.0,
                            height: 12.0,
                            borderRadius: 6.0,
                            backgroundColor: Colors.primaryColor
                        }}>
                        </View> : null
                }
            </View> */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:"space-between",
        height: 56.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding,
    },
    paymentMethodWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: Sizes.fixPadding,
    },
    radioButtonStyle: {
        width: 20.0,
        height: 20.0,
        borderRadius: 10.0,
        borderWidth: 1.0,
        backgroundColor: Colors.whiteColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    payButtonOuterWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.whiteColor,
        borderTopColor: '#ECECEC',
        borderTopWidth: 1.0,
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding * 2.0
    },
    payButtonWrapStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        width: '100%'
    },
    dialogWrapStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 100,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding * 3.,
        alignSelf: 'center',
    },
    successIconWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        width: 70.0,
        height: 70.0,
        borderRadius: 35.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    payableAmountWrapStyle: {
        backgroundColor: '#F8F3EC',
        paddingVertical: Sizes.fixPadding + 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding
    }
})