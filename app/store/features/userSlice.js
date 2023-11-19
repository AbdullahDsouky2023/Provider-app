// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, // Store user data here
    loading: false,
    userData:null,
    error: null,
    userStreamData:null
  },
  reducers: {
    userRegisterStart: (state) => {
      state.loading = true;
    },
    userRegisterSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    userRegisterFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUserData:(state, action) => {
      state.userData = action.payload;
      state.loading = false;
      state.error = null;
      state.user=state.user
    },
    setUserStreamData:(state, action) => {
      state.userData = state.userData;
      state.loading = false;
      state.error = null;
      state.user=state.user
      state.userStreamData = action.payload._j
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userRegisterSuccess, async (state, action) => {
      // This is an asynchronous side effect
      const userDate = await getUserInformation(auth.currentUser.phoneNumber);
      state.user = userDate;

    });
  }
  
    

});

export const { userRegisterStart, userRegisterSuccess,setUserData, setUserStreamData,userRegisterFailure } = userSlice.actions;

export default userSlice.reducer;
