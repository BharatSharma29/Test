import { createSlice } from "@reduxjs/toolkit";

/** State Intialise */
const initialState = {
  contentList: [],
  isFilter: false,
  filterStr: "",
};

/** Slice created with reducers */
const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContentList: (state, action) => {
      state.contentList = action.payload;
    },
    setFilter: (state) => {
      state.isFilter = true;
    },
    clearFilter: (state) => {
      state.isFilter = false;
    },
    setFilterStr: (state, action) => {
      state.filterStr = action.payload;
    },
  },
});

export const { setContentList, setFilter, clearFilter, setFilterStr } =
  contentSlice.actions;

export default contentSlice.reducer;
