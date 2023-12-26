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
import { deleteUserAsync, logOutUser } from "../store/userSlice";
import { useTheme } from "../contexts/themeContext";

type NavigationProps = RootNavigationScreenProps<"Menu">;

export default function HomeScreen({ navigation }: NavigationProps) {
  const { colors, theme } = useTheme();

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
      console.log("THEME: ", theme);
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

  const handleDeleteAccount = () => {
    if (user) {
      dispatch(deleteUserAsync(user.uid));
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: colors.secondary }]}>
          Welcome, {activeAccount?.username}!
        </Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Text style={[styles.logoutText, { color: colors.secondary }]}>
            Sign out
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.secondary }]}>
          Test your app
        </Text>
        <TouchableOpacity
          style={[styles.option, { backgroundColor: colors.button.lightBlue }]}
          onPress={() => navigation.navigate("AllApps")}
        >
          <Text style={[styles.optionText, { color: colors.primary }]}>
            Available apps
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, { backgroundColor: colors.button.darkBlue }]}
          onPress={() => navigation.navigate("UploadApp")}
        >
          <Text style={[styles.optionText, { color: colors.primary }]}>
            Upload app
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, { backgroundColor: colors.button.darkBlue }]}
          onPress={() => navigation.navigate("MyApps")}
        >
          <Text style={[styles.optionText, { color: colors.primary }]}>
            My apps
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, { backgroundColor: colors.button.darkBlue }]}
          onPress={() => navigation.navigate("IncomingTesters")}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={[styles.optionText, { color: colors.primary }]}>
              Incoming testers
            </Text>
            {unconfirmedTesters && unconfirmedTesters.length > 0 ? (
              <Badge style={{ backgroundColor: colors.primary }}>
                {unconfirmedTesters.length}
              </Badge>
            ) : null}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, { backgroundColor: colors.button.darkBlue }]}
          onPress={() => navigation.navigate("AppsImTesting")}
        >
          <Text style={[styles.optionText, { color: colors.primary }]}>
            Apps I'm testing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.deleteOption, { backgroundColor: colors.button.red }]}
          onPress={() => handleDeleteAccount()}
        >
          <Text style={[styles.logoutText, { color: colors.primary }]}>
            Delete account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  logoutText: {},
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
    borderRadius: 8,
  },
  deleteOption: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    width: "50%",
  },
  optionText: {
    fontSize: 18,
    fontWeight: "500",
  },
});
