import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchSignedInUserOrders,
  updateUser,
  fetchSignedInUser,
} from "./userAPI";

const initialState = {
  status: "idle",
  userInfo: {}, // this info will be used in case of detailed user info, while auth will
  // only be used for SignedInUser id etc checks
};

export const fetchSignedInUserOrderAsync = createAsyncThunk(
  "user/fetchSignedInUserOrders",
  async () => {
    const response = await fetchSignedInUserOrders();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchSignedInUserAsync = createAsyncThunk(
  "user/fetchSignedInUser",
  async () => {
    const response = await fetchSignedInUser();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk("user/updateUser", async (update) => {
  // this is name mistake
  const response = await updateUser(update);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignedInUserOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSignedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // this info can be different or more from Signed-in User info
        state.userInfo.orders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchSignedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSignedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // this info can be different or more from Signed-in User info
        state.userInfo = action.payload;
      });
  },
});

// TODO: change orders and address to be independent of user;
export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserStatus = (state) => state.user.status;

export default userSlice.reducer;
