import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TCursorControl = {
  isBig: boolean;
  defaultColor: boolean;
};

const initialState: TCursorControl = {
  isBig: false,
  defaultColor: true,
};

const cursorSlice = createSlice({
  name: "cursor",
  initialState,
  reducers: {
    cursorControl: (state, action) => {
      state.defaultColor =
        typeof action?.payload?.color === "boolean"
          ? action?.payload?.color
          : true;
      state.isBig =
        typeof action?.payload?.size === "boolean"
          ? action?.payload?.size
          : false;
    },
  },
});

export default cursorSlice.reducer;

export const { cursorControl } = cursorSlice.actions;

export const selectCursor = (state: RootState) => state.cursor;
