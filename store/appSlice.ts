import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addAppToDb,
  addTesterToAppToDb,
  confirmTesterToAppDb,
  deleteAppFromDb,
  deleteAsTesterFromDb,
  getAllAppsFromDb,
  getAmountOfTestersDb,
  getAppByIdFromDb,
  getAppsImTestingFromDb,
  getAppsImTestingUnconfirmedFromDb,
  getMyAppsFromDb,
  getUnconfirmedTesters,
} from "../api/app";
import { Account, App, TesterToApp } from "../types";

interface AppState {
  app: App | null;
  availableApps: App[];
  appsImTesting: App[];
  appsImTestingUnconfirmed: App[];
  uncofirmedTesters:
    | {
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
  appsImTestingUnconfirmed: [],
  myApps: [],
  error: null,
};

export const resetAppState = createAction("app/resetAppState");

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

export const getAmountOfTestersForAppAsync = async (appId: string) => {
  try {
    const amountOfTesters = await getAmountOfTestersDb(appId);
    if (amountOfTesters) {
      return amountOfTesters;
    } else {
      return 0;
    }
  } catch (error: any) {
    return 0;
  }
};

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

export const getAppsImTestingUnconfirmedAsync = createAsyncThunk<
  App[],
  string,
  { rejectValue: string }
>("app/getAppsImTestingUnconfirmed", async (accountId, thunkAPI) => {
  try {
    const appsImTesting = await getAppsImTestingUnconfirmedFromDb(accountId);
    if (appsImTesting) {
      return appsImTesting;
    } else {
      return thunkAPI.rejectWithValue("failed to get apps im testing");
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

export const deleteAsTesterAsync = createAsyncThunk<
  boolean,
  { accountId: string; appId: string },
  { rejectValue: string }
>("app/deleteAsTester", async ({ accountId, appId }, thunkAPI) => {
  try {
    const isDeleted = await deleteAsTesterFromDb(accountId, appId);
    return isDeleted;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteAppAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("app/deleteApp", async (appId, thunkAPI) => {
  try {
    console.log("APPID som ska raderas: ", appId);
    const deletedAppId = await deleteAppFromDb(appId);
    if (deletedAppId == null) {
      throw Error;
    } else {
      return deletedAppId;
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

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    resetAppState: (state) => {
      return initialState;
    },
  },
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
        state.error = action.error.message || "Something went wrong";
        console.log("STATE ERROR: ", state.error);
      })
      .addCase(confirmTesterToAppAsync.fulfilled, (state, action) => {
        console.log("CONFIRM FULFILLED");
        if (state.uncofirmedTesters) {
          const confirmedTesterIndex = state.uncofirmedTesters.findIndex(
            (test) => test.testerToAppId == action.payload.id
          );
          if (confirmedTesterIndex !== -1) {
            state.uncofirmedTesters.splice(confirmedTesterIndex, 1);
          }
        }
        state.error = null;
      })
      .addCase(deleteAsTesterAsync.fulfilled, (state, action) => {
        state.error = null;
        state.appsImTesting;
      })
      .addCase(deleteAsTesterAsync.rejected, (state, action) => {
        state.error = "Try again later.";
      })
      .addCase(deleteAppAsync.fulfilled, (state, action) => {
        state.error = null;
        const index = state.myApps.findIndex((app) => app.id == action.payload);
        if (index) {
          const newState = state.myApps.slice(index, 1);
          state.myApps = newState;
        }
      })
      .addCase(deleteAppAsync.rejected, (state, action) => {
        state.error = "Try again later.";
      })
      .addCase(getAppsImTestingUnconfirmedAsync.fulfilled, (state, action) => {
        state.appsImTestingUnconfirmed = action.payload;
        state.error = null;
      })
      .addCase(getAppsImTestingUnconfirmedAsync.rejected, (state, action) => {
        state.error = "Try again later.";
      });
  },
});

export const appReducer = appSlice.reducer;
