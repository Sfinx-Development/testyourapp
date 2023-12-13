import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import RootNavigator from "./navigation/RootNavigator";
import store from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          <StatusBar style="auto" />
          <RootNavigator />
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}
