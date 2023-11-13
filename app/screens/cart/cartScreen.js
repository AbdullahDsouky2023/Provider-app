import React, { useState } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, TouchableWithoutFeedback, Modal, Image, Dimensions } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import DashedLine from 'react-native-dashed-line';
import { TextInput } from 'react-native-paper';
import { BottomSheet } from "@rneui/themed";
import { SharedElement } from 'react-navigation-shared-element';

const { width, height } = Dimensions.get('screen');

const handPickedItemsList = [
    {
        id: 'h1',
        image: require('../../assets/images/handpicked_item/handpicked_item_1.png'),
        percentageOff: 50,
        name: 'Liveasy Wellness Multivitamin Tablets Bottle',
        tabletsOrCapsulesCount: 60,
        type: 'Tablet(s)',
        price: 6,
        discountPrice: 12,
    },
    {
        id: 'h2',
        image: require('../../assets/images/handpicked_item/handpicked_item_2.png'),
        percentageOff: 30,
        name: 'Liveasy Wellness Multi-vitamin Tablets Bottle',
        tabletsOrCapsulesCount: 60,
        type: 'Tablet(s)',
        price: 8,
        discountPrice: 13,
    },
    {
        id: 'h3',
        image: require('../../assets/images/handpicked_item/handpicked_item_3.png'),
        percentageOff: 55,
        name: 'Liveasy WellnessCalcium, Magnesium Tablets',
        tabletsOrCapsulesCount: 60,
        type: 'Tablet(s)',
        price: 7,
        discountPrice: 15,
    },
    {
        id: 'h4',
        image: require('../../assets/images/handpicked_item/handpicked_item_4.png'),
        percentageOff: 20,
        name: 'Everherb Moringa (drumsticks) 500mg ',
        tabletsOrCapsulesCount: 60,
        type: 'Capsule(s)',
        price: 4,
        discountPrice: 6,
    },
    {
        id: 'h5',
        image: require('../../assets/images/handpicked_item/handpicked_item_5.png'),
        percentageOff: 10,
        name: 'Revital H- Daily Health Supplement - Capsules',
        tabletsOrCapsulesCount: 30,
        type: 'Capsule(s)',
        price: 4,
        discountPrice: 5,
    },
];

const someTermsAndConditionsList = [
    {
        id: '1',
        text: 'A Licensed pharmacy would be delivering your order basic availability of product & fastest delivery.'
    },
    {
        id: '2',
        text: 'Prices are indicative and may change after billing.'
    },
    {
        id: '3',
        text: 'HealthMeds is a technology platform to connect sellers and buyers and is not involved in sales of any product. Offer for sale on the products and services are provided/sold by the seller only.For detail Terms and Conditions.'
    }
];

const cartList = [
    {
        id: '1',
        image: require('../../assets/images/handpicked_item/handpicked_item_5.png'),
        name: 'Revital H Health Supplement Capsules Bottle of 30',
        manufacturer: 'REVITAL',
        detail: '30 CAPSULES(S) IN BOTTLE',
        discountPrice: 5,
        price: 6,
        percentageOff: 15,
        qty: 1,
    },
];

const couponList = [
    {
        id: '1',
        image: require('../../assets/images/offer_icon/amazon_pay.png'),
        title: 'Additional cashback upto $5 on Amaon pay | No coupon required',
        description: 'Pay via Amazon Pay and get Min $1 to Max $5 cashback, Valid on min. transaction of $3.',
        isApply: false,
        expiresDays: 14,
    },
    {
        id: '2',
        image: require('../../assets/images/offer_icon/hsbc.jpg'),
        title: '5% cashback on HSBC Credit card | No coupon code required',
        description: '5% additional cashback up to $3 on payment made via HSBC Credit card on a minimum transaction of $10',
        isApply: false,
        expiresDays: 13,
    },
    {
        id: '3',
        image: require('../../assets/images/offer_icon/curefit.png'),
        title: 'Use code : CULTFIT5 | Get 5% OFF on Live Training Sessions with Curefit',
        description: '5% OFF on Live Training Sessions with Curefit',
        isApply: true,
        code: 'CULTFIT5',
    },
];

const CartScreen = ({ navigation }) => {

    const [state, setState] = useState({
        quantityDialog: false,
        currentQuantity: null,
        cartItems: cartList,
        currentItemId: '',
        deliveryCharge: 5,
        deleteDialog: false,
        showBootomSheet: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        quantityDialog,
        currentQuantity,
        cartItems,
        currentItemId,
        deliveryCharge,
        deleteDialog,
        showBootomSheet,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            {header()}
            {cartItems.length == 0
                ?
                <View style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                    <View style={{
                        backgroundColor: Colors.primaryColor,
                        paddingVertical: Sizes.fixPadding * 4.0,
                        paddingHorizontal: Sizes.fixPadding,
                    }}>
                        {offersProductsAndReturnsInfo()}
                        {searchInfo()}

                    </View>
                    {emptyCartInfo()}
                </View>
                :
                <View style={{ flex: 1 }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: Sizes.fixPadding * 17.0 }}
                    >
                        {freeDeliveryInfo()}
                        {cartItemsInfo()}
                        {addMoreItemsInfo()}
                        {handPickedItemsInfo()}
                        {applyCouponButton()}
                        {amountInfo()}
                        {totalSavingsInfo()}
                        {additionalNotesInfo()}
                        {someTermsAndConditions()}
                    </ScrollView>
                    {deliverdAddressAndPaymentInfo()}
                </View>
            }
            {selectQuantityDialog()}
            {deleteItemDialog()}
            {addCouponBottonSheet()}
        </SafeAreaView>
    )

    function addCouponBottonSheet() {
        return (
            <BottomSheet
                isVisible={showBootomSheet}
                containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.5)' }}
                onBackdropPress={() => updateState({ showBootomSheet: false })}
            >
                <View style={styles.bottomSheetStyle}>
                    {applyCouponAndCancelButton()}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {couponCodeTextField()}
                        {coupons()}
                    </ScrollView>
                </View>
            </BottomSheet>
        )
    }

    function coupons() {
        return (
            <>
                {couponList.map((item, index) => (
                    <View key={`${item.id}`}>
                        <View style={{ marginTop: Sizes.fixPadding + 10.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={styles.couponProviderImageWrapStyle}>
                                        <Image
                                            source={item.image}
                                            style={{ height: 50.0, width: 110.0, }}
                                            resizeMode="contain"
                                        />
                                    </View>
                                    {
                                        item.isApply ?
                                            <>
                                                <View style={{
                                                    backgroundColor: Colors.orangeColor,
                                                    height: 35.0, width: 1.0,
                                                    marginHorizontal: Sizes.fixPadding,
                                                }} />
                                                <Text style={{ ...Fonts.orangeColor18Regular }}>
                                                    {item.code}
                                                </Text>
                                            </>
                                            :
                                            null
                                    }
                                </View>
                                <Text style={{
                                    paddingRight: item.isApply ? 0.0 : Sizes.fixPadding * 2.0,
                                    paddingTop: Sizes.fixPadding,
                                    lineHeight: 23.0,
                                    ...Fonts.primaryColor19Medium
                                }}>
                                    {item.isApply ? `Apply` : `No Code\nRequired`}
                                </Text>
                            </View>
                            <Text style={{ paddingTop: Sizes.fixPadding + 2.0, lineHeight: 23.0, ...Fonts.primaryColor19Medium }}>
                                {item.title}
                            </Text>
                            <Text style={{ lineHeight: 23.0, ...Fonts.primaryColor17Light }}>
                                {item.description}
                            </Text>
                            {item.isApply ?
                                null :
                                <Text style={{ ...Fonts.primaryColor17Medium }}>
                                    Expires In {item.expiresDays} days
                                </Text>
                            }
                            {
                                index == couponList.length - 1 ? null :
                                    <View style={{
                                        backgroundColor: Colors.primaryColor,
                                        height: 1.0,
                                        marginTop: Sizes.fixPadding + 5.0
                                    }} />
                            }
                        </View>
                    </View>
                ))}
            </>
        )
    }

    function couponCodeTextField() {
        return (
            <View style={{
                backgroundColor: '#EEEEEE',
                paddingHorizontal: Sizes.fixPadding * 2.0,
                paddingVertical: Sizes.fixPadding + 5.0
            }}>
                <TextInput
                    placeholder="Apply Coupon Code"
                    mode="outlined"
                    style={{
                        height: 50.0,
                        ...Fonts.primaryColor17Medium,
                        backgroundColor: Colors.whiteColor,
                    }}
                    placeholderTextColor={Colors.primaryColor}
                    right={<TextInput.Affix text="Apply" textStyle={{ ...Fonts.primaryColor18Medium }} />}
                    selectionColor={Colors.primaryColor}
                    theme={{ colors: { primary: '#C5C5C5', underlineColor: '#C5C5C5', } }}
                />
            </View>
        )
    }

    function applyCouponAndCancelButton() {
        return (
            <View style={styles.applyCouponAndCancelButtonWrapStyle}>
                <Text style={{ ...Fonts.primaryColor20Medium }}>
                    Apply Coupon
                </Text>
                <MaterialIcons
                    name="close"
                    size={24}
                    color={Colors.primaryColor}
                    onPress={() => updateState({ showBootomSheet: false })}
                />
            </View>
        )
    }

    function emptyCartInfo() {
        return (
            <View>
                <Text style={styles.emptyCartTextStyle}>
                    {'Your Cart is\n Empty'}
                </Text>
                <Image
                    source={require('../../assets/images/empty_cart.png')}
                    style={styles.emptyCartImageStyle}
                    resizeMode="contain"
                />
            </View>
        )
    }

    function searchInfo() {
        return (
            <View>
                <Text style={{ ...Fonts.whiteColor16Medium }}>
                    Search medicines/healthcare products
                </Text>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('Search')}
                    style={styles.searchButtonStyle}>
                    <MaterialIcons name="search" size={22} color={Colors.primaryColor} />
                    <Text numberOfLines={1} style={{ ...Fonts.primaryColor18Medium, marginLeft: Sizes.fixPadding, flex: 1 }}>
                        Search medicines/healthcare products
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function offersProductsAndReturnsInfo() {
        return (
            <View style={styles.offersProductsAndReturnsInfoWrapStyle}>
                {offersProductsAndReturns(
                    {
                        icon: <MaterialCommunityIcons name="tag" size={18} color={Colors.whiteColor} />,
                        description: 'Flat \n15% Off'
                    }
                )}
                {offersProductsAndReturns(
                    {
                        icon: <MaterialIcons name="security" size={18} color={Colors.whiteColor} />,
                        description: '1 Lakh+\n Products'
                    }
                )}
                {offersProductsAndReturns(
                    {
                        icon: <MaterialCommunityIcons name="layers-outline" size={20} color={Colors.whiteColor} />,
                        description: 'Easy \nReturns'
                    }
                )}
            </View>
        )
    }

    function offersProductsAndReturns({ icon, description }) {
        return (
            <View style={{ flexDirection: 'row', }}>
                <View style={styles.offersProductsAndReturnsIconWrapStyle}>
                    {icon}
                </View>
                <Text style={{ lineHeight: 23.0, ...Fonts.whiteColor16Regular, marginLeft: Sizes.fixPadding }}>
                    {description}
                </Text>
            </View>
        )
    }

    function deleteItemDialog() {
        return (
            <Dialog.Container
                visible={deleteDialog}
                contentStyle={styles.deleteDialogWrapStyle}
                headerStyle={{ margin: 0.0 }}
            >
                <Text style={{
                    ...Fonts.blackColor19Medium,
                    paddingTop: Sizes.fixPadding - 5.0,
                    paddingBottom: Sizes.fixPadding + 10.0
                }}>
                    Delete cart item?
                </Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => updateState({ deleteDialog: false })}
                        style={styles.noButtonStyle}>
                        <Text style={{ ...Fonts.primaryColor18Medium }}>
                            No
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => {
                            removeItem()
                            updateState({ deleteDialog: false })
                        }}
                        style={styles.yesButtonStyle}>
                        <Text style={{ ...Fonts.whiteColor18Medium }}>
                            Yes
                        </Text>
                    </TouchableOpacity>
                </View>
            </Dialog.Container>
        );
    }

    function deliverdAddressAndPaymentInfo() {
        return (
            <View style={styles.deliveryAndPaymentInfoWrapStyle}>
                {deliveredAddresInfo()}
                {totalAmountAndPaymentButton()}
            </View>
        )
    }

    function totalAmountAndPaymentButton() {
        return (
            <View style={styles.totalAmountAndPaymentButtonWrapStyle}>
                <Text style={{
                    ...Fonts.primaryColor25Medium,
                    paddingLeft: Sizes.fixPadding * 5.0,
                    paddingRight: Sizes.fixPadding * 4.0,
                }}>
                    ${total()}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('Payment')}
                    style={styles.proceedToPaymentButtonStyle}>
                    <Text style={{ ...Fonts.whiteColor19Medium }}>
                        Proceed to Payment
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function deliveredAddresInfo() {
        return (
            <View style={styles.deliveredAddresInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.deliveredAddressIconStye}>
                        <Image
                            source={require('../../assets/images/icons/icon_9.png')}
                            style={{ height: 50.0, width: 50.0 }}
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{
                                width: width - 190.0,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <View >
                                    <Text style={{
                                        ...Fonts.primaryColor17Regular
                                    }}>
                                        Deliver to
                                    </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text numberOfLines={1} style={{ marginLeft: Sizes.fixPadding, ...Fonts.primaryColor18Medium }}>
                                        Home (10001)
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => navigation.push('SelectAddress')}
                            >
                                <Text style={{ ...Fonts.primaryColor20Medium }}>
                                    CHANGE
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={{ ...Fonts.primaryColor18Medium }}>
                            91, Opera Street, Newyork, 10001
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ ...Fonts.primaryColor17Regular }}>
                                Deliver by:
                            </Text>
                            <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.primaryColor18Medium }}>
                                25-Aug-2020
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    function someTermsAndConditions() {
        return (
            <View style={styles.someTermsAndConditionsWrapStyle}>
                {
                    someTermsAndConditionsList.map((item) => (
                        <View key={`${item.id}`}>
                            <View style={{ flexDirection: 'row', }}>
                                <View style={styles.termsAndConditionBulletStyle} />
                                <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.primaryColor18Regular, lineHeight: 24.0, }}>
                                    {item.text}
                                </Text>
                            </View>
                        </View>
                    ))
                }
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.push('TermsAndConditions')}
                >
                    <Text style={{ lineHeight: 24.0, ...Fonts.primaryColor18Medium, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                        Terms and Conditions
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function additionalNotesInfo() {
        return (
            <View style={styles.additionalNotesInfoWrapStyle}>
                <Text style={{ ...Fonts.primaryColor19Medium }}>
                    Additional Notes
                </Text>
                <TextInput
                    placeholder="Enter any additional information regarding your order"
                    placeholderTextColor={Colors.grayColor}
                    style={{
                        ...Fonts.blackColor17Medium,
                        backgroundColor: Colors.whiteColor,
                    }}
                    multiline={true}
                    numberOfLines={4}
                    mode="outlined"
                    selectionColor={Colors.primaryColor}
                    theme={{ colors: { primary: Colors.primaryColor, underlineColor: Colors.grayColor, } }}
                />
            </View>
        )
    }

    function totalSavingsInfo() {
        return (
            <View style={styles.totalSavingInfoWrapStyle}>
                <View style={styles.totalSavingInfoStyle}>
                    <View style={{ flexDirection: 'row', }}>
                        <View style={styles.dollarIconWrapStyle}>
                            <MaterialCommunityIcons name="currency-usd" size={22} color={Colors.whiteColor} />
                        </View>
                        <View style={{
                            width: width - 140.0,
                            marginLeft: Sizes.fixPadding,
                            marginTop: Sizes.fixPadding - 15.0
                        }}>
                            <Text style={{ paddingTop: Sizes.fixPadding, lineHeight: 23.0, ...Fonts.primaryColor19Medium }}>
                                Total savings of $1 on this order
                            </Text>
                            <Text style={{ ...Fonts.primaryColor17Light }}>
                                MRP Discount
                            </Text>
                        </View>
                    </View>
                    <Text style={{ alignSelf: 'flex-end', ...Fonts.primaryColor17Light }}>
                        $1
                    </Text>
                </View>
            </View>
        )
    }

    function total() {
        const total = cartItems.reduce((sum, i) => {
            return sum += i.qty * i.discountPrice
        }, 0);
        return total;
    }

    function amountInfo() {
        return (
            <View style={{ backgroundColor: Colors.whiteColor, paddingHorizontal: Sizes.fixPadding * 2.0, }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.primaryColor18Regular }}>
                        Cart Value
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...Fonts.primaryColor18Light, textDecorationLine: "line-through", }}>
                            ${cartItems.reduce((sum, i) => (
                                sum += i.qty * i.price
                            ), 0)}
                        </Text>
                        <Text style={{ ...Fonts.primaryColor19Medium }}>
                            {total()}
                        </Text>
                    </View>
                </View>
                <View style={{ paddingVertical: Sizes.fixPadding - 5.0, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.primaryColor18Regular }}>
                        Delivery Charge
                    </Text>
                    <Text style={{ ...Fonts.primaryColor19Medium }}>
                        {total() > 10 ? `0` : `5`}
                    </Text>
                </View>
                <DashedLine dashLength={5} dashThickness={2} dashGap={3} dashColor='rgba(0, 150, 136, 0.5)' />
                <View style={{ flexDirection: 'row', paddingVertical: Sizes.fixPadding - 5.0, alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ ...Fonts.primaryColor19Medium }}>
                        Amount to be paid
                    </Text>
                    <Text style={{ ...Fonts.primaryColor19Medium }}>
                        ${total() + (total() > 10 ? 0 : 5)}
                    </Text>
                </View>
            </View>
        )
    }

    function applyCouponButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => updateState({ showBootomSheet: true })}
                style={{
                    backgroundColor: Colors.whiteColor,
                    paddingHorizontal: Sizes.fixPadding * 2.0,
                    paddingVertical: Sizes.fixPadding * 2.0,
                }}>
                <View style={styles.applyCouponWrapStyle}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/images/icons/icon_13.png')}
                            style={{ width: 25.0, height: 25.0, }}
                        />
                        <Text style={{ marginLeft: Sizes.fixPadding, ...Fonts.primaryColor19Medium }}>
                            Apply Coupon
                        </Text>
                    </View>
                    <MaterialIcons name="arrow-forward-ios" size={20} color={Colors.primaryColor} />
                </View>
            </TouchableOpacity>
        )
    }

    function handPickedItemsInfo() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.push('ProductDescription', { item, from: 'home' })}
            >
                <SharedElement id={item.id}>
                    <View style={styles.handPickedItemsInfoWrapStyle}>
                        <Image
                            source={item.image}
                            style={{ width: 140.0, height: 140.0, }}
                            resizeMode="contain"
                        />
                        <View style={styles.percentageOffWrapStyle}>
                            <Text style={{ ...Fonts.whiteColor16Medium }}>
                                {item.percentageOff}% OFF
                            </Text>
                        </View>
                    </View>
                </SharedElement>
                <Text numberOfLines={2} style={{ marginTop: Sizes.fixPadding, ...Fonts.blackColor19Medium, width: 190.0, lineHeight: 24.0, }}>
                    {item.name}
                </Text>
                <Text style={{ ...Fonts.primaryColor18Regular, marginTop: Sizes.fixPadding - 15.0 }}>
                    {item.tabletsOrCapsulesCount} {item.type} in Bottle
                </Text>
                <View style={{ marginTop: Sizes.fixPadding - 17.0, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ ...Fonts.primaryColor25Medium }}>
                        ${item.price}
                    </Text>
                    <Text style={{ ...Fonts.primaryColor18Light, marginLeft: Sizes.fixPadding - 5.0, textDecorationLine: "line-through", }}>
                        ${item.discountPrice}
                    </Text>
                </View>
            </TouchableOpacity>
        )
        return (
            <View style={{ marginVertical: Sizes.fixPadding * 2.0, backgroundColor: Colors.whiteColor }}>
                <Text style={{ ...Fonts.blackColor19Medium, marginTop: Sizes.fixPadding + 3.0, marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    Handpicked Items for You
                </Text>
                <FlatList
                    horizontal
                    data={handPickedItemsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft: Sizes.fixPadding * 2.0,
                        paddingTop: Sizes.fixPadding,
                        paddingBottom: Sizes.fixPadding * 2.0
                    }}
                />
            </View>
        )
    }

    function addMoreItemsInfo() {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => navigation.push('OrderMedicines')}
                style={styles.addMoreItemsInfoWrapStyle}>
                <Text style={{ ...Fonts.primaryColor19Medium }}>
                    Add More Items
                </Text>
                <View style={styles.addIconWrapStyle}>
                    <MaterialCommunityIcons
                        name="plus"
                        size={24}
                        color={Colors.primaryColor}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    function selectQuantityDialog() {
        return (
            <Modal
                animationType="none"
                transparent={true}
                visible={quantityDialog}
            >
                <TouchableWithoutFeedback>
                    <View style={styles.selectQuantityModelStyle}>
                        <View style={{
                            width: width * 0.8,
                            backgroundColor: Colors.whiteColor,
                            borderRadius: Sizes.fixPadding,
                        }}>
                            <View style={styles.selectQuantityTitleStyle}>
                                <Text style={{ ...Fonts.primaryColor20Medium }}>
                                    Select Quantity
                                </Text>
                                <MaterialIcons name="close" size={24}
                                    onPress={() => updateState({ quantityDialog: false })}
                                    color={Colors.primaryColor} />
                            </View>
                            <View style={{ backgroundColor: Colors.primaryColor, height: 1.0 }} />
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => {
                                    removeItem()
                                    updateState({ quantityDialog: false })
                                }}
                            >
                                <Text style={{ margin: Sizes.fixPadding, ...Fonts.primaryColor19Medium }}>
                                    Remove item
                                </Text>
                            </TouchableOpacity>
                            {quantity({ number: 1, })}
                            {quantity({ number: 2, })}
                            {quantity({ number: 3, })}
                            {quantity({ number: 4, })}
                            {quantity({ number: 5, })}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    function changeQuantity({ quantity }) {
        const newList = cartItems.map((product) => {
            if (product.id === currentItemId) {
                const updatedItem = { ...product, qty: quantity, };
                return updatedItem;
            }
            return product;
        });
        updateState({ cartItems: newList, })
    }

    function quantity({ number }) {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => {
                    updateState({ currentQuantity: number })
                    changeQuantity({ quantity: number })
                    updateState({ quantityDialog: false })
                }}
                style={{
                    backgroundColor: currentQuantity == number ? '#E2E2E2' : Colors.whiteColor,
                    borderBottomLeftRadius: number == 5 ? Sizes.fixPadding : 0.0,
                    borderBottomRightRadius: number == 5 ? Sizes.fixPadding : 0.0,
                    ...styles.selectedQuantityWrapStyle,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text style={{ ...Fonts.primaryColor19Medium }}>
                        {number}
                    </Text>
                    {number == 5
                        ?
                        <Text style={{ ...Fonts.primaryColor15Light, marginLeft: Sizes.fixPadding }}>
                            Max Qty
                        </Text>
                        :
                        null
                    }
                </View>
                {currentQuantity == number ?
                    <View style={styles.doneIconWrapStyle}>
                        <MaterialIcons name="check" size={20} color={Colors.whiteColor} />
                    </View>
                    :
                    null
                }
            </TouchableOpacity>
        )
    }

    function cartItemsInfo() {
        return (
            <View>
                {cartItems.map((item) => (
                    <View key={`${item.id}`}>
                        <View style={{
                            backgroundColor: Colors.whiteColor,
                            paddingHorizontal: Sizes.fixPadding * 2.0,
                            paddingBottom: Sizes.fixPadding * 2.0
                        }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={item.image}
                                        style={{ width: 50.0, height: 50.0 }}
                                        resizeMode="contain"
                                    />
                                    <View style={{ width: width - 150.0, marginLeft: Sizes.fixPadding, }}>
                                        <Text style={{ ...Fonts.primaryColor19Medium, lineHeight: 25.0, }}>
                                            {item.name}
                                        </Text>
                                        <Text style={{ ...Fonts.primaryColor18Regular, lineHeight: 23.0, }}>
                                            BY {item.manufacturer}
                                        </Text>
                                        <Text style={{ ...Fonts.primaryColor19Medium }}>
                                            {item.detail}
                                        </Text>
                                        <View style={{ flexDirection: 'row', marginBottom: Sizes.fixPadding, alignItems: 'center' }}>
                                            <Text style={{ ...Fonts.primaryColor25Medium }}>
                                                ${item.discountPrice}
                                            </Text>
                                            <Text style={{ marginHorizontal: Sizes.fixPadding + 2.0, ...Fonts.primaryColor18Light, textDecorationLine: "line-through" }}>
                                                ${item.price}
                                            </Text>
                                            <View style={styles.offerWrapStyle}>
                                                <Text style={{ ...Fonts.whiteColor16Medium }}>
                                                    {item.percentageOff}% OFF
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            activeOpacity={0.6}
                                            onPress={() => updateState({ quantityDialog: true, currentItemId: item.id, currentQuantity: item.qty })}
                                            style={styles.quantityCountWrapStyle}>
                                            <Text style={{ ...Fonts.primaryColor19Medium, marginRight: Sizes.fixPadding - 7.0 }}>
                                                Qty {item.qty}
                                            </Text>
                                            <MaterialIcons name="arrow-drop-down" size={24} color={Colors.primaryColor} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <MaterialIcons name="delete" size={24} color={Colors.primaryColor}
                                    onPress={() => {
                                        updateState({ currentItemId: item.id })
                                        updateState({ deleteDialog: true })

                                    }}
                                />
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        )
    }

    function removeItem() {
        let filterArray = cartItems.filter((val, i) => {
            if (val.id !== currentItemId) {
                return val;
            }
        })
        updateState({ cartItems: filterArray })
    }

    function freeDeliveryInfo() {
        return (
            <View style={styles.freeDeliveryInfoWrapStyle}>
                <View style={styles.freeDeliveryInfoStyle}>
                    <Image
                        source={require('../../assets/images/icons/icon_12.png')}
                        style={{ width: 20.0, height: 20.0 }}
                    />
                    <Text style={{
                        ...Fonts.primaryColor18Regular, flex: 1,
                        lineHeight: 23.0,
                        paddingTop: Sizes.fixPadding - 2.0,
                        marginLeft: Sizes.fixPadding + 2.0
                    }}>
                        Free delivery with cart value above $10
                    </Text>
                </View>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons name="arrow-back" size={24} color={Colors.whiteColor}
                        onPress={() => navigation.pop()}
                    />
                    <Text style={{ ...Fonts.whiteColor19Medium, marginLeft: Sizes.fixPadding + 5.0 }}>
                        {cartItems.length} Item in Cart
                    </Text>
                </View>
                <MaterialIcons name="search" size={24} color={Colors.whiteColor}
                    onPress={() => navigation.push('Search')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        backgroundColor: Colors.primaryColor,
        height: 56.0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: Sizes.fixPadding * 2.0,
        paddingRight: Sizes.fixPadding
    },
    offerWrapStyle: {
        backgroundColor: Colors.redColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 6.0,
        paddingHorizontal: Sizes.fixPadding - 4.0,
    },
    quantityCountWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 8.0,
    },
    freeDeliveryInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 4.0,
    },
    freeDeliveryInfoStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.grayColor,
        borderStyle: 'dashed',
        borderRadius: Sizes.fixPadding,
        borderWidth: 1.0,
        paddingVertical: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding - 5.0
    },
    selectedQuantityWrapStyle: {
        paddingVertical: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding + 2.0,
    },
    doneIconWrapStyle: {
        width: 25.0,
        height: 25.0,
        borderRadius: 12.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.redColor
    },
    selectQuantityTitleStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: Sizes.fixPadding * 2.0,
    },
    selectQuantityModelStyle: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.50)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addMoreItemsInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        marginTop: Sizes.fixPadding,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Sizes.fixPadding * 2.0,
    },
    addIconWrapStyle: {
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    handPickedItemsInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: 'rgba(0, 150, 136, 0.3)',
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        marginRight: Sizes.fixPadding * 2.0,
        width: 190.0,
        height: 180.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    percentageOffWrapStyle: {
        position: 'absolute',
        left: -0.60,
        top: -0.50,
        backgroundColor: Colors.redColor,
        borderTopLeftRadius: Sizes.fixPadding,
        borderBottomRightRadius: Sizes.fixPadding,
        padding: Sizes.fixPadding - 4.0,
    },
    applyCouponWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding + 5.0,
        paddingVertical: Sizes.fixPadding + 2.0,
    },
    deliveryAndPaymentInfoWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
    },
    totalAmountAndPaymentButtonWrapStyle: {
        backgroundColor: Colors.whiteColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Sizes.fixPadding,
        paddingHorizontal: Sizes.fixPadding,
        alignItems: 'center',
    },
    proceedToPaymentButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    deliveredAddresInfoWrapStyle: {
        backgroundColor: '#EEEEEE',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding,
        paddingTop: Sizes.fixPadding - 5.0,
    },
    deliveredAddressIconStye: {
        height: 80.0,
        backgroundColor: Colors.whiteColor,
        width: 80.0,
        borderRadius: 40.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    someTermsAndConditionsWrapStyle: {
        marginVertical: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        alignSelf: 'flex-start',
        paddingVertical: Sizes.fixPadding * 2.0,
    },
    termsAndConditionBulletStyle: {
        marginTop: Sizes.fixPadding - 6.0,
        width: 8.0,
        alignSelf: 'flex-start',
        height: 8.0,
        borderRadius: 4.0,
        backgroundColor: Colors.primaryColor
    },
    additionalNotesInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        marginTop: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingBottom: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding + 5.0,
    },
    totalSavingInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingTop: Sizes.fixPadding,
        paddingBottom: Sizes.fixPadding * 2.0
    },
    totalSavingInfoStyle: {
        backgroundColor: Colors.bodyBackColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderStyle: 'dashed',
        borderColor: Colors.primaryColor,
        borderWidth: 1.0,
        padding: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
    },
    dollarIconWrapStyle: {
        width: 30.0,
        height: 30.0,
        borderRadius: 15.0,
        backgroundColor: Colors.orangeColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noButtonStyle: {
        backgroundColor: '#E0E0E0',
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1.0,
        marginRight: Sizes.fixPadding,
    },
    yesButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding - 5.0,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1.0,
        marginLeft: Sizes.fixPadding,
    },
    deleteDialogWrapStyle: {
        width: width - 80.0,
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        paddingBottom: Sizes.fixPadding * 2.0
    },
    offersProductsAndReturnsIconWrapStyle: {
        width: 32.0,
        height: 32.0,
        borderRadius: 16.0,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.whiteColor, borderWidth: 1.0,
    },
    offersProductsAndReturnsInfoWrapStyle: {
        flexDirection: 'row',
        borderColor: Colors.whiteColor,
        borderStyle: 'dashed',
        borderRadius: Sizes.fixPadding,
        borderWidth: 1.0,
        justifyContent: 'space-evenly',
        paddingVertical: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
    },
    searchButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 1.0,
        marginTop: Sizes.fixPadding,
    },
    emptyCartImageStyle: {
        alignSelf: 'flex-end',
        marginRight: Sizes.fixPadding * 2.0,
        width: 140.0,
        height: 140.0,
        marginTop: Sizes.fixPadding - 30.0,
    },
    emptyCartTextStyle: {
        paddingTop: Sizes.fixPadding * 2.0,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        ...Fonts.primaryColor25Medium,
        lineHeight: 25.0,
    },
    bottomSheetStyle: {
        backgroundColor: Colors.whiteColor,
        borderTopLeftRadius: Sizes.fixPadding,
        borderTopRightRadius: Sizes.fixPadding,
        height: height / 1.8,
    },
    couponProviderImageWrapStyle: {
        backgroundColor: Colors.whiteColor,
        borderColor: Colors.orangeColor,
        borderWidth: 1.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'dashed',
    },
    applyCouponAndCancelButtonWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 5.0,
        justifyContent: 'space-between',
        borderBottomColor: '#EEEEEE',
        borderBottomWidth: 1.0,
    }
});

export default CartScreen;