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
import * as DocumentPicker from 'expo-document-picker';

const { width, height } = Dimensions.get("screen");

const FormDocumentPicker = ({ name, width, ...otherProps }) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  const [image, setImage] = useState([]);


  const pickMultipleDocuments = async () => {
    try {
      // Launch the document picker and get an array of document information
      let results = await DocumentPicker.getMultipleDocumentsAsync({
        // You can specify the document types you want to allow
        type: 'application/pdf',
        // You can also specify multiple document types as an array
        // type: ['application/pdf', 'text/plain']
      });
  
      // Check if the user picked any documents
      if (results.length > 0) {
        // Loop through the results array and get the document information
        for (let result of results) {
          // Get the document URI, name, size, and type
          let { uri, name, size, type } = result;
          // Do something with the document information
          console.log(uri, name, size, type);
        }
      }
    } catch (error) {
      console.log('error picking multiple documents', error);
    }
  };
  const uploadDocument = async (uri, name, type) => {
    try {
      // Create a new FormData object
      let formData = new FormData();
      // Append the document information
      formData.append('file', {
        uri,
        name,
        type
      });
      // Send the request to your server
      let response = await fetch(YOUR_SERVER_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      // Handle the response
      console.log(response);
    } catch (error) {
      console.log('error uploading document', error);
    }
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
      </View>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

export default FormDocumentPicker;

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
