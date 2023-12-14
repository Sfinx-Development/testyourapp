import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getAccountByUidAsync } from "../store/accountSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logOutUser } from "../store/userSlice";

export default function Menu() {
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();
  const activeAccount = useAppSelector(
    (state) => state.accountSlice.activeAccount
  );

  const handleSignOut = () => {
    dispatch(logOutUser());
  };

  useEffect(() => {
    if (user) {
      dispatch(getAccountByUidAsync(user.uid));
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text>MENU</Text>
      <Text>{activeAccount?.username}</Text>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Logga ut</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
