import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addAppToDb } from "../api/app";
import { App } from "../types";

interface AppState {
  app: App | null;
  error: string | null;
}

export const initialState: AppState = {
  app: null,
  error: null,
};

export const addAppAsync = createAsyncThunk<App, App, { rejectValue: string }>(
  "app/addApp",
  async (app, thunkAPI) => {
    try {
      const addedApp = await addAppToDb(app);
      if (addedApp) {
        return addedApp;
      } else {
        return thunkAPI.rejectWithValue("failed to add app");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const deleteAppAsync = createAsyncThunk<
//   User,
//   UserCreate,
//   { rejectValue: string }
// >("user/addUser", async (user, thunkAPI) => {
//   try {
//     const addedUser = await addUserToDB(user);
//     if (addedUser) {
//       return addedUser;
//     } else {
//       return thunkAPI.rejectWithValue("failed to add user");
//     }
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAppAsync.fulfilled, (state, action) => {
        state.app = action.payload;
        state.error = null;
      })
      .addCase(addAppAsync.rejected, (state, action) => {
        state.error = "Something went wrong with uploading the app.";
      });
  },
});

export const appReducer = appSlice.reducer;
