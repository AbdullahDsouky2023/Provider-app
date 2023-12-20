import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constant/styles";
import AppText from "../AppText";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons'; 
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Share } from 'react-native';

const { width ,height}  = Dimensions.get('screen')

export default function SocalItemSetting({item }) {
    const { icon, name, desc } = item
    const navigation = useNavigation()

    const onShare = async () => {
      try {
        const result = await Share.share({
          message: 'Check out this awesome app!',
          // You can also add a URL to your app here
        });
        console.log("the sare mod",Share); // Check if Share is defined

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        console.log(error.message);
      }
    };

     
     const handlePress=()=>{
      if(icon === "share"){
        onShare()
      }else {

        navigation.navigate(icon)
      }
    }
    return (
      <TouchableWithoutFeedback  onPress={()=>handlePress()}>
       
        <View  style={[styles.item,{
          backgroundColor:item.BackgroundColor
        }]}>
        {/* <Entypo name={item?.icon} size={32} color="white" /> */}
        <FontAwesome name={item?.icon} size={32} color="white" />

        </View>
      </TouchableWithoutFeedback>)
}

const styles = StyleSheet.create({
  header: {
    color: Colors.primaryColor,
    fontSize: 18,
  },
  textHeader: {
    color: Colors.blackColor,
    fontSize: 16,
    // alignSelf:"left"
  },
  headerDescription: {
    color: Colors.grayColor,
    fontSize: 16,
  },
  item: {
    height:70,
    borderRadius:10,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: -10,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 1.41,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
    width:width*0.7,
    paddingVertical:14,
    gap: 5,
  },
  itemHeader: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width:width*0.4,
    // height:120,
    backgroundColor:Colors.piege,
    padding:10,
    borderRadius:10,
    margin:20,
    justifyContent:'center',
    gap: 15,
  },
});
