import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Entypo } from "@expo/vector-icons";
import AppText from "../../component/AppText";
import { useTranslation } from "react-i18next";
import { governoratesOfSaudi } from "../../data/governrates";
import { RFPercentage } from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get("screen");

 

const 
CitiesDropDownComponent = ({value,setValue}) => {
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
        showsVerticalScrollIndicator={false}
        data={governoratesOfSaudi}
        maxHeight={300}
        labelField="label"
        valueField="value"
          placeholder={!isFocus ? t('Choose City'): t('Choose City')}
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
    fontSize: RFPercentage(2),
  },
  placeholderStyle: {
    fontSize: RFPercentage(1.8),
  },
  selectedTextStyle: {
    fontSize: RFPercentage(2),
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: RFPercentage(2),
  },
});
