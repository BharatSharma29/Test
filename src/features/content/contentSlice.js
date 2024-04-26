import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  contentList: [],
  isFilter: false,
  filterStr: "",
  limit: 9,
};

export const getContentList = createAsyncThunk("content/getContentList", () => {
  return fetch("https://test.create.diagnal.com/data/page1.json")
    .then((res) => res.json())
    .catch((err) => console.log(err));
});

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setFilter: (state) => {
      state.isFilter = true;
    },
    clearFilter: (state) => {
      state.isFilter = false;
    },
    setFilterStr: (state, action) => {
      state.filterStr = action.payload;
    },
    increamentLimit: (state) => {
      state.limit += 9;
    },
    defaultLimit: (state) => {
      state.limit = 9;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContentList.pending, (state) => {
        console.log("pending = " + state);
      })
      .addCase(getContentList.fulfilled, (state, action) => {
        console.log(action.payload.page["content-items"].content);
        state.contentList = action.payload.page["content-items"].content;
      })
      .addCase(getContentList.rejected, (state, action) => {
        console.log("rejected = " + action);
      });
  },
});

export const {
  setFilter,
  clearFilter,
  setFilterStr,
  increamentLimit,
  defaultLimit,
} = contentSlice.actions;

export default contentSlice.reducer;
