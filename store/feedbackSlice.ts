import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Account, App, FeedbackMessage, TesterToApp } from "../types";
import {
  addFeedbackMessageToDb,
  deleteFeedbackMessageFromDb,
  getFeedbackMessagesByDeveloperId,
  markFeedbackMessageAsRead,
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
    const addedMessage = await addFeedbackMessageToDb(message);
    if (addedMessage) {
      return addedMessage;
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

export const markFeedbackMessageAsReadAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("feedback/markFeedbackMessageAsRead", async (feedbackMessageId, thunkAPI) => {
  try {
    const updatedMessageId = await markFeedbackMessageAsRead(feedbackMessageId);
    if (updatedMessageId) {
      return updatedMessageId;
    } else {
      return thunkAPI.rejectWithValue(
        "Something went wrong when updating the message as read."
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
          console.log("INDEX: ", index);
          const newState = state.incomingFeedback.slice(index, 1);
          state.incomingFeedback = newState;
        }
      })
      .addCase(deleteFeedbackMessageAsync.rejected, (state, action) => {
        state.error = "Try again later.";
      })
      .addCase(markFeedbackMessageAsReadAsync.fulfilled, (state, action) => {
        state.error = null;
        const updatedMessage = state.incomingFeedback.find(
          (message) => message.id == action.payload
        );
        if (updatedMessage) {
          updatedMessage.isRead = true;
        }
      })
      .addCase(markFeedbackMessageAsReadAsync.rejected, (state, action) => {
        state.error = "Try again later.";
      });
  },
});

export const feedbackReducer = feedbackSlice.reducer;

const isMessageClean = (message: string): boolean => {
  //hitta en lista på nätet?
  const offensiveWords = ["bitch", "suck", "whore"];

  return !offensiveWords.some((word) =>
    message.toLowerCase().includes(word.toLowerCase())
  );
};
