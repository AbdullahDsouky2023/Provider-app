import React from 'react'
import { Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { Sizes } from '../constant/styles'

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
        width: 60,
        height: 60,
        alignSelf: 'center',
        marginBottom: Sizes.fixPadding * 4,
        marginTop: Sizes.fixPadding * 8
    },
})