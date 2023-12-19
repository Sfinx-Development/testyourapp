import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addAppToDb,
  addTesterToAppToDb,
  confirmTesterToAppDb,
  getAllAppsFromDb,
  getAppByIdFromDb,
  getAppsImTestingFromDb,
  getMyAppsFromDb,
  getUnconfirmedTesters,
} from "../api/app";
import { Account, App, TesterToApp } from "../types";

interface AppState {
  app: App | null;
  availableApps: App[];
  appsImTesting: App[];
  uncofirmedTesters: {
    testerToAppId: string;
    appId: string;
    appName: string;
    username: string;
    playStoreMail: string;
    appStoreMail: string;
  }[];
  myApps: App[];
  error: string | null;
}

export const initialState: AppState = {
  app: null,
  availableApps: [],
  appsImTesting: [],
  uncofirmedTesters: [],
  myApps: [],
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

export const confirmTesterToAppAsync = createAsyncThunk<
  TesterToApp,
  string,
  { rejectValue: string }
>("app/confirmTesterToApp", async (testerToAppId, thunkAPI) => {
  try {
    const confirmedTesterToApp = await confirmTesterToAppDb(testerToAppId);
    if (confirmedTesterToApp) {
      return confirmedTesterToApp;
    } else {
      return thunkAPI.rejectWithValue("failed to add app");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getUnconfirmedTestersAsync = createAsyncThunk<
  {
    testerToAppId: string;
    appId: string;
    appName: string;
    testerId: string;
    username: string;
    playStoreMail: string;
    appStoreMail: string;
  }[],
  App,
  { rejectValue: string }
>("app/getUnconfirmedTesters", async (app, thunkAPI) => {
  try {
    const testers = await getUnconfirmedTesters(app);
    if (testers) {
      return testers;
    } else {
      return thunkAPI.rejectWithValue("failed to add app");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

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
  { testerToApp: TesterToApp; account: Account },
  { rejectValue: string }
>("app/addTesterToApp", async ({ testerToApp, account }, thunkAPI) => {
  try {
    const app = await getAppByIdFromDb(testerToApp.appId);
    if (app) {
      if (app.accountId == account.id) {
        throw new Error("This is your app.");
      } else {
        console.log("Hittade appen");
        if (
          (app.operatingSystem.toLowerCase() === "android" &&
            account.playStoreMail) ||
          (app.operatingSystem.toLowerCase() === "ios" &&
            account.appStoreMail) ||
          (app.operatingSystem.toLowerCase() === "all" &&
            account.playStoreMail &&
            account.appStoreMail)
        ) {
          const addedTester = await addTesterToAppToDb(testerToApp);
          if (addedTester) {
            return addedTester;
          } else {
            throw new Error("Failed to add tester to app");
          }
        } else {
          throw new Error("Invalid combination of OS and account email");
        }
      }
    } else {
      console.log("hittar kanske inte appen");
      throw new Error("App not found");
    }
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
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

export const getMyAppsAsync = createAsyncThunk<
  App[],
  Account,
  { rejectValue: string }
>("app/getMyApps", async (account, thunkAPI) => {
  try {
    const myApps = await getMyAppsFromDb(account.id);
    return myApps;
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
      })
      .addCase(getUnconfirmedTestersAsync.fulfilled, (state, action) => {
        state.uncofirmedTesters = action.payload;
        state.error = null;
      })
      .addCase(getUnconfirmedTestersAsync.rejected, (state, action) => {
        state.uncofirmedTesters = [];
        state.error = "Something went wrong with getting testers for your app.";
      })
      .addCase(getMyAppsAsync.fulfilled, (state, action) => {
        state.myApps = action.payload;
        state.error = null;
      })
      .addCase(getMyAppsAsync.rejected, (state, action) => {
        state.myApps = [];
        state.error = "Something went wrong with getting testers for your app.";
      })
      .addCase(addTesterToAppAsync.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(addTesterToAppAsync.rejected, (state, action) => {
        state.error = "Have you registered email for this current OS store?";
        console.log("STATE ERROR: ", state.error);
      })
      .addCase(confirmTesterToAppAsync.fulfilled, (state, action) => {
        console.log("CONFIRM FULFILLED");
        const confirmedTesterIndex = state.uncofirmedTesters.findIndex(
          (test) => test.testerToAppId == action.payload.id
        );
        if (confirmedTesterIndex !== -1) {
          state.uncofirmedTesters.splice(confirmedTesterIndex, 1);
        }
        state.error = null;
      });
  },
});

export const appReducer = appSlice.reducer;
