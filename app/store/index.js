import { configureStore } from "@reduxjs/toolkit";
import  userReducer from './features/userSlice'
import  categoryReducer from './features/categorySlice'
import  servicesReducer from './features/serviceSlice'
import  ordersRedcuer from './features/ordersSlice'
const store = configureStore({
    reducer:{
        user:userReducer,
        categories:categoryReducer,
        services:servicesReducer,
        orders:ordersRedcuer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
      }),

})
export default store