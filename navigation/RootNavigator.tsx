import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../api/config";
import CreateAccount from "../screens/CreateAccount";
import Menu from "../screens/Menu";
import SignIn from "../screens/SignIn";
import SplashScreen from "../screens/SplashScreen";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setActiveUser } from "../store/userSlice";
import { User } from "../types";

export type RootStackParamList = {
  SignIn: undefined;
  CreateAccount: undefined;
  Menu: undefined;
  SplashScreen: undefined;
};

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
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
