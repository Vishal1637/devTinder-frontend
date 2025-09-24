import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    setRequests: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      return state.filter((r) => r._id !== action.payload);
    },
  },
});

export const { setRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
