import React from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Dimensions, FlatList } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('screen');

const savedAddressesList = [
    {
        id: '1',
        type: 'home',
        deliveredTo: 'Allison Perry',
        address: '91, Opera Street, Newyork,',
        pinCode: '10001',
    },
];

const ChooseLocationScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {chooseLocationTitle()}
                    {pinCodeInfo()}
                    {selectLocationInfo()}
                    {savedAddressesInfo()}
                    {servingInfo()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function servingInfo() {
        return (
            <View style={styles.servingInfoWrapStyle}>
                <Image source={require('../../assets/images/icons/icon_8.png')} />
                <Text style={styles.servingInfoTextStyle}>
                    Serving More than 1,000 towns and cities.
                </Text>
            </View>
        )
    }

    function savedAddressesInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.savedAddressesWrapStyle}>
                {item.type == 'home'
                    ?
                    <Image source={require('../../assets/images/icons/icon_9.png')} />
                    :
                    item.type == 'work'
                        ?
                        <Image source={require('../../assets/images/icons/icon_10.png')} />
                        :
                        <Image style={{ width: 30.0, height: 30.0 }} source={require('../../assets/images/icons/icon_11.png')} />
                }
                <View style={{ marginLeft: Sizes.fixPadding + 5.0, marginTop: Sizes.fixPadding - 15.0, }}>
                    <Text style={{ ...Fonts.primaryColor20Medium }}>
                        Home
                    </Text>
                    <Text style={{ ...Fonts.primaryColor18Regular }}>
                        {item.deliveredTo}
                    </Text>
                    <Text numberOfLines={2} style={{ ...Fonts.primaryColor18Regular, width: 230, }}>
                        {item.address}
                    </Text>
                    <Text style={{ ...Fonts.primaryColor18Regular }}>
                        {item.pinCode}
                    </Text>
                </View>
            </View>
        )
        return (
            <View>
                <Text style={{
                    ...Fonts.primaryColor25Medium,
                    marginBottom: Sizes.fixPadding - 5.0,
                    marginHorizontal: Sizes.fixPadding * 2.0
                }}>
                    Saved Addresses
                </Text>
                <FlatList
                    data={savedAddressesList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: Sizes.fixPadding * 2.0 }}
                    ListFooterComponent={
                        <>
                            {addNewAddressButton()}
                        </>
                    }
                />
            </View>
        )
    }

    function addNewAddressButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.push('AddAddress')}
                style={styles.addNewAddressButtonWrapStyle}
            >
                <View style={styles.addAddressIconWrapStyle}>
                    <MaterialIcons name="add" size={24} color={Colors.whiteColor} />
                </View>
                <Text style={{ lineHeight: 25.0, paddingTop: Sizes.fixPadding + 5.0, ...Fonts.primaryColor22Medium }}>
                    {`Add New \n Address`}
                </Text>
            </TouchableOpacity>
        )
    }

    function selectLocationInfo() {
        return (
            <View>
                <View style={{
                    marginTop: Sizes.fixPadding * 2.0,
                    marginBottom: Sizes.fixPadding * 25.0,
                    marginHorizontal: Sizes.fixPadding * 2.0, flexDirection: 'row', alignItems: 'center'
                }}>
                    <MaterialIcons name="my-location" size={24} color={Colors.primaryColor} />
                    <Text style={{ ...Fonts.primaryColor19Medium, marginLeft: Sizes.fixPadding }}>
                        Select Current Location
                    </Text>
                </View>
            </View >
        )
    }

    function pinCodeInfo() {
        return (
            <View style={styles.pinCodeInfoWrapStyle}>
                <TextInput
                    placeholder="Enter PIN Code"
                    placeholderTextColor={Colors.primaryColor}
                    keyboardType="numeric"
                    selectionColor={Colors.primaryColor}
                    style={{ flex: 1.0, ...Fonts.primaryColor18Regular, paddingHorizontal: Sizes.fixPadding }}
                />
                <View style={{
                    backgroundColor: Colors.primaryColor,
                    paddingVertical: Sizes.fixPadding,
                    paddingHorizontal: Sizes.fixPadding * 3.0
                }}>
                    <Text style={{ ...Fonts.whiteColor18Regular }}>
                        Check
                    </Text>
                </View>
            </View>
        )
    }

    function chooseLocationTitle() {
        return (
            <View style={{
                flexDirection: 'row',
                margin: Sizes.fixPadding * 2.0,
                justifyContent: 'space-between',
            }}>
                <Text style={{ ...Fonts.primaryColor25Medium, lineHeight: 30.0, }}>
                    {`Choose your \n Location`}
                </Text>
                <MaterialIcons
                    name="close"
                    size={30}
                    color={Colors.primaryColor}
                    onPress={() => navigation.pop()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pinCodeInfoWrapStyle: {
        flexDirection: 'row',
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0
    },
    addNewAddressButtonWrapStyle: {
        backgroundColor: Colors.whiteColor,
        height: 180.0,
        borderColor: Colors.grayColor,
        borderStyle: "dashed",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.0,
        paddingHorizontal: Sizes.fixPadding * 3.0,
        borderRadius: Sizes.fixPadding
    },
    addAddressIconWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    savedAddressesWrapStyle: {
        flexDirection: 'row',
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.grayColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        width: 330.0,
        height: 180.0,
        paddingHorizontal: Sizes.fixPadding + 10.0,
        marginRight: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding + 10.0,
    },
    servingInfoWrapStyle: {
        flexDirection: 'row',
        backgroundColor: '#E3E3E3',
        marginHorizontal: Sizes.fixPadding * 2.0,
        borderRadius: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 7.0,
        marginVertical: Sizes.fixPadding * 2.0
    },
    servingInfoTextStyle: {
        ...Fonts.primaryColor17Medium,
        width: width - 150.0,
        lineHeight: 22.0,
        paddingTop: Sizes.fixPadding - 5.0,
        marginLeft: Sizes.fixPadding + 5.0,
    }
});

export default ChooseLocationScreen;