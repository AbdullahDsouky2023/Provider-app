import { configureStore } from "@reduxjs/toolkit";
import  userReducer from './features/userSlice'
import  regionReducer from './features/regionSlice'
import  servicesReducer from './features/serviceSlice'
import  ordersRedcuer from './features/ordersSlice'
const store = configureStore({
    reducer:{
        user:userReducer,
        regions:regionReducer,
        services:servicesReducer,
        orders:ordersRedcuer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
      }),

})
export default store