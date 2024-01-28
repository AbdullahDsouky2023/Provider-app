import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ArrowBack from '../../component/ArrowBack'

export default function ProviderLocationScreen() {
  const apiData = {
    coordinate: {
      latitude: 29.1112971,
      longitude: 31.0381991,
    },
  };

  return (
    <>
    
      <View style={{backgroundColor:'transparent',marginBottom:0,top:0,position:'relative'}}>

      <ArrowBack/>
      </View>
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: apiData.coordinate.latitude,
          longitude: apiData.coordinate.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={apiData.coordinate}
          title="This is the location from the api"
          description="This is a marker example"
          />
      </MapView>
    </View>
          </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 0,
    backgroundColor: "red",
    position:'relative'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
