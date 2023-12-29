import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  AccessibilityInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Badge } from "react-native-paper";
import { auth } from "../api/config";
import AreYouSureModule from "../components/AreYouSure";
import DeleteAccountModule from "../components/DeleteAccount";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import { getAccountByUidAsync, resetAccount } from "../store/accountSlice";
import {
  getAppsImTestingAsync,
  getMyAppsAsync,
  getUnconfirmedTestersAsync,
} from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { deleteUserAsync, logOutUser } from "../store/userSlice";
import { UserCreate } from "../types";

type NavigationProps = RootNavigationScreenProps<"Menu">;

export default function HomeScreen({ navigation }: NavigationProps) {
  const { colors, theme, toggleTheme } = useTheme();
  const [deleteModule, setDeleteModule] = useState(false);

  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();
  const activeAccount = useAppSelector(
    (state) => state.accountSlice.activeAccount
  );
  const myApps = useAppSelector((state) => state.appSlice.myApps);
  const unconfirmedTesters = useAppSelector(
    (state) => state.appSlice.uncofirmedTesters
  );
  const [errorPopup, setErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignOut = () => {
    signOut(auth).then(() => {
      if (activeAccount) {
        dispatch(resetAccount(activeAccount)).then(() =>
          dispatch(logOutUser())
        );
      }
    });
  };

  useEffect(() => {
    if (
      (user && activeAccount == undefined) ||
      (user && activeAccount == null)
    ) {
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

  const handleConfirmedDelete = ({ email, password }: UserCreate) => {
    if (user) {
      if (activeAccount) {
        dispatch(resetAccount(activeAccount));
      }
      dispatch(deleteUserAsync({ email, password }));
    }
  };

  const handleDeleteAccount = () => {
    setErrorMsg(
      "Are you sure you want to delete your account and all your information?"
    );
    setErrorPopup(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        {/* <Text
          style={[
            styles.headerText,
            { color: colors.secondary, fontFamily: colors.fontFamily },
          ]}
        >
          Test Your App
        </Text> */}
        <TouchableOpacity onPress={handleSignOut}>
          <Text
            style={[
              styles.logoutText,
              { color: colors.button.darkBlue, fontFamily: colors.fontFamily },
            ]}
          >
            Sign out
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {errorPopup && errorMsg ? (
          <AreYouSureModule
            errorMessage={errorMsg}
            buttonMessage1="Yes"
            buttonMessage2="No"
            onDelete={() => setDeleteModule(true)}
            onClose={() => setErrorPopup(false)}
            appId={null}
          />
        ) : null}
        {deleteModule ? (
          <DeleteAccountModule
            onDeleteConfirmed={({ email, password }) => {
              setDeleteModule(false);
              handleConfirmedDelete({ email, password });
            }}
            onClose={() => {
              setDeleteModule(false);
            }}
          />
        ) : null}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          <Text
            style={[
              styles.title,
              {
                color: colors.button.lightBlue,
                fontFamily: colors.fontFamily,
              },
            ]}
          >
            Welcome, {activeAccount?.username}!
          </Text>

          {/* <Image source={require("../assets/phone.png")} style={styles.image} /> */}
        </View>
        <TouchableOpacity
          style={[styles.option, { backgroundColor: colors.button.lightBlue }]}
          onPress={() => navigation.navigate("AllApps")}
        >
          <AntDesign
            name="search1"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text
            style={[
              styles.optionText,
              { color: colors.secondary, fontFamily: colors.fontFamily },
            ]}
          >
            Available apps
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, { backgroundColor: colors.button.lightBlue }]}
          onPress={() => navigation.navigate("UploadApp")}
        >
          <Feather name="upload" size={24} color="black" style={styles.icon} />
          <Text
            style={[
              styles.optionText,
              { color: colors.secondary, fontFamily: colors.fontFamily },
            ]}
          >
            Upload app
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, { backgroundColor: colors.button.lightBlue }]}
          onPress={() => navigation.navigate("MyApps")}
        >
          <AntDesign
            name="mobile1"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text
            style={[
              styles.optionText,
              { color: colors.secondary, fontFamily: colors.fontFamily },
            ]}
          >
            My apps
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, { backgroundColor: colors.button.lightBlue }]}
          onPress={() => navigation.navigate("IncomingTesters")}
        >
          <MaterialCommunityIcons
            name="head-question-outline"
            size={24}
            color="black"
            style={styles.icon}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={[
                styles.optionText,
                { color: colors.secondary, fontFamily: colors.fontFamily },
              ]}
            >
              Incoming testers
            </Text>
            {unconfirmedTesters && unconfirmedTesters.length > 0 ? (
              <Badge
                style={{
                  backgroundColor: colors.primary,
                  color: colors.secondary,
                }}
              >
                {unconfirmedTesters.length}
              </Badge>
            ) : null}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.option, { backgroundColor: colors.button.lightBlue }]}
          onPress={() => navigation.navigate("AppsImTesting")}
        >
          <MaterialIcons
            name="approval"
            size={24}
            color="black"
            style={styles.icon}
          />
          <Text
            style={[
              styles.optionText,
              { color: colors.secondary, fontFamily: colors.fontFamily },
            ]}
          >
            Apps I'm testing
          </Text>
        </TouchableOpacity>
        <View
          style={{
            height: "auto",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            marginTop: 10,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={[
              styles.deleteOption,
              {
                backgroundColor:
                  theme == "dark"
                    ? colors.button.darkBlue
                    : colors.button.lightBlue,
              },
            ]}
            onPress={() => toggleTheme()}
          >
            <Text
              style={[
                styles.logoutText,
                { color: colors.secondary, fontFamily: colors.fontFamily },
              ]}
            >
              {theme == "dark" ? "Light Mode" : "Dark Mode"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.deleteOption,
              { backgroundColor: colors.button.red, marginLeft: 5 },
            ]}
            onPress={() => handleDeleteAccount()}
          >
            <Text
              style={[
                styles.logoutText,
                { color: colors.secondary, fontFamily: colors.fontFamily },
              ]}
            >
              Delete account
            </Text>
          </TouchableOpacity>
        </View>
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
    borderBottomWidth: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  logoutText: { fontSize: 20 },
  content: {
    padding: 20,
    top: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 20,
  },
  option: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    flexDirection: "row",
  },
  deleteOption: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    width: "50%",
    fontWeight: "600",
  },
  optionText: {
    fontSize: 20,
    fontWeight: "600",
  },
  image: {
    width: 60,
    height: 80,
    marginRight: 10,
  },
});
