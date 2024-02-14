import { createSlice } from "@reduxjs/toolkit";

export interface navbarMenu {
  open: boolean;
}

const initialState: navbarMenu = {
  open: true,
};

export const navbarSlice = createSlice({
  name: "open",
  initialState,
  reducers: {
    controllNav: (state) => {
      state.open = !state.open;
    },
    setOpen: (state) => {
      state.open = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { controllNav, setOpen } = navbarSlice.actions;

export default navbarSlice.reducer;
