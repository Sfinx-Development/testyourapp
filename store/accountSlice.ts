import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const resetAccount = createAsyncThunk<
  Account,
  Account,
  { rejectValue: string }
>("user/resetAccount", async (account, thunkAPI) => {
  try {
    if (account) {
      return account;
    } else {
      return thunkAPI.rejectWithValue("");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
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
    editProfile: (state, action) => {
      const updatedAccount = action.payload;
      state.account = updatedAccount;
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
      })
      .addCase(resetAccount.fulfilled, (state, action) => {
        if (action.payload) {
          state.activeAccount = null;
        }
      })
      .addCase(resetAccount.rejected, (state, action) => {
        state.error = "";
      });
  },
});

// export const deactivateProfileAsync = createAsyncThunk(
//   "profiles/deactivateProfile",
//   async (profileId: string, thunkAPI) => {
//     try {
//       const response = await deactivateProfileInDB(profileId);
//       if (response.success) {
//         return true;
//       } else {
//         return thunkAPI.rejectWithValue(response.error);
//       }
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const { editProfile } = accountSlice.actions;
export const accountReducer = accountSlice.reducer;
