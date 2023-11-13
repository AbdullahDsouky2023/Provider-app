import { View, Text ,Image,StyleSheet} from 'react-native'
import React from 'react'

import AppText from '../AppText'
import { Colors } from '../../constant/styles'
import { TouchableWithoutFeedback } from 'react-native';
import PriceTextComponent from '../PriceTextComponent';
export default function AppCard({image,name,price,onPress}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container} >

      <View style={styles.card}>
        <Image
          style={styles.cardImage}
          source={{
            uri: image,
          }}
        />
      </View>
      <View>
        <AppText
          text={name}
          centered={false}
          style={styles.serviceName}
        />
       <PriceTextComponent price={price}/>

      </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:10
        
    },
  card: {
    height: 120,
    width: 170,
    backgroundColor: "#FCEAEA",
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
  },
  cardImage: {
    height: "100%",
    width: "100%",
  },
  serviceName: {
    fontSize: 12,
    color: Colors.blackColor,
    maxWidth: 170,
  },
  servicePrice: {
    color: Colors.primaryColor,
    fontSize: 16,
  },
});
