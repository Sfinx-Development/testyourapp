import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getAccountByUidAsync } from "../store/accountSlice";

export default function Menu() {
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();
  const activeAccount = useAppSelector(
    (state) => state.accountSlice.activeAccount
  );

  useEffect(() => {
    if (user) {
      dispatch(getAccountByUidAsync(user.uid));
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>MENU</Text>
      <Text>{activeAccount?.username}</Text>
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
