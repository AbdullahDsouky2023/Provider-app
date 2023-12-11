import "react-native-gesture-handler";

import RootNavigator from "./app/navigation";
import { I18nManager, LogBox } from "react-native";
import { Provider } from "react-redux";
import store from "./app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppState } from 'react-native';
import * as Updates from 'expo-updates';
import { Platform } from "react-native";
 export const client = new QueryClient();
const App = () => {
  useEffect(()=>{
    reload()
    I18nManager.forceRTL(true);
    I18nManager.allowRTL(true);

    
  },[])

  const reload = async () => {
    try {
      if (!I18nManager.isRTL) {
        // Log the current RTL state
        console.log('Current RTL state:', I18nManager.isRTL);
        
        // Enable RTL layout
        I18nManager.forceRTL(true);
        I18nManager.allowRTL(true);
  
        // Reload the app to apply RTL layout
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.error('Failed to reload the app:', error);
    }
  };

  return ( 
    <GestureHandlerRootView style={{flex:1}}>
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <RootNavigator />
        </QueryClientProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
