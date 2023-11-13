import React from 'react'
import { Pagination } from 'react-native-snap-carousel-v4';
import { StyleSheet } from 'react-native';
import { Colors, Sizes } from '../../constant/styles';

export default function PaginationComponent({length,activeSlide}) {
    return (
        <Pagination
            dotsLength={length}
            activeDotIndex={activeSlide}
            containerStyle={styles.sliderPaginationWrapStyle}
            dotStyle={styles.sliderActiveDotStyle}
            inactiveDotStyle={styles.sliderInactiveDotStyle}
        />
    );
}
const styles = StyleSheet.create({
    sliderActiveDotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5.0,
        backgroundColor: Colors.primaryColor,
        marginHorizontal: Sizes.fixPadding - 15.0
    },
    sliderInactiveDotStyle: {
        width: 9,
        height: 9,
        borderRadius: 4.5,
        backgroundColor: Colors.primaryColor
    },
    sliderPaginationWrapStyle: {
        position: 'absolute',
        bottom: -20.0,
        left: 0.0,
        right: 0.0,


    },
})