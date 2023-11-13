import React, { useState } from "react";
import { SafeAreaView, StatusBar, View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';

const discountsList = [
    {
        id: '1',
        isSelected: false,
        discount: '10% and above',
    },
    {
        id: '2',
        isSelected: false,
        discount: '20% and above',
    },
    {
        id: '3',
        isSelected: false,
        discount: '30% and above',
    }
];

const brandsList = [
    {
        id: '1',
        isSelected: false,
        brand: 'HealthVit'
    },
    {
        id: '2',
        isSelected: false,
        brand: 'Garlico Herbal'
    },
    {
        id: '3',
        isSelected: false,
        brand: 'Organic Wellness'
    },
];

const productFormsList = [
    {
        id: '1',
        productForm: 'Capsule',
        isSelected: false,
    },
    {
        id: '2',
        productForm: 'Powder',
        isSelected: false,
    },
    {
        id: '3',
        productForm: 'Tablet',
        isSelected: false,
    }
];

const FilterScreen = ({ navigation }) => {

    const [state, setState] = useState({
        discounts: discountsList,
        brands: brandsList,
        productForms: productFormsList,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        discounts,
        brands,
        productForms,
    } = state;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {discountInfo()}
                    {brandInfo()}
                    {productFormInfo()}
                </ScrollView>
                {applyButton()}
            </View>
        </SafeAreaView>
    )

    function applyButton() {
        return (
            <View style={styles.applyButtonWrapStyle}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation.pop()}
                    style={styles.applyButtonStyle}>
                    <Text style={{ ...Fonts.whiteColor19Medium }}>
                        Apply
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function productFormInfo() {
        return (
            <View>
                {divider()}
                <Text style={{ paddingVertical: Sizes.fixPadding - 5.0, ...Fonts.primaryColor19Medium, textAlign: 'center' }}>
                    Product Form
                </Text>
                {divider()}
                {productForms.map((item, index) => (
                    <View key={`${item.id}`}>
                        <View style={{
                            marginTop: index == 0 ? Sizes.fixPadding : 0.0,
                            ...styles.chackBoxWithTextWrapStyle,
                        }}>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => { toggleProductFormCheck({ id: item.id }) }}
                                style={{
                                    ...styles.checkBoxStyle,
                                    backgroundColor: item.isSelected ? Colors.primaryColor : Colors.whiteColor,
                                    borderColor: item.isSelected ? Colors.primaryColor : 'gray',
                                }}>
                                {
                                    item.isSelected ?
                                        <MaterialIcons name="check" size={15} color={Colors.whiteColor} />
                                        :
                                        null
                                }
                            </TouchableOpacity>
                            <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.primaryColor17Regular }}>
                                {item.productForm}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        )
    }

    function brandInfo() {
        return (
            <View>
                {divider()}
                <Text style={{ paddingVertical: Sizes.fixPadding - 5.0, ...Fonts.primaryColor19Medium, textAlign: 'center' }}>
                    Brand
                </Text>
                {divider()}
                {brands.map((item, index) => (
                    <View key={`${item.id}`}>
                        <View style={{
                            marginTop: index == 0 ? Sizes.fixPadding : 0.0,
                            ...styles.chackBoxWithTextWrapStyle,
                        }}>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => { toggleBrandCheck({ id: item.id }) }}
                                style={{
                                    ...styles.checkBoxStyle,
                                    backgroundColor: item.isSelected ? Colors.primaryColor : Colors.whiteColor,
                                    borderColor: item.isSelected ? Colors.primaryColor : 'gray',
                                }}>
                                {
                                    item.isSelected ?
                                        <MaterialIcons name="check" size={15} color={Colors.whiteColor} />
                                        :
                                        null
                                }
                            </TouchableOpacity>
                            <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.primaryColor17Regular }}>
                                {item.brand}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        )
    }

    function discountInfo() {
        return (
            <View>
                <Text style={{ paddingVertical: Sizes.fixPadding - 5.0, ...Fonts.primaryColor19Medium, textAlign: 'center' }}>
                    Discount
                </Text>
                {divider()}
                {discounts.map((item, index) => (
                    <View key={`${item.id}`}>
                        <View style={{
                            marginTop: index == 0 ? Sizes.fixPadding : 0.0,
                            ...styles.chackBoxWithTextWrapStyle,
                        }}>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => { toggleDiscountCheck({ id: item.id }) }}
                                style={{
                                    ...styles.checkBoxStyle,
                                    backgroundColor: item.isSelected ? Colors.primaryColor : Colors.whiteColor,
                                    borderColor: item.isSelected ? Colors.primaryColor : 'gray',
                                }}>
                                {
                                    item.isSelected ?
                                        <MaterialIcons name="check" size={15} color={Colors.whiteColor} />
                                        :
                                        null
                                }
                            </TouchableOpacity>
                            <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.primaryColor17Regular }}>
                                {item.discount}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        )
    }

    function toggleProductFormCheck({ id }) {
        const newList = productForms.map((product) => {
            if (product.id === id) {
                const updatedItem = { ...product, isSelected: !product.isSelected, };
                return updatedItem;
            }
            return product;
        });
        updateState({ productForms: newList, })
    }

    function toggleBrandCheck({ id }) {
        const newList = brands.map((brand) => {
            if (brand.id === id) {
                const updatedItem = { ...brand, isSelected: !brand.isSelected, };
                return updatedItem;
            }
            return brand;
        });
        updateState({ brands: newList, })
    }

    function toggleDiscountCheck({ id }) {
        const newList = discounts.map((discount) => {
            if (discount.id === id) {
                const updatedItem = { ...discount, isSelected: !discount.isSelected, };
                return updatedItem;
            }
            return discount;
        });
        updateState({ discounts: newList, })
    }

    function divider() {
        return (
            <View
                style={{
                    backgroundColor: Colors.bodyBackColor,
                    height: 1.0,
                    marginHorizontal: Sizes.fixPadding
                }}
            />
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back"
                    size={24}
                    color={Colors.whiteColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ marginLeft: Sizes.fixPadding + 5.0, ...Fonts.whiteColor19Medium }}>
                    Filter
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
    checkBoxStyle: {
        height: 18.0,
        width: 18.0,
        borderWidth: 1.0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chackBoxWithTextWrapStyle: {
        flexDirection: 'row',
        marginBottom: Sizes.fixPadding + 5.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignItems: 'center'
    },
    applyButtonWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        borderTopColor: Colors.bodyBackColor,
        borderTopWidth: 1.0,
        backgroundColor: Colors.whiteColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
    },
    applyButtonStyle: {
        backgroundColor: Colors.primaryColor,
        borderRadius: Sizes.fixPadding - 5.0,
        paddingVertical: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default FilterScreen;