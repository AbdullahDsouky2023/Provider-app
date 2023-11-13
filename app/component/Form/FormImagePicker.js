import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";
import { Image } from "react-native";


const { width } = Dimensions.get('screen')

const FormImagePicker = ({ name, width, ...otherProps }) => {
    const { setFieldTouched, setFieldValue, errors, touched, values } =
      useFormikContext();
    const [image, setImage] = useState(null);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setFieldValue(name, result.assets[0].uri);
      }
    };
  
    return (
      <>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.imagePicker}>
            {image ? (
              <Image source={{ uri: image }} style={styles.imagePreview} />
            ) : (
              <Ionicons name="camera" size={24} color="black" />
            )}
          </View>
        </TouchableOpacity>
        <ErrorMessage error={errors[name]} visible={touched[name]} />
      </>
    );
  };
  
  export default FormImagePicker;
  
  const styles = StyleSheet.create({
    imagePicker: {
      borderWidth: 1,
      width: width * 0.53,
      borderRadius:10,
      height: 150,
      justifyContent: "center",
      alignItems: "center",
    },
    imagePreview: {
      width: "100%",
      height: "100%",
    },
  });
  