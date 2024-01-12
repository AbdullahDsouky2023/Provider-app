import {
  View,
  Text,
  StatusBar,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constant/styles";
import ArrowBack from "../../component/ArrowBack";
import AppText from "../../component/AppText";
import { useDispatch} from 'react-redux'
import { RadioButton, Checkbox } from "react-native-paper";
import { Searchbar } from "react-native-paper";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import useCategories from "../../../utils/categories";
import AppButton from "../../component/AppButton";
import { setCurrentRegisterProperties } from "../../store/features/registerSlice";
import { CHOOSE_DCOUMENT } from "../../navigation/routes";
const { height, width } = Dimensions.get("screen");
export default function ChooseCategories({navigation,}) {
  const [gender, setGender] = useState("");
  const { data: categories } = useCategories();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch()
  const [checked, setChecked] = useState({});
  const onChangeSearch = (query) => {
    // Update the state
    setQuery(query);
  };
  const filterCategories = () => {
    // If the query is empty, return the original array
    if (query === "") {
      return categories?.data;
    }
    // Otherwise, return the filtered array
    return categories?.data.filter((item) => {
      // Check if the name attribute contains the query
      return item?.attributes?.name.toLowerCase().includes(query.toLowerCase());
    });
  };

  const toggleChecked = (id) => {
    // Copy the checked object
    const newChecked = { ...checked };
    // Toggle the value at the given id
    newChecked[id] = !newChecked[id];
    // Update the state
    setChecked(newChecked);
  };
  const getSelectedIds = () => {
    // Get an array of the keys of the checked object
    const keys = Object.keys(checked);
    // Filter the keys that have a true value
    const selectedIds = keys.filter((key) => checked[key]);
    // Return the array of the selected item ids
    return selectedIds;
  };
const handlePressConfirm=()=>{
  const  objects = getSelectedIds().map(id => ({id: id}));
  dispatch(setCurrentRegisterProperties({
    categories:{
      connect: objects,
  }}))
navigation.navigate(CHOOSE_DCOUMENT)
console.log("checked",getSelectedIds())
}
return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <StatusBar backgroundColor={Colors.primaryColor} />
      <ArrowBack />
      <View style={styles.container}>
        
        <View showsVerticalScrollIndicator={false} style={styles.container2}>
          <AppText
            text={"What services do you intend to provide?"}
            centered={false}
            style={styles.text1}
          />
          <AppText
            //   centered={false}

            text={
              "To receieve customer orders,please write you speciality in the box below"
            }
            style={styles.text2}
          />
          {
            getSelectedIds()?.length > 0 &&
          <View style={styles.numberContainer}>
            <AppText
              text={`the number of selected specialties`}
              style={{fontSize:RFPercentage(1.9),color:Colors.blackColor}}
              />
            <AppText
              text={getSelectedIds()?.length }
              style={{fontSize:RFPercentage(1.9),color:Colors.primaryColor}}
              />
          </View>
            }
          <View style={styles.searchContainer}>
            <Searchbar
              style={styles.searchinput}
              // placeholder="Search"

              onChangeText={onChangeSearch}
              value={query}
            />
          </View>
          <AppText
            text={"Choose the most relevant specialties from the list "}
            style={styles.text3}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <FlatList
              data={filterCategories()}
              scrollEnabled={false}
              renderItem={({ item }) => {
                return (
                  <ItemSelected
                    setGender={setGender}
                    checked={checked[item?.id] ? "checked" : "unchecked"}
                    // Pass a function to handle the user's click
                    onPress={() => toggleChecked(item?.id)}
                    text={item?.attributes?.name}
                  />
                );
              }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={<View style={{ height: 10 }} />}
            />
          </ScrollView>
          {
            getSelectedIds()?.length > 0 &&
          <AppButton title={"Confirm"} onPress={()=>handlePressConfirm()} />
        }
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  container2: {
    flex: 1,
    paddingHorizontal: 0,
    gap:10
  },
  text1: {
    fontSize: RFPercentage(2.2),
    color: Colors.primaryColor,
  },
  text2: {
    fontSize: RFPercentage(1.6),
    width: width * 1,
    maxWidth: width * 1,
    color:Colors.blackColor,
    paddingHorizontal: 50,
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    width: width * 1.5,
    // justifyContent:'center',
    flexDirection: "row",
  },
  text3:{
    backgroundColor:Colors.grayColor,
    fontSize: RFPercentage(1.6),
    width: width * 1,
    maxWidth: width * 1,
    color:Colors.blackColor,
    paddingHorizontal: 30,
    paddingVertical:10
  },
  searchinput: {
    borderWidth: 1,
    padding: 1,
    fontSize: 1,
    borderColor: Colors.grayColor,
    width: width * 0.9,
    backgroundColor: "white",
    height: 50, // Decrease the height to 40 pixels
    // paddingHorizontal: 10, // Decrease the horizontal padding to 10 pixels
    // paddingVertical: 5, // Increase the vertical padding to 5 pixels
    borderRadius: 10, // Add some border radius
    margin: 10, // Add some margin
    elevation: 5, // Add some elevation
  },
  icon: {
    backgroundColor: Colors.blueColor,
    padding: 13,
    borderRadius: 10,
    borderTopLeftRadius: 1,
    borderBottomLeftRadius: 1,
  },
  numberContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap:10,
    // width: width * 1,
    // paddingVertical:10,
    backgroundColor:'white'
  },
});
const ItemSelected = ({ setGender, text, onPress, checked }) => {
  return (
    <TouchableOpacity         onPress={onPress}
    style={Genderstyles.container}>
        <AppText text={text} style={{color:Colors.blackColor,fontSize:RFPercentage(2)}}/>
      <Checkbox
        style={Genderstyles.radioItem} /* Apply style here */
        color={Colors.primaryColor}
        status={checked}
      />
    </TouchableOpacity>
  );
};
const Genderstyles = StyleSheet.create({
  container: {
    marginTop: 16,
    justifyContent:"space-between"
,display:'flex',
    // flex:1,
    flexDirection: "row",
    // backgroundColor:'red'
  },
  radioItem: {
    flexDirection: "row-reverse",
    fontSize: 25,
    justifyContent:"space-between"
    /* Reverse radio and label within each item */
  },
});
