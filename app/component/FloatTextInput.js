import { View, Text } from 'react-native'
import React from 'react'
import { Colors, Sizes,Fonts } from '../constant/styles'
import { TextInput } from 'react-native'

export default function FloatTextInput({value,onChangeText,...otherProps}) {
  return (
            <TextInput
                
                value={value}
                {...otherProps}
                onChangeText={(text) => onChangeText({value })}
                mode="outlined"
                style={{
                    height: 60.0,
                    ...Fonts.primaryColor17Medium,
                    backgroundColor: Colors.whiteColor,
                    marginHorizontal: Sizes.fixPadding * 2.0,
                }}
                outlineColor={Colors.grayColor}
                selectionColor={Colors.primaryColor}
                theme={{ colors: { primary: Colors.primaryColor, underlineColor: '#C5C5C5', } }}
            />
        )
}