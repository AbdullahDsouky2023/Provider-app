import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

const reverseGeoCode = async (location) => {
  try {
    const parseLocation = JSON.parse(location);
    if (parseLocation?.longitude) {
      const reverGeoCodeAdress = await Location.reverseGeocodeAsync({
        longitude: parseLocation.longitude,
        latitude: parseLocation.latitude,
      });
      return reverGeoCodeAdress[0];
    }
  } catch (error) {
    console.log("erre", error);
  }
};
export const getLocationFromStorage = async () => {
  try {
    const location = await AsyncStorage.getItem("userLocation");
    const Readable = await reverseGeoCode(location);
    const res = `${Readable?.city} - ${Readable?.subregion} - ${Readable?.country}`;
    if (Readable) return res;
  } catch (error) {
    console.error("Error retrieving location from storage:", error);
  }

  return null; // Return null if the location is not found or an error occurs.
};
// Assuming you have a utility file with AsyncStorage functions

export const getManualLocations = async () => {
  try {
    const storedLocations = await AsyncStorage.getItem("manualLocations");
    return storedLocations ? JSON.parse(storedLocations) : [];
  } catch (error) {
    console.error("Error getting manual locations:", error);
    return [];
  }
};

export const updateManualLocations = async (updatedLocations) => {
  try {
    await AsyncStorage.setItem(
      "manualLocations",
      JSON.stringify(updatedLocations)
    );
  } catch (error) {
    console.error("Error updating manual locations:", error);
  }
};

export const deleteLocation = async (locationToDelete) => {
  try {
    const currentLocations = await getManualLocations();
    const updatedLocations = currentLocations.filter(
      (location) => location !== locationToDelete
    );
    await updateManualLocations(updatedLocations);
  } catch (error) {
    console.error("Error deleting location:", error);
  }
};

// Example usage:
