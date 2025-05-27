import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  health: 100,
  inventory: [],
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    addItemToInventory: (state, action) => {
      state.inventory.push(action.payload);
    },
  },
});

export const { addItemToInventory } = playerSlice.actions;
export default playerSlice.reducer;