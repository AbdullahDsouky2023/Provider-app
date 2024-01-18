import "react-native-gesture-handler";

import RootNavigator from "./app/navigation";
import { Dimensions, I18nManager, LogBox } from "react-native";
import { Provider } from "react-redux";
import store from "./app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppState } from 'react-native';
import AnimatedSplash from "react-native-animated-splash-screen";

import * as Updates from 'expo-updates';
const {height , width}= Dimensions.get('screen')
import { Colors } from "./app/constant/styles";
 export const client = new QueryClient();
const App = () => {
  const [loading, setLoading] = useState(false);
   useEffect(()=>{
    reload()
    I18nManager.forceRTL(true);
    I18nManager.allowRTL(true);
    setTimeout(() => {
      setLoading(true);
    }, 500);
    
  },[])

  const reload = async () => {
    try {
      if (!I18nManager.isRTL) {
        // Log the current RTL state
        
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
        <AnimatedSplash
            // translucent={true}
            isLoaded={loading}
            logoImage={require("./app/assets/images/splash2.png")}
            backgroundColor={Colors.whiteColor}
            logoHeight={height*1.2}
            logoWidth={width*1.2}
          >
            <RootNavigator />
          </AnimatedSplash>
        </QueryClientProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
