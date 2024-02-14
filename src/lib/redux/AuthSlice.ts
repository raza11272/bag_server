
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};


export const authSlice = createSlice({
  name: "authuser",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.me
    },
  
  },
});

// Action creators are generated for each case reducer function
export const {setUser} = authSlice.actions;

export default authSlice.reducer;
