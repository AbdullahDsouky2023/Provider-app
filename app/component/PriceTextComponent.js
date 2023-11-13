import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AppText from './AppText'
import { Colors } from '../constant/styles'

export default function PriceTextComponent({price,style}) {
    const PriceNum = Number(price)
  return (
    <View>

    <AppText
          text={`${PriceNum > 0 ?`  ${PriceNum} جنيه`:"السعر بعد الزياره"}`}
          style={[styles.servicePrice,style]}
          centered={false}
          />
          </View>
  )
}
const styles = StyleSheet.create({
    servicePrice: {
        color: Colors.primaryColor,
        fontSize: 14,
      },
})