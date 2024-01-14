import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import { Image } from "react-native";
import { Colors } from "../../constant/styles";
import ModalComponent from "../Modal";
import AppModal from "../AppModal";
import AppText from "../AppText";

const { width, height } = Dimensions.get("screen");

const FormImagePicker = ({ name, width, ...otherProps }) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  const [image, setImage] = useState([]);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      
        // allowsMultipleSelection: true, // Enable multiple selection
      });

      if (!result.canceled) {
        if (image && Array.isArray(image)) {
          if (result?.assets[0]?.uri) {
            setImage([...image, result?.assets[0]?.uri]);
            setFieldValue(name, [...values[name], result?.assets[0]?.uri]);
          }
        } else {
          // console.log(image && Array.isArray(image));
        }
        // else {
        //     // Handle the case where values.images is not an array
        // }
      }
    } catch (error) {
      console.log("error selecting image", error?.message);
    }
  };

  const pickImageFromCamera = async () => {
    // Request camera permissions explicitly
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Please grant camera permissions to take a photo.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      if (image && Array.isArray(image)) {
        if (result?.assets[0]?.uri) {
          setImage([...image, result?.assets[0]?.uri]);

          setFieldValue(name, [...values?.images, result?.assets[0]?.uri]);
        }
      } else {
        // console.log(image && Array.isArray(image));
      }
      // else {
      //     // Handle the case where values.images is not an array
      // }
    }
  };
  const handleImageDelete = (index) => {
    const newImages = [...image];
    newImages.splice(index, 1);
    setImage(newImages);
    setFieldValue(name, newImages); // Update Formik value correctly
  };

  return (
    <View style={styles.container}>
      <View>
        {image.length > 0 && (
          <View style={styles.imageContainer}>
            {image?.map((imageUri, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                <TouchableOpacity
                  style={styles.deleteIcon}
                  onPress={() => handleImageDelete(index)}
                >
                  <MaterialIcons name="delete" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>
      <View>
{
  
    image?.length  ===0 &&

      
      <ModalComponent>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.popupContainer}>
            
            <View style={styles.imagePicker}>
              <Ionicons name="image" size={24} color="white" />
            </View>
            

            <View>
              <AppText text={"Choose Image"} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={pickImageFromCamera}>
          <View style={styles.popupContainer}>
            <View style={styles.imagePicker}>
              <Ionicons name="camera" size={24} color="white" />
            </View>

            <View>
              <AppText text={"Take a photo"} />
            </View>
          </View>
        </TouchableOpacity>
      </ModalComponent>
      }
      </View>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

export default FormImagePicker;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    // backgroundColor:'red',
    flexWrap: "wrap",
    width: width * 1,
    marginTop:10,
  },
  imagePicker: {
    // borderWidth: 1,
    width: width * 0.17,
    borderRadius: width * 0.1 * 0.5,
    height: width * 0.17,
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
