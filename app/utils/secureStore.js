import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

export async function setItem(key, value) {
  try {
    const jsonValue = JSON.stringify(value);
    await SecureStore.setItemAsync(key, jsonValue);
  } catch (error) {
    console.error('Error while setting item:', error);
  }
}


export async function getItem(key) {
  try {
    const jsonValue = await SecureStore.getItemAsync(key);
    if (jsonValue) {
      return JSON.parse(jsonValue);
    }
    return null; // Handle the case where the item does not exist
  } catch (error) {
    console.error('Error while getting item:', error);
    return null;
  }
}

export const getUserData = async () => {
  try {
    const userDataString = await AsyncStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString); // Parse the JSON string to get the user data
      Alert.alert(' user Found')
      return userData
    } else {
      Alert.alert('No user Found')
      return null;

      // No user data found in AsyncStorage
    }
  } catch (error) {
    // Handle errors
  }
};
