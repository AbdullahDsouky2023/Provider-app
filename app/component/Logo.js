import React from 'react'
import { Dimensions, Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { Sizes } from '../constant/styles'
const { width , height } = Dimensions.get('screen')
export default function Logo() {
    return (
        <Image
            source={require('../assets/images/icon.png')}
            style={styles.appLogoStyle}
            resizeMode="contain"
        />
    )
}
const styles = StyleSheet.create({
    appLogoStyle: {
        width: width*1,
        height: height * 0.13,
        alignSelf: 'center',
        padding: Sizes.fixPadding * 4,
        // marginBottom: Sizes.fixPadding * 4,
        // marginTop: Sizes.fixPadding * 8
    },
})