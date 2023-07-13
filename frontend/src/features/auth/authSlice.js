import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, signinUser, signOut, checkAuth } from "./authAPI";

const initialState = {
  signedInUserToken: null, // this should only contain user identity => 'id'/'role'
  status: "idle",
  error: null,
  userChecked: false,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const signinUserAsync = createAsyncThunk(
  "user/signinUser",
  async (signinInfo, { rejectWithValue }) => {
    try {
      const response = await signinUser(signinInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const checkAuthAsync = createAsyncThunk("user/checkAuth", async () => {
  try {
    const response = await checkAuth();
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const signOutAsync = createAsyncThunk(
  "user/signOut",
  async (signinInfo) => {
    const response = await signOut(signinInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.signedInUserToken = action.payload;
      })
      .addCase(signinUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signinUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.signedInUserToken = action.payload;
      })
      .addCase(signinUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.signedInUserToken = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.signedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked = true;
      });
  },
});

export const selectSignedInUser = (state) => state.auth.signedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;

export default authSlice.reducer;
