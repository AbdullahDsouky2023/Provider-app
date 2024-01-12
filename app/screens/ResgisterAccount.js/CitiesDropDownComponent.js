import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Entypo } from "@expo/vector-icons";
import AppText from "../../component/AppText";
import { useTranslation } from "react-i18next";
const { width, height } = Dimensions.get("screen");
const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];

const CitiesDropDownComponent = ({value,setValue}) => {
  const [isFocus, setIsFocus] = useState(false);
  const { t } = useTranslation();
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <AppText
          text={"Choose City"}
          style={[styles.label, isFocus && { color: "blue" }]}
        />
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {/* {renderLabel()} */}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        //   placeholder={!isFocus ? 'Select item' : t('Choose City')}
        searchPlaceholder={t("Search")}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
        }}
        renderRightIcon={() => (
          <Entypo
            style={styles.icon}
            color={isFocus ? "blue" : "black"}
            name="location-pin"
            size={20}
          />
        )}
      />
    </View>
  );
};

export default CitiesDropDownComponent;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: width * 1,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
    marginTop: 5,
    marginHorizontal: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
