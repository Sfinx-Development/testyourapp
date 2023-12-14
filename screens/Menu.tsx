import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import { getAccountByUidAsync } from "../store/accountSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logOutUser } from "../store/userSlice";

type NavigationProps = RootNavigationScreenProps<"Menu">;

export default function HomeScreen({ navigation }: NavigationProps) {
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
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Välkommen, {activeAccount?.username}!
        </Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Text style={styles.logoutText}>Logga ut</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Dina val</Text>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("AllApps")}
        >
          <Text style={styles.optionText}>Tillgängliga appar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("UploadApp")}
        >
          <Text style={styles.optionText}>Ladda upp en app</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("MyApps")}
        >
          <Text style={styles.optionText}>Mina appar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    top: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logoutText: {
    color: "blue",
  },
  content: {
    padding: 20,
    top: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  optionText: {
    fontSize: 18,
  },
});
