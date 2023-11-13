import React from "react";
import { SafeAreaView, StatusBar, View, Text, ScrollView, StyleSheet } from "react-native";
import { Colors, Fonts, Sizes } from "../../constant/styles";
import { MaterialIcons } from '@expo/vector-icons';

const TermsAndConditionsScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <StatusBar backgroundColor={Colors.primaryColor} />
            <View style={{ flex: 1 }}>
                {header()}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {termsAndConditions()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )

    function termsAndConditions() {
        return (
            <View style={{ margin: Sizes.fixPadding * 2.0, }}>
                <Text style={{ marginVertical: Sizes.fixPadding - 5.0, lineHeight: 23.0, ...Fonts.primaryColor17Regular }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
                <Text style={{ marginVertical: Sizes.fixPadding - 5.0, lineHeight: 23.0, ...Fonts.primaryColor17Regular }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
                <Text style={{ marginVertical: Sizes.fixPadding - 5.0, lineHeight: 23.0, ...Fonts.primaryColor17Regular }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
                <Text style={{ marginVertical: Sizes.fixPadding - 5.0, lineHeight: 23.0, ...Fonts.primaryColor17Regular }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
                <Text style={{ marginVertical: Sizes.fixPadding - 5.0, lineHeight: 23.0, ...Fonts.primaryColor17Regular }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
            </View>

        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons name="arrow-back" size={24} color={Colors.whiteColor}
                    onPress={() => navigation.pop()}
                />
                <Text style={{ ...Fonts.whiteColor19Medium, marginLeft: Sizes.fixPadding + 5.0 }}>
                    Terms and Conditions
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        height: 56.0,
        paddingHorizontal: Sizes.fixPadding * 2.0
    }
})

export default TermsAndConditionsScreen