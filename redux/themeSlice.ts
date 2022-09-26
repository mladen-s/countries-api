import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: undefined,
  },
  reducers: {
    getDark: (state) => {
      state.value;
    },
    setDark: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setDark } = themeSlice.actions;

export default themeSlice.reducer;
