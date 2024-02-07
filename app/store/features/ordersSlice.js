// categorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: { orders: [] , completedOrders:0 ,currentChatChannel:"",currentOffers:0},
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setCompleteOrders: (state, action) => {
      state.completedOrders = action.payload;
    },
    setCurrentOrderProperties: (state, action) => {
      
      const propertiesToUpdate = action.payload;
      state.currentOrderData = { ...state.currentOrderData, ...propertiesToUpdate };
    },
    setcurrentChatChannel: (state, action) => {
      state.currentChatChannel = action.payload
    },
    setProviderCurrentOffers: (state, action) => {
      state.currentOffers = action.payload
    },
    clearCurrentOrder: (state) => {
      state.currentOrderData = {};
    },
  },
 
});

export const { setOrders,setCurrentOrderProperties,clearCurrentOrder,setProviderCurrentOffers,setCompleteOrders ,setcurrentChatChannel} = orderSlice.actions;
export default orderSlice.reducer;
