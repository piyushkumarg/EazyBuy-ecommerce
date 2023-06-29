import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchProductsBySearchQuery,
} from "./searchResultAPI";

const initialState = {
  searchResults: [],
  status: "idle",
};

export const fetchProductsBySearchQueryAsync = createAsyncThunk(
  "search/fetchProductsBySearchQuery",
  async (searchQuery) => {
    // console.log(searchQuery);
    const response = await fetchProductsBySearchQuery(searchQuery);

    return response.data;
  }
);

export const searchResultSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsBySearchQueryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsBySearchQueryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.searchResults = action.payload;
      });
  },
});
export const selectSearchResult = (state) => state.search.searchResults;
export const selectSearchResultStatus = (state) => state.search.status;

export default searchResultSlice.reducer;
