import React, { useState } from "react";
import { useFormikContext } from "formik";
import { format } from "date-fns";
import { arSA } from "date-fns/locale"; // Import the Saudi Arabian locale

// Format the date with the standard Arabic month names

import moment from "moment";
import "moment/min/locales"; // Import all locales

// Use the Arabic locale
moment.locale("ar");

// Format the date with the Arabic script

// import FormTextInput from "./FormInput";
import ErrorMessage from "../Form/ErrorMessage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Dimensions, StyleSheet, Text, TextInput } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");

function UserDatePicker({ name, width, birthDate,...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  const [date, setDate] = useState(birthDate ? new Date(birthDate) : new Date() );
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios"); // Hide the DateTimePicker for iOS
    setDate(currentDate);
  
    // Format the date to a more readable format before setting the field value
    const formattedDateForDB = format(currentDate, "yyyy-MM-dd", {
      locale: arDZ, // Use the Arabic locale
    });
  
    setFieldValue(name, formattedDateForDB);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  const formattedDate = format(date, "dd MMMM yyyy", {
    locale: arSA,
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatepicker}>
        <View style={styles.date}>
          <TextInput
            onChangeText={(text) => setFieldValue(name, text)}
            value={formattedDate}
            editable={false}
            onBlur={() => setFieldTouched(name)}
          />
          <Ionicons name="calendar" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
        //   minimumDate={new Date()}
          onChange={onChange}
        />)
      }
    </View>)
}


export default UserDatePicker;

const styles = StyleSheet.create({
  container:{
    marginVertical:15
  },
  date: {
    borderWidth: 1,
    width: width * 0.93,
    padding: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
