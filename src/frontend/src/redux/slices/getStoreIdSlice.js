import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const getStoreIdSlice = createSlice({
  name: "getStore",
  initialState,
  reducers: {
    setStoreID: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setStoreID } = getStoreIdSlice.actions;

export default getStoreIdSlice.reducer;
