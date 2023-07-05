import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductsBySearchQuery } from "./searchResultAPI";

const initialState = {
  searchResults: [],
  status: "idle",
  searchTotalItems: 0,
};

export const fetchProductsBySearchQueryAsync = createAsyncThunk(
  "search/fetchProductsBySearchQuery",
  async ({ searchQuery, sort, pagination }) => {
    const response = await fetchProductsBySearchQuery(
      searchQuery,
      sort,
      pagination
    );

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
        state.searchResults = action.payload.searchResults;
        state.searchTotalItems = action.payload.searchTotalItems;
      });
  },
});

export const selectSearchResult = (state) => state.search.searchResults;
export const selectSearchResultStatus = (state) => state.search.status;
export const selectSearchTotalItems = (state) => state.search.searchTotalItems;

export default searchResultSlice.reducer;
