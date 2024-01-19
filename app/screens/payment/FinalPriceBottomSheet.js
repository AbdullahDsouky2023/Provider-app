import React, { useRef } from "react";
import { View, Button, Text } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons, AntDesign} from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";
const { width ,height} = Dimensions.get('screen')
export default function FinalPriceBottomSheet({children}) {
  const refRBSheet = useRef();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent"
      }}
    >
      <TouchableOpacity onPress={() => refRBSheet.current.open()} >
          <View style={styles.imagePicker}>
            <AppText text={"Add"} style={styles.text1}/>
            <AntDesign name="edit" size={30} color="white" />
          </View>
        </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={height*0.5}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
            height:100,
            width:width

          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
   {children}
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      // backgroundColor:'red',
      flexWrap: "wrap",
      width: width * 1,
    },
    imagePicker: {
      // borderWidth: 1,
      width: width * 0.4,
      borderRadius: width * 0.3 ,
      height: width * 0.15,
      backgroundColor: Colors.primaryColor,
      justifyContent: "center",
      gap:20,
      alignItems: "center",
      marginBottom: 10,
      marginHorizontal: 10,
      flexDirection: "row",
    },
    imageContainer: {
      // borderWidth: 0.4,
      width: "auto",
      borderRadius: 10,
      height: "auto",
      gap: 10,
      // backgroundColor:'red',
      flexWrap: "wrap",
      paddingHorizontal: 10,
      // justifyContent: "center",
      // alignItems: "center",
      marginBottom: 10,
      flexDirection: "row",
    },
    text1:{
        color:"white",
        fontSize:15
    },
    imagePreview: {
      width: width * 0.28,
      height: height * 0.1,
      borderRadius: 10,
    },
    deleteIcon: {
      position: "absolute",
      top: -10,
      right: -7,
    },
  });
  