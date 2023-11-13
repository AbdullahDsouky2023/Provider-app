import React, { useState } from "react";
import { useFormikContext } from "formik";
import { format } from "date-fns";
import { arDZ } from "date-fns/locale"; // Import the Arabic locale

import FormTextInput from "./FormInput";
import ErrorMessage from "./ErrorMessage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Dimensions, StyleSheet, Text, TextInput } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");

function FormTimePicker({ name, width, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("Time");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios"); // Hide the DateTimePicker for iOS
    setDate(currentDate);
    setFieldValue(name, currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    showMode("time");
  };

  // Format the time using the Arabic locale
  const formattedTime = format(date, "hh:mm a", {
    locale: arDZ, // Use the Arabic locale
  });

  return (
    <>
      <TouchableOpacity onPress={showTimepicker}>
        <View style={styles.date}>
          <TextInput
                      onChangeText={(text) => setFieldValue(name, text)}

            value={formattedTime}
            onBlur={() => setFieldTouched(name)}
          />
          <Ionicons name="timer-outline" size={24} color="black" />
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
          onChange={onChange}
        />)
      }
    </>
  );
}

export default FormTimePicker;

const styles = StyleSheet.create({
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
