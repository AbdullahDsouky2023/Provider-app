import React, { useState } from "react";
import { useFormikContext } from "formik";
import { format } from "date-fns";
import { ar } from "date-fns/locale"; // Import the Arabic locale

import FormTextInput from "./FormInput";
import ErrorMessage from "./ErrorMessage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Dimensions, StyleSheet, Text, TextInput } from "react-native";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";

const { width ,height} = Dimensions.get("screen");

function FormDatePicker({ name, width, style,value,disabled=false,...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
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

  const showDatepicker = () => {
    showMode("date");
  };

  const formattedDate = format(date, "dd MMMM yyyy", {
    locale: ar, // Use the Arabic locale
  });

  return (
    <View style={style}>
      <TouchableOpacity onPress={showDatepicker} disabled={disabled}>
        <View style={styles.date}>
          <TextInput
          editable={false}
          style={{fontSize:RFPercentage(2.2)}}
            onChangeText={(text) => setFieldValue(name, text)}
            value={ value?value :formattedDate}
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
          onChange={onChange}
          
        />)
      }
    </View>)
}


export default FormDatePicker;

const styles = StyleSheet.create({
  date: {
    borderWidth: 1,
    width: width * 0.91,
    padding: 10,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    height:height*0.070,

    // backgroundColor:'red',
    paddingVertical:11,
    marginVertical:10,
    // marginVertical:10,
    alignItems:'center',
    // marginHorizontal: width * 0.004,
    justifyContent: "space-between",
  },
});
