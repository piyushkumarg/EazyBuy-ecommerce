import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSignedInUserOrders } from "./userAPI";

const initialState = {
  userOrders: [],
  status: "idle",
};

export const fetchSignedInUserOrderAsync = createAsyncThunk(
  "user/fetchSignedInUser",
  async (id) => {
    const response = await fetchSignedInUserOrders(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignedInUserOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSignedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // this info can be different or more from Signed-in User info
        state.userOrders = action.payload;
      });
  },
});

export const selectUserOrders = (state) => state.user.userOrders;

export const { increment } = userSlice.actions;

export default userSlice.reducer;
