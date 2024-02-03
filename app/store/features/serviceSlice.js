// categorySlice.js
import { createSlice } from "@reduxjs/toolkit";


const serviceSlice = createSlice({
  name: "services",
  initialState: { services: [] },
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
    },
    // Add other reducers as needed
  },
  
});

export const { setServices } = serviceSlice.actions;
export default serviceSlice.reducer;
