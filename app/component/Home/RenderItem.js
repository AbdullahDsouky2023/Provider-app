import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Colors, Sizes } from '../../constant/styles'

export default  RenderItem = ({ item, index }) => {

    const navigation = useNavigation()
    return (
    
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.push('AvailableProduct')}
            style={{
                ...styles.topCategoriesWrapStyle,
                paddingLeft: index % 2 == 0 ? Sizes.fixPadding * 2.0 : 0.0,
                paddingRight: index % 2 != 0 ? Sizes.fixPadding * 2.0 : 0.0,
            }}>
            <Image
                source={item.image}
                style={{
                    width: width / 2.3,
                    height: 190.0,
                    backgroundColor: Colors.whiteColor,
                }}
                resizeMode="contain"
            />
        </TouchableOpacity>
    )
  
}

const styles = StyleSheet.create({
    topCategoriesWrapStyle: {
        backgroundColor: Colors.whiteColor,
        width: width / 2.0,
        alignItems: 'center'
    },
})