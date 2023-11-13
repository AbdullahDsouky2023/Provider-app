// categorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: { orders: [] , currentOrderData:{} },
  reducers: {
    setOrders: (state, action) => {
      console.log('====================================');
      console.log("Orders Was Called and cahnged");
      console.log('====================================');
      state.orders = action.payload;
    },
    setCurrentOrderProperties: (state, action) => {
      
      const propertiesToUpdate = action.payload;
      state.currentOrderData = { ...state.currentOrderData, ...propertiesToUpdate };
      console.log("setCurrentOrderProperties Was Called and cahnged",state.currentOrderData);
    },
    clearCurrentOrder: (state) => {
      state.currentOrderData = {};
    },
  },
 
});

export const { setOrders,setCurrentOrderProperties,clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
