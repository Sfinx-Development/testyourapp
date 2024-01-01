import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../api/config";
import { useTheme } from "../contexts/themeContext";
import AllApps from "../screens/AllApps";
import AppsImTesting from "../screens/AppsImTesting";
import CreateAccount from "../screens/CreateAccount";
import FeedbackMessage from "../screens/FeedbackMessage";
import ForgotPassword from "../screens/ForgotPassword";
import IncomingFeedback from "../screens/IncomingFeedback";
import IncomingTesters from "../screens/IncomingTesters";
import Menu from "../screens/Menu";
import MyApps from "../screens/MyApps";
import SignIn from "../screens/SignIn";
import SplashScreen from "../screens/SplashScreen";
import UploadApp from "../screens/UploadApp";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setActiveUser } from "../store/userSlice";
import { User } from "../types";
import SendFeeback from "../screens/SendFeedback";

export type RootStackParamList = {
  SignIn: undefined;
  CreateAccount: undefined;
  Menu: undefined;
  SplashScreen: undefined;
  AllApps: undefined;
  UploadApp: undefined;
  MyApps: undefined;
  IncomingTesters: undefined;
  AppsImTesting: undefined;
  ForgotPassword: undefined;
  IncomingFeedback: undefined;
  FeedbackMessage: { id: string };
  SendFeedback: { id: string };
};

export type RootNavigationScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const [isUserFetched, setUserFetched] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice.user);
  const { colors } = useTheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (response) => {
      if (response) {
        const fetchedUser: User = {
          uid: response.uid,
          email: response.email,
        };
        dispatch(setActiveUser(fetchedUser));
      } else {
        dispatch(setActiveUser(undefined));
      }
      setUserFetched(true);
    });
    return unsubscribe;
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isUserFetched ? (
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : user ? (
          <>
            <Stack.Screen
              name="Menu"
              component={Menu}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AllApps"
              component={AllApps}
              options={{
                title: "All Apps",
                headerTintColor: colors.button.lightBlue,
                headerTitleStyle: { fontWeight: "600" },
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: colors.primary },
              }}
            />
            <Stack.Screen
              name="UploadApp"
              component={UploadApp}
              options={{
                title: "Upload app",
                headerTintColor: colors.button.lightBlue,
                headerTitleStyle: { fontWeight: "600" },
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: colors.primary },
              }}
            />
            <Stack.Screen
              name="MyApps"
              component={MyApps}
              options={{
                title: "My Apps",
                headerTintColor: colors.button.lightBlue,
                headerTitleStyle: { fontWeight: "600" },
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: colors.primary },
              }}
            />
            <Stack.Screen
              name="AppsImTesting"
              component={AppsImTesting}
              options={{
                title: "Apps I'm Testing",
                headerTintColor: colors.button.lightBlue,
                headerTitleStyle: { fontWeight: "600" },
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: colors.primary },
              }}
            />
            <Stack.Screen
              name="IncomingTesters"
              component={IncomingTesters}
              options={{
                title: "Incoming Testers",
                headerTintColor: colors.button.lightBlue,
                headerTitleStyle: { fontWeight: "600" },
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: colors.primary },
              }}
            />
            <Stack.Screen
              name="IncomingFeedback"
              component={IncomingFeedback}
              options={{
                title: "Incoming Feedback",
                headerTintColor: colors.button.lightBlue,
                headerTitleStyle: { fontWeight: "600" },
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: colors.primary },
              }}
            />
            <Stack.Screen
              name="FeedbackMessage"
              component={FeedbackMessage}
              options={{
                title: "Message",
                headerTintColor: colors.button.lightBlue,
                headerTitleStyle: { fontWeight: "600" },
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: colors.primary },
              }}
            />
            <Stack.Screen
              name="SendFeedback"
              component={SendFeeback}
              options={{
                title: "Send Feedback",
                headerTintColor: colors.button.lightBlue,
                headerTitleStyle: { fontWeight: "600" },
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: colors.primary },
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CreateAccount"
              options={{
                title: "Create Account",
                headerTintColor: colors.button.lightBlue,
                headerTitleStyle: { fontWeight: "600" },
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: colors.primary },
              }}
              component={CreateAccount}
            />
            <Stack.Screen
              name="ForgotPassword"
              options={{
                title: "Forgot Password",
                headerTintColor: colors.button.lightBlue,
                headerTitleStyle: { fontWeight: "600" },
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: colors.primary },
              }}
              component={ForgotPassword}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
