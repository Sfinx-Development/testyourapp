import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../api/config";
import AllApps from "../screens/AllApps";
import CreateAccount from "../screens/CreateAccount";
import IncomingTesters from "../screens/IncomingTesters";
import Menu from "../screens/Menu";
import MyApps from "../screens/MyApps";
import SignIn from "../screens/SignIn";
import SplashScreen from "../screens/SplashScreen";
import UploadApp from "../screens/UploadApp";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setActiveUser } from "../store/userSlice";
import { User } from "../types";

export type RootStackParamList = {
  SignIn: undefined;
  CreateAccount: undefined;
  Menu: undefined;
  SplashScreen: undefined;
  AllApps: undefined;
  UploadApp: undefined;
  MyApps: undefined;
  IncomingTesters: undefined;
};

export type RootNavigationScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const [isUserFetched, setUserFetched] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice.user);

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
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UploadApp"
              component={UploadApp}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MyApps"
              component={MyApps}
              // options={{ headerShown: false }}
            />
            <Stack.Screen
              name="IncomingTesters"
              component={IncomingTesters}
              // options={{ headerShown: false }}
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
              options={{ headerShown: false }}
              component={CreateAccount}
            />
            <Stack.Screen
              name="IncomingTesters"
              options={{ headerShown: false }}
              component={IncomingTesters}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
