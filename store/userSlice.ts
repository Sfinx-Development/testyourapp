import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  addUserToDB,
  deleteUserFromDb,
  handleForgotPasswordFirestore,
  signInWithAPI,
} from "../api/user";
import { User, UserCreate } from "../types";

interface UserState {
  user: User | undefined;
  filteredUsers: User[];
  selectedUser: User | null;
  error: string | null;
}

export const initialState: UserState = {
  filteredUsers: [],
  selectedUser: null,
  user: undefined,
  error: null,
};

export const resetUserState = createAction("user/resetUserState");

export const addUserAsync = createAsyncThunk<
  User,
  UserCreate,
  { rejectValue: string }
>("user/addUser", async (user, thunkAPI) => {
  try {
    const addedUser = await addUserToDB(user);
    if (addedUser) {
      return addedUser;
    } else {
      return thunkAPI.rejectWithValue("failed to add user");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logInUserAsync = createAsyncThunk<
  User,
  UserCreate,
  { rejectValue: string }
>("user/logInUser", async (user, thunkAPI) => {
  try {
    const response = await signInWithAPI(user);
    return response;
  } catch (error) {
    throw new Error("Användarnamn eller lösenord var felaktigt.");
  }
});

export const deleteUserAsync = createAsyncThunk<
  boolean,
  UserCreate,
  { rejectValue: string }
>("user/deleteUser", async (user, thunkAPI) => {
  try {
    const response = await deleteUserFromDb(user);
    return response;
  } catch (error) {
    throw new Error("Användarnamn eller lösenord var felaktigt.");
  }
});

export const handleForgotPasswordAsync = createAsyncThunk<
  boolean,
  string,
  { rejectValue: string }
>("user/forgotPassword", async (email, thunkAPI) => {
  try {
    const emailSent = await handleForgotPasswordFirestore(email);
    if (emailSent) {
      return true;
    } else {
      return thunkAPI.rejectWithValue("Try resetting password later.");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetUser = createAsyncThunk<User, User, { rejectValue: string }>(
  "user/resetUseer",
  async (user, thunkAPI) => {
    try {
      if (user) {
        return user;
      } else {
        return thunkAPI.rejectWithValue("");
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOutUser: (state) => {
      state.user = undefined;
    },
    resetUserState: (state) => {
      return initialState;
    },
    setActiveUser: (state, action: PayloadAction<User | undefined>) => {
      if (action.payload) {
        state.user = {
          uid: action.payload.uid,
          email: action.payload.email,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInUserAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = {
            uid: action.payload.uid,
            email: action.payload.email,
          };
          state.error = null;
        }
      })
      .addCase(logInUserAsync.rejected, (state, action) => {
        state.error = "Användarnamn eller lösenord är felaktigt.";
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        state.user = undefined;
        state.error = "Looks like this email is already registered.";
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.error = null;
        state.user = undefined;
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.error =
          "Something went wrong. Try again later or sign out and sign in again.";
      })
      .addCase(handleForgotPasswordAsync.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(handleForgotPasswordAsync.rejected, (state, action) => {
        state.error =
          "Check your email. If you haven't got a mail, please try again later.";
      })
      .addCase(resetUser.fulfilled, (state, action) => {
        state.user = undefined;
      })
      .addCase(resetUser.rejected, (state, action) => {
        state.error = "Restart app.";
      });
  },
});

export const userReducer = userSlice.reducer;
export const { logOutUser, setActiveUser } = userSlice.actions;
