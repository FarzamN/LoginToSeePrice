import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const getPackagesSlice = createSlice({
  name: "getPackages",
  initialState,
  reducers: {
    setGetPackages: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setGetPackages } = getPackagesSlice.actions;

export default getPackagesSlice.reducer;
