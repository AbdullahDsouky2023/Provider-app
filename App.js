import RootNavigator from "./app/navigation";
import { I18nManager, LogBox } from "react-native";
import { Provider } from "react-redux";
import store from "./app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";


export const client = new QueryClient()
const App = () => {
  useEffect(()=>{

    I18nManager.forceRTL(true);
  },[])
  return (
    <Provider store={store}>
         <QueryClientProvider client={client}>

      <RootNavigator />
      </QueryClientProvider>

    </Provider>
  );
};

export default App;