import React, { useState ,useRef} from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { Colors } from "../../constant/styles";
import ModalComponent from "../../component/Modal";
import AppText from "../../component/AppText";

import RBSheet from "react-native-raw-bottom-sheet";
import { RFPercentage } from "react-native-responsive-fontsize";
const { width ,height} = Dimensions.get('screen')

const CustomImagePicker = ({ onImageSelected, ...otherProps }) => {
  const [image, setImage] = useState(null);
  const refRBSheet = useRef();

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4,  3],
        quality:  1,
        base64: true,
      });

      if (!result.canceled) {
        if (result?.assets[0]?.uri) {
          setImage(result?.assets[0]?.uri);
          onImageSelected(result?.assets[0]?.uri);
          refRBSheet.current.close(); // Close the bottom sheet
          console.log("closing tthe  modal")

        }
      }
    } catch (error) {
      console.log("error selecting image", error);
    }
  };

  const pickImageFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Please grant camera permissions to take a photo.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4,  3],
      quality:  1,
      base64: true,
    });

    if (!result.canceled) {
      if (result?.assets[0]?.uri) {
        setImage(result?.assets[0]?.uri);
        onImageSelected(result?.assets[0]?.uri);
        refRBSheet.current.close(); // Close the bottom sheet

      }
    }
  };

  return (
    <View style={styles.container}>
      <CustomModal  refRBSheet={refRBSheet}>
        <TouchableOpacity  onPress={pickImage}>
          <View style={styles.popupContainer}>
            <View style={styles.imagePicker}>
              <Ionicons name="image" size={24} color="white" />
            </View>
            <View>
              <AppText text={"Choose Image"}  style={{color:Colors.blackColor,fontSize:RFPercentage(2.2)}}/>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity  onPress={pickImageFromCamera}>
          <View style={styles.popupContainer}>
            <View style={styles.imagePicker}>
              <Ionicons name="camera" size={24} color="white" />
            </View>
            <View>
              <AppText text={"Take a photo"}  style={{color:Colors.blackColor,fontSize:RFPercentage(2.2)}}/>
            </View>
          </View>
        </TouchableOpacity>
      </CustomModal>
    </View>
  );
};

export default CustomImagePicker;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    // backgroundColor:'blue',
    flexWrap: "wrap",
    // width: width * 1,
    marginTop:10,
  },
  imagePicker: {
    // borderWidth: 1,
    width: width * 0.1,
    borderRadius: width * 0.1 * 0.5,
    height: width * 0.1,
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
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
  popupContainer: {
    // borderWidth: 0.4,
    width: "auto",
    borderRadius: 10,
    height: "auto",
    gap: 10,
    // backgroundColor:'red',
    flexWrap: "wrap",
    paddingHorizontal: 10,
    // justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
    paddingTop: 1,
  },
});

export  function CustomModal({children,refRBSheet}) {
  // const refRBSheet = useRef();
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
          <View style={styles2.imagePicker}>
            <Ionicons name="camera" size={RFPercentage(2.5)} color="white" />
          </View>
        </TouchableOpacity>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
            height:100,
            width:width

          },
          container:{
            height:height*0.2,
            width:width
          },
          draggableIcon: {
            backgroundColor:Colors.primaryColor
          }
        }}
      >
   {children}
      </RBSheet>
    </View>
  );
}

const styles2 = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      // backgroundColor:'red',
      flexWrap: "wrap",
      width: width * 1,
    },
    imagePicker: {
      // borderWidth: 1,
      width: width * 0.078,
      borderRadius: width * 0.2 * 0.5,
      height: width *  0.078,
      backgroundColor: Colors.primaryColor,
      justifyContent: "center",
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
  