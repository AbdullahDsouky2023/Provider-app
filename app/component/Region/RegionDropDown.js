import React, { useEffect, useState } from 'react';
  import { StyleSheet, View, Text } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
import useRegions from '../../../utils/useRegions';
import { mainFont } from '../../constant/styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constant/styles';
  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const RegionDropDown = ({onChange}) => {
    const [value, setValue] = useState("");
    const {data:regions} =   useRegions()

    const renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item?.attributes?.name}</Text>
          {item?.attributes?.name === value && (
            <Ionicons name="location-outline" size={24} color={Colors.primaryColor} />
          )}
        </View>
      );
    };
    const getRegions = async()=>{
    }
    useEffect(()=>{
        console.log(regions?.data[0]?.attributes?.name)
    },[])

    return (
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={regions?.data}
        // search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="اختار المنطقه"
        
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
            console.log("chhhhhhh",value)
            onChange(item?.attributes?.name)
            setValue(item?.attributes?.name)
        }}
        renderRightIcon={() => (
            <Ionicons name="location-outline" size={24} color="black" />
        )}
        renderItem={renderItem}
      />
    );
  };

  export default RegionDropDown;

  const styles = StyleSheet.create({
    dropdown: {
      margin: 16,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 12,
      fontFamily:mainFont.bold,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    icon: {
      marginHorizontal: 15,
      fontFamily:mainFont.bold,

    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily:mainFont.bold,

    },
    textItem: {
      flex: 1,
      fontSize: 16,
            fontFamily:mainFont.bold,

    },
    placeholderStyle: {
      fontSize: 16,
      fontFamily:mainFont.bold,

    },
    selectedTextStyle: {
      fontSize: 16,
      fontFamily:mainFont.bold,

    },
    iconStyle: {
      width: 20,
      height: 20,
      fontFamily:mainFont.bold,

    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
            fontFamily:mainFont.bold,

    },
  });