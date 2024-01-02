import { StatusBar } from "expo-status-bar";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import RootNavigator from "./navigation/RootNavigator";
import store from "./store/store";
import { ThemeProvider } from "./contexts/themeContext";

export default function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <PaperProvider>
          <SafeAreaProvider>
            <StatusBar style="auto" />
            <RootNavigator />
          </SafeAreaProvider>
        </PaperProvider>
      </Provider>
    </ThemeProvider>
  );
}
