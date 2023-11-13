import {

  View,

  Dimensions,
  StyleSheet,
} from "react-native";

import { Colors } from "../../constant/styles";
import AppText from "../../component/AppText";

import { CheckBox, Icon } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");


export default function SelectLocationItem({selectedLocation,item,setSelectedLocation}) {
    if(!item) return;
  return (
    <TouchableOpacity onPress={() =>{
        console.log("ite mseleceted",item)
        setSelectedLocation(item)
                }}>
    {/* currentLocation primary */}
    <View style={[styles.currentLocation,{
      backgroundColor:selectedLocation === item ? Colors.primaryColor : Colors.whiteColor
      ,borderWidth:selectedLocation === item ? 0 :1
    }]}>
      <CheckBox
      containerStyle={{backgroundColor:"transparent"}}
        center
        checkedIcon={
          <Icon
            name="radio-button-checked"
            type="material"
            color={Colors.white}
            size={25}
            iconStyle={{ marginRight: 10,color:Colors.whiteColor }}
          />
        }
        uncheckedIcon={
          <Icon
            name="radio-button-unchecked"
            type="material"
            color="grey"
            size={25}
            iconStyle={{ marginRight: 10,color:Colors.blackColor }}
          />
        }
        checked={item === selectedLocation}
      />
      <AppText
        text={item}
        centered={false}
        style={{ color:selectedLocation === item ? Colors.whiteColor: Colors.blackColor, marginBottom: 10 }}
      />
    </View>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    currentLocation: {
      height: "auto",
      width: width * 0.95,
      borderRadius: 10,
      backgroundColor: Colors.primaryColor,
      display: "flex",
      alignContent: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      marginVertical:10,
      padding: 10,
    },
    headerContainer:{
      display: "flex",
      alignContent: "center",
      width:width*0.94,
      marginTop:10,
      justifyContent: "space-between",
      flexDirection: "row",
    }})

    // export default SelectLocationItem