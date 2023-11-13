import { getFirestore, initializeFirestore} from 'firebase/firestore';
import {initializeApp} from 'firebase/app';
import { initializeAuth ,getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

//abdodsouky edge
// export const firebaseConfig = {
//     apiKey: "AIzaSyCkFySoGyh-fH1ir8OZxbnmO33VEWg10Dk",
//     authDomain: "home-services-user-b9504.firebaseapp.com",
//     projectId: "home-services-user-b9504",
//     storageBucket: "home-services-user-b9504.appspot.com",
//     messagingSenderId: "886597742556",
//     appId: "1:886597742556:web:869a9f71557314fd722919"
//   };
//Chrome
// export const firebaseConfig = {
//   apiKey: "AIzaSyCfFPu1VIgGhgRgzvcfbAzipgd4_MYfkAs",
//   authDomain: "home-service2.firebaseapp.com",
//   projectId: "home-service2",
//   storageBucket: "home-service2.appspot.com",
//   messagingSenderId: "197872272379",
//   appId: "1:197872272379:web:ef909bbd7ebfe41110415e"
// };
// // second account chrome
// export const firebaseConfig = {
//   apiKey: "AIzaSyBmuyhQV1uVVliQwffXfsgE7L5iLOLsEzw",
//   authDomain: "homeservices3-776d1.firebaseapp.com",
//   projectId: "homeservices3-776d1",
//   storageBucket: "homeservices3-776d1.appspot.com",
//   messagingSenderId: "584760648465",
//   appId: "1:584760648465:web:2c6cc2959349ffb38ae2b0"
// };
// 4
export const firebaseConfig = {
  apiKey: "AIzaSyCTsMfzJT_N9vbsCp4YceXtCm55OGrmYJU",
  authDomain: "homeservice4-d79c9.firebaseapp.com",
  projectId: "homeservice4-d79c9",
  storageBucket: "homeservice4-d79c9.appspot.com",
  messagingSenderId: "45934948539",
  appId: "1:45934948539:web:95294fb0d4c574b3e8f99e"
};

// export const firebaseConfig = {
//   apiKey: "AIzaSyCSC--mzzrgZCTKQ7FK0t_UJyoccZyyp_g",
//   authDomain: "homeservices4-2746c.firebaseapp.com",
//   projectId: "homeservices4-2746c",
//   storageBucket: "homeservices4-2746c.appspot.com",
//   messagingSenderId: "334834559529",
//   appId: "1:334834559529:web:c60a68127fafe99f63ca38"
// };

//nab1
// export const firebaseConfig = {
//   apiKey: "AIzaSyDt802msFXUqxFMhpouo7Vb5Z940nZOObc",
//   authDomain: "tasktyclone.firebaseapp.com",
//   projectId: "tasktyclone",
//   storageBucket: "tasktyclone.appspot.com",
//   messagingSenderId: "485175115309",
//   appId: "1:485175115309:web:a0c51ee9b02cbc3502c2a4"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
 export  const db = getFirestore(app);

  

export default app;
