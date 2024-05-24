import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const getSettingSlice = createSlice({
  name: "getSetting",
  initialState,
  reducers: {
    setSetting: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSetting } = getSettingSlice.actions;

export default getSettingSlice.reducer;
