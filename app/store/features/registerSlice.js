// categorySlice.js
import { createSlice } from "@reduxjs/toolkit";

const registerSlice
 = createSlice({
  name: "RegisterData",
  initialState: { Register: [] , completedOrders:0 ,currentChatChannel:"",currentRegisterDate:{}},
  reducers: {
    setRegister: (state, action) => {
      state.Register = action.payload;
    },
    setCurrentRegisterProperties: (state, action) => {
      
      const propertiesToUpdate = action.payload;
      state.currentRegisterDate = { ...state.currentRegisterDate, ...propertiesToUpdate };
    },
    setcurrentChatChannel: (state, action) => {
      state.currentChatChannel = action.payload
    },
    clearCurrentRegister: (state) => {
      state.currentRegisterDate = {};
    },
  },
 
});

export const { setRegister,setCurrentRegisterProperties,clearCurrentRegister,setcurrentChatChannel } = registerSlice
.actions;
export default registerSlice
.reducer;
