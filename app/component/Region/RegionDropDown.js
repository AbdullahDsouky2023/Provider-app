// import React, { useEffect, useState } from 'react';
//   import { StyleSheet, View, Text } from 'react-native';
//   import { Dropdown } from 'react-native-element-dropdown';
//   import AntDesign from '@expo/vector-icons/AntDesign';
// import useRegions from '../../../utils/useRegions';
// import { mainFont } from '../../constant/styles';
// import { Ionicons } from '@expo/vector-icons';
// import { Colors } from '../../constant/styles';



//   const RegionDropDown = ({onChange,enableRefetch}) => {
//     const [value, setValue] = useState("");
//     const {data:regions,refetch} =   useRegions()
//     useEffect(()=>{
//        if(enableRefetch) refetch()
//     },[enableRefetch])
//     const renderItem = item => {
//       return (
//         <View style={styles.item}>
//           <Text style={styles.textItem}>{item?.attributes?.name}</Text>
//           {item?.attributes?.name === value && (
//             <Ionicons name="location-outline" size={24} color={Colors.primaryColor} />
//           )}
//         </View>
//       );
//     };



//     return (
//       <Dropdown
//         style={styles.dropdown}
//         placeholderStyle={styles.placeholderStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         inputSearchStyle={styles.inputSearchStyle}
//         iconStyle={styles.iconStyle}
//         data={regions?.data}
//         // search
//         maxHeight={300}
//         labelField="label"
//         valueField="value"
//         placeholder={value || "اختار المنطقه" }
        
//         searchPlaceholder="Search..."
//         value={value}
//         onChange={item => {
//             const selectedName = item?.attributes?.name;
//             if (selectedName !== value) {
//               onChange(selectedName);
//               setValue(selectedName);
//             }
//           }}
//         renderRightIcon={() => (
//             <Ionicons name="location-outline" size={24} color="black" />
//         )}
//         renderItem={renderItem}
//       />
//     );
//   };

//   export default RegionDropDown;

//   const styles = StyleSheet.create({
//     dropdown: {
//       margin: 16,
//       height: 50,
//       backgroundColor: 'white',
//       borderRadius: 12,
//       fontFamily:mainFont.bold,
//       padding: 12,
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 1,
//       },
//       shadowOpacity: 0.2,
//       shadowRadius: 1.41,

//       elevation: 2,
//     },
//     icon: {
//       marginHorizontal: 15,
//       fontFamily:mainFont.bold,

//     },
//     item: {
//       padding: 17,
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       fontFamily:mainFont.bold,

//     },
//     textItem: {
//       flex: 1,
//       fontSize: 16,
//             fontFamily:mainFont.bold,

//     },
//     placeholderStyle: {
//       fontSize: 16,
//       fontFamily:mainFont.bold,

//     },
//     selectedTextStyle: {
//       fontSize: 16,
//       fontFamily:mainFont.bold,

//     },
//     iconStyle: {
//       width: 20,
//       height: 20,
//       fontFamily:mainFont.bold,

//     },
//     inputSearchStyle: {
//       height: 40,
//       fontSize: 16,
//             fontFamily:mainFont.bold,

//     },
//   });