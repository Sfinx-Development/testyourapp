import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountReducer } from "./accountSlice";
import { userReducer } from "./userSlice";
import { appReducer } from "./appSlice";

const store = configureStore({
  reducer: {
    userSlice: userReducer,
    accountSlice: accountReducer,
    appSlice: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
