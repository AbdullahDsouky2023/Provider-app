import React, { useState } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';

const addressesList = [
    {
        id: '1',
        type: 'home',
        person: 'Allison Perry',
        address: '91,Opera Street \nNational Chowk \nNew york',
        pinCode: '10001',
        mobileNumer: '123456789',
        deliveredDate: '26-Aug-2020',
    },
    {
        id: '2',
        type: 'other',
        person: 'Allison Perry',
        address: '102,Atlantic Ave \nBrooklyn \nNew york',
        pinCode: '11216',
        mobileNumer: '123456789',
        deliveredDate: '28-Aug-2020',
    },
];

const SelectAddressScreen = ({ navigation }) => {

    const [state, setState] = useState({
        currentAddressId: '',
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        currentAddressId,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 7.0, }}
                >
                    {addNewButton()}
                    {deliverToInfo()}
                </ScrollView>
                {saveAndContinueButton()}
            </View>
        </SafeAreaView>
    )

    function saveAndContinueButton() {
        return (
            <View style={styles.saveAndContinueButtonWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.pop()}
                    style={styles.saveAndContinueButtonStyle}>
                    <Text style={{ ...Fonts.whiteColor19Medium }}>
                        Save and Continue
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function deliverToInfo() {
        return (
            <View>
                <Text style={{ marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.primaryColor18Medium }}>
                    Deliver To
                </Text>
                {addressesList.map((item) => (
                    <View key={`${item.id}`}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => updateState({ currentAddressId: item.id })}
                            style={{
                                borderColor: currentAddressId == item.id ? Colors.primaryColor : '#E0E0E0',
                                ...styles.addressesWrapStyle,
                            }}>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={{ flexDirection: 'row', flex: 1, margin: Sizes.fixPadding * 2.0 }}>
                                    <Image
                                        source={
                                            item.type == 'home'
                                                ?
                                                require('../../assets/images/icons/icon_9.png')
                                                :
                                                item.type == "work"
                                                    ?
                                                    require('../../assets/images/icons/icon_10.png')
                                                    :
                                                    require('../../assets/images/icons/icon_11.png')
                                        }

                                        style={{ width: 30.0, height: 30.0, }}
                                    />
                                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ marginTop: Sizes.fixPadding - 15.0, ...Fonts.primaryColor19Medium }}>
                                                {
                                                    item.type == 'home' ?
                                                        `Home` :
                                                        item.type == 'work' ?
                                                            `Office` :
                                                            `Other`
                                                }
                                            </Text>
                                            <View style={{
                                                ...styles.radioButtonStyle,
                                                borderColor: currentAddressId == item.id ? Colors.primaryColor : Colors.grayColor,
                                            }}>
                                                {
                                                    currentAddressId == item.id
                                                        ?
                                                        <View style={{ height: 11.0, width: 11.0, borderRadius: 6.5, backgroundColor: Colors.primaryColor }} />
                                                        :
                                                        null
                                                }
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={{ paddingTop: Sizes.fixPadding + 3.0, lineHeight: 20.0, ...Fonts.primaryColor17Regular }}>
                                                {`${item.person} \n${item.address} ${item.pinCode} \n${item.mobileNumer}`}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <MaterialIcons name="delete" size={24} color={Colors.primaryColor} />
                                                <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.primaryColor17Regular }}>
                                                    Remove
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <MaterialIcons name="edit" size={24} color={Colors.primaryColor} />
                                                <Text style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.primaryColor17Regular }}>
                                                    Edit
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {
                                currentAddressId == item.id
                                    ?
                                    <View style={styles.deliveredByInfoWrapStyle}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image
                                                source={require('../../assets/images/icons/icon_12.png')}
                                                style={{ width: 20.0, height: 20.0 }}
                                            />
                                            <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.primaryColor17Medium }}>
                                                Delivery by
                                            </Text>
                                        </View>
                                        <Text style={{ ...Fonts.primaryColor18Medium }}>
                                            {item.deliveredDate}
                                        </Text>
                                    </View>
                                    :
                                    null
                            }
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        )
    }

    function addNewButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.push('AddAddress')}
                style={styles.addNewButtonStyle}>
                <Text style={{ ...Fonts.primaryColor20Medium }}>
                    Add New
                </Text>
            </TouchableOpacity>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.whiteColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.whiteColor19Medium }}>
                    Select Address
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.primaryColor,
        height: 56.0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
    },
    addNewButtonStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        margin: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding - 5.0,
    },
    deliveredByInfoWrapStyle: {
        flexDirection: 'row',
        borderBottomLeftRadius: Sizes.fixPadding,
        borderBottomRightRadius: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: '#FFF4E5',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    radioButtonStyle: {
        borderWidth: 1.0,
        borderRadius: 10.0,
        width: 20.0,
        height: 20.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addressesWrapStyle: {
        borderRadius: Sizes.fixPadding, borderWidth: 1.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginVertical: Sizes.fixPadding * 2.0
    },
    saveAndContinueButtonWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        backgroundColor: Colors.whiteColor,
        borderTopColor: '#EEEEEE',
        borderTopWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding
    },
    saveAndContinueButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
    }
});

export default SelectAddressScreen;