import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "userConnections",
  initialState: [],
  reducers: {
    addConnection: (state, action) => {
      return Array.isArray(action.payload) ? action.payload : [action.payload];
    },
    clearConnections: () => {
      return [];
    },
  },
});

export const { addConnection, clearConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
