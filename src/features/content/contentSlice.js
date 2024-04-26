import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  contentList: [],
  isFilter: false,
  filterStr: "",
  limit: 9,
  pageNo: 1,
};

export const getContentList = createAsyncThunk("content/getContentList", () => {
  return fetch(
    `https://test.create.diagnal.com/data/page${initialState.pageNo}.json`
  )
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
    increamentPage: (state) => {
      if (state.pageNo < 3) state.pageNo += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContentList.pending, (state) => {
        state.contentList = [...state.contentList];
      })
      .addCase(getContentList.fulfilled, (state, action) => {
        console.log("content-list = " + state.contentList);
        console.log(
          "length = " + action.payload.page["content-items"].content.length
        );
        state.contentList = [
          ...state.contentList,
          ...action.payload.page["content-items"].content,
        ];
        console.log("content-list = " + state.contentList);
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
  increamentPage,
} = contentSlice.actions;

export default contentSlice.reducer;
