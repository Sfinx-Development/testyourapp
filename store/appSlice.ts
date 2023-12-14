import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addAppToDb,
  addTesterToAppToDb,
  getAllAppsFromDb,
  getAppsImTestingFromDb,
} from "../api/app";
import { App, TesterToApp } from "../types";

interface AppState {
  app: App | null;
  availableApps: App[];
  appsImTesting: App[];
  error: string | null;
}

export const initialState: AppState = {
  app: null,
  availableApps: [],
  appsImTesting: [],
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

export const getAppsImTestingAsync = createAsyncThunk<
  App[],
  string,
  { rejectValue: string }
>("app/getAppsImTesting", async (accountId, thunkAPI) => {
  try {
    const appsImTesting = await getAppsImTestingFromDb(accountId);
    if (appsImTesting) {
      return appsImTesting;
    } else {
      return thunkAPI.rejectWithValue("failed to get apps im testing");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addTesterToAppAsync = createAsyncThunk<
  TesterToApp,
  TesterToApp,
  { rejectValue: string }
>("app/addApp", async (testerToApp, thunkAPI) => {
  try {
    const addedTester = await addTesterToAppToDb(testerToApp);
    if (addedTester) {
      return addedTester;
    } else {
      return thunkAPI.rejectWithValue("failed to add tester to app");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getAllAppsAsync = createAsyncThunk<
  App[],
  void,
  { rejectValue: string }
>("app/getAllApps", async (_, thunkAPI) => {
  try {
    const allApps = await getAllAppsFromDb();
    return allApps;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

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
      })
      .addCase(getAllAppsAsync.fulfilled, (state, action) => {
        state.availableApps = action.payload;
        state.error = null;
      })
      .addCase(getAllAppsAsync.rejected, (state, action) => {
        state.availableApps = [];
        state.error = "Something went wrong with getting apps you are testing.";
      })
      .addCase(getAppsImTestingAsync.fulfilled, (state, action) => {
        state.appsImTesting = action.payload;
        state.error = null;
      })
      .addCase(getAppsImTestingAsync.rejected, (state, action) => {
        state.appsImTesting = [];
        state.error = "Something went wrong with getting apps you are testing.";
      });
  },
});

export const appReducer = appSlice.reducer;
