import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Badge } from "react-native-paper";
import { auth } from "../api/config";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import { getAccountByUidAsync } from "../store/accountSlice";
import {
  getAppsImTestingAsync,
  getMyAppsAsync,
  getUnconfirmedTestersAsync,
} from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logOutUser } from "../store/userSlice";

type NavigationProps = RootNavigationScreenProps<"Menu">;

export default function HomeScreen({ navigation }: NavigationProps) {
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();
  const activeAccount = useAppSelector(
    (state) => state.accountSlice.activeAccount
  );
  const myApps = useAppSelector((state) => state.appSlice.myApps);
  const unconfirmedTesters = useAppSelector(
    (state) => state.appSlice.uncofirmedTesters
  );

  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(logOutUser());
    });
  };

  useEffect(() => {
    if (user) {
      dispatch(getAccountByUidAsync(user.uid));
    }
  }, [user]);

  useEffect(() => {
    if (activeAccount) {
      console.log("HÄMTAR TESTADE APPAR");
      dispatch(getAppsImTestingAsync(activeAccount?.id));
      dispatch(getMyAppsAsync(activeAccount));
    }
  }, [activeAccount]);

  useEffect(() => {
    if (myApps) {
      console.log("my apps: ", myApps);
      for (const app of myApps) {
        dispatch(getUnconfirmedTestersAsync(app));
      }
    }
  }, [myApps]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Welcome, {activeAccount?.username}!
        </Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Text style={styles.logoutText}>Sign out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Test your app</Text>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("AllApps")}
        >
          <Text style={styles.optionText}>Available apps</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("UploadApp")}
        >
          <Text style={styles.optionText}>Upload app</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("MyApps")}
        >
          <Text style={styles.optionText}>My apps</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("IncomingTesters")}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.optionText}>Incoming testers</Text>
            {unconfirmedTesters && unconfirmedTesters.length > 0 ? (
              <Badge style={{ backgroundColor: "blue" }}>
                {unconfirmedTesters.length}
              </Badge>
            ) : null}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("AppsImTesting")}
        >
          <Text style={styles.optionText}>Apps I'm testing</Text>
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
