// categorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: { orders: [] , completedOrders:0 },
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
    clearCurrentOrder: (state) => {
      state.currentOrderData = {};
    },
  },
 
});

export const { setOrders,setCurrentOrderProperties,clearCurrentOrder,setCompleteOrders } = orderSlice.actions;
export default orderSlice.reducer;
