import { createSlice } from "@reduxjs/toolkit";

export const countrySlice = createSlice({
  name: "country",
  initialState: {
    value: {},
  },
  reducers: {
    getCountry: (state) => {
      state.value;
    },
    setCountry: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCountry } = countrySlice.actions;

export default countrySlice.reducer;
