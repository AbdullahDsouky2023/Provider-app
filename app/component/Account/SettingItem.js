import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constant/styles";
import AppText from "../AppText";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";



export default function SettingItem({item }) {
    const { icon, name, desc } = item
    const navigation = useNavigation()
    return (
      <TouchableWithoutFeedback style={styles.item} onPress={()=>navigation.navigate(icon)}>
        <View style={styles.itemHeader}>
          <SimpleLineIcons name={icon} size={24} color={Colors.primaryColor} />
          <View style={{
            display:'flex',
            justifyContent:'center'
          }}>
            <AppText text={name} centered={false} style={styles.textHeader} />
            {desc && <AppText
              text={desc}
              centered={false}
              style={styles.headerDescription}
            />}
          </View>
        </View>
        <MaterialIcons name="arrow-back-ios" size={24} color={Colors.grayColor} />
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
    backgroundColor: Colors.whiteColor,
    height: 70,
    borderRadius: 12,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // width: width * 1,
  },
  itemHeader: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    // justifyContent:'center',
    gap: 15,
  },
});
