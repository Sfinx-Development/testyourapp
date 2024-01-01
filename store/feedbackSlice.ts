import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Account, App, FeedbackMessage, TesterToApp } from "../types";
import {
  addFeedbackMessageToDb,
  deleteFeedbackMessageFromDb,
  getFeedbackMessagesByDeveloperId,
} from "../api/feedbackMessage";

interface AppState {
  incomingFeedback: FeedbackMessage[];
  error: string | null;
}

export const initialState: AppState = {
  incomingFeedback: [],
  error: null,
};

export const sendFeedbackAsync = createAsyncThunk<
  FeedbackMessage,
  FeedbackMessage,
  { rejectValue: string }
>("feedback/sendFeedback", async (message, thunkAPI) => {
  try {
    if (!isMessageClean(message.message)) {
      return thunkAPI.rejectWithValue(
        "Failed to send feedback due to potentially harming words."
      );
    }
    const addedApp = await addFeedbackMessageToDb(message);
    if (addedApp) {
      return addedApp;
    } else {
      return thunkAPI.rejectWithValue("failed to send feedback");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getFeedbackMessagesAsync = createAsyncThunk<
  FeedbackMessage[],
  string,
  { rejectValue: string }
>("feedback/getFeedbackMessages", async (accountId, thunkAPI) => {
  try {
    const appsImTesting = await getFeedbackMessagesByDeveloperId(accountId);
    if (appsImTesting) {
      return appsImTesting;
    } else {
      return thunkAPI.rejectWithValue("failed to get apps im testing");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteFeedbackMessageAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("feedback/deleteAsTester", async (feedbackMessageId, thunkAPI) => {
  try {
    const deletedMessageId = await deleteFeedbackMessageFromDb(
      feedbackMessageId
    );
    if (deletedMessageId) {
      return deletedMessageId;
    } else {
      return thunkAPI.rejectWithValue(
        "Something went wrong when deleting the message."
      );
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendFeedbackAsync.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(sendFeedbackAsync.rejected, (state, action) => {
        state.error = "Something went wrong with sending feedback.";
      })
      .addCase(getFeedbackMessagesAsync.fulfilled, (state, action) => {
        state.incomingFeedback = action.payload;
        state.error = null;
      })
      .addCase(getFeedbackMessagesAsync.rejected, (state, action) => {
        state.incomingFeedback = [];
        state.error = "Something went wrong with getting messages.";
      })
      .addCase(deleteFeedbackMessageAsync.fulfilled, (state, action) => {
        state.error = null;
        const index = state.incomingFeedback.findIndex(
          (message) => message.id == action.payload
        );
        if (index) {
          const newState = state.incomingFeedback.slice(index, 1);
          state.incomingFeedback = newState;
        }
      })
      .addCase(deleteFeedbackMessageAsync.rejected, (state, action) => {
        state.error = "Try again later.";
      });
  },
});

export const feedbackReducer = feedbackSlice.reducer;

const isMessageClean = (message: string): boolean => {
  // Lista över stötande ord (anpassa efter behov)
  const offensiveWords = ["stötande1", "stötande2", "stötande3"];

  // Om inget stötande ord finns i meddelandet, returnera true
  return !offensiveWords.some((word) =>
    message.toLowerCase().includes(word.toLowerCase())
  );
};
