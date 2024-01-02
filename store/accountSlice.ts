import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  addAccountToDB,
  editAccountToDB,
  getAccountByUid,
} from "../api/account";
import { Account } from "../types";

interface AccountState {
  account: Account | null;
  activeAccount: Account | null;
  error: string | null;
}

export const initialState: AccountState = {
  account: null,
  activeAccount: null,
  error: null,
};

export const resetAccountState = createAction("account/resetAccountState");

export const addAccountAsync = createAsyncThunk(
  "accounts/addAccount",
  async (newAccount: Account, thunkAPI) => {
    try {
      const createdAccount = await addAccountToDB(newAccount);

      if (createdAccount) {
        return createdAccount;
      } else {
        return thunkAPI.rejectWithValue("Failed to add account");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getAccountByUidAsync = createAsyncThunk<
  Account,
  string,
  { rejectValue: string }
>("profiles/getAccountByUid", async (uid, thunkAPI) => {
  try {
    const fetchedAccount = await getAccountByUid(uid);
    if (fetchedAccount) {
      return fetchedAccount;
    } else {
      return thunkAPI.rejectWithValue("failed to get account");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const editAccountAsync = createAsyncThunk<
  Account,
  Account,
  { rejectValue: string }
>("profile/editAccount", async (account, thunkAPI) => {
  try {
    const editAccount = await editAccountToDB(account);
    if (editAccount) {
      return editAccount;
    } else {
      return thunkAPI.rejectWithValue("failed to edit account");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<Account | undefined>) => {
      if (action.payload) {
        state.account = action.payload;
      }
    },
    resetAccountState: (state) => {
      return initialState;
    },
    editProfile: (state, action) => {
      const updatedAccount = action.payload;
      state.account = updatedAccount;
    },
    resetAccount: (state) => {
      state.activeAccount = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAccountAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.account = null;
        }
      })
      .addCase(editAccountAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.activeAccount = action.payload;
        }
      })
      .addCase(editAccountAsync.rejected, (state, action) => {
        state.error = "Det gick inte att redigera kontot för tillfället.";
      })
      .addCase(getAccountByUidAsync.fulfilled, (state, action) => {
        if (action.payload) {
          console.log("statet är: ", state.activeAccount);
          state.activeAccount = action.payload;
        }
      })
      .addCase(getAccountByUidAsync.rejected, (state, action) => {
        state.error = "Det gick inte att hämta kontot just nu.";
      });
  },
});

export const { editProfile, resetAccount } = accountSlice.actions;
export const accountReducer = accountSlice.reducer;
