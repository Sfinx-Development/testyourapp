import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Badge } from "react-native-paper";
import { auth } from "../api/config";
import AreYouSureModule from "../components/AreYouSure";
import DeleteAccountModule from "../components/DeleteAccount";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import {
  getAccountByUidAsync,
  resetAccount,
  resetAccountState,
} from "../store/accountSlice";
import {
  getAppsImTestingAsync,
  getMyAppsAsync,
  getUnconfirmedTestersAsync,
  resetAppState,
} from "../store/appSlice";
import { getFeedbackMessagesAsync } from "../store/feedbackSlice";
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
  const incomingFeedback = useAppSelector(
    (state) => state.feedbackSlice.incomingFeedback
  );
  const [errorPopup, setErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignOut = () => {
    signOut(auth).then(() => {
      if (activeAccount) {
        dispatch(logOutUser());

        dispatch(resetAccountState());
        dispatch(resetAppState());
      }
    });
  };

  useEffect(() => {
    if (user && activeAccount == null) {
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

  useEffect(() => {
    if (activeAccount) {
      dispatch(getFeedbackMessagesAsync(activeAccount?.id));
    }
  }, [activeAccount]);

  const handleConfirmedDelete = ({ email, password }: UserCreate) => {
    if (user) {
      if (activeAccount) {
        dispatch(resetAccount());
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

  const renderOption = (
    icon: React.ReactNode,
    text: string,
    badgeCount: number,
    onPress: any
  ) => {
    return (
      <TouchableOpacity
        style={[
          styles.optionCard,
          { backgroundColor: colors.button.lightBlue, position: "relative" },
        ]}
        onPress={onPress}
      >
        {icon}
        <Text
          style={[
            styles.optionText,
            { color: colors.secondary, fontFamily: colors.fontFamily },
          ]}
        >
          {text}
        </Text>
        {badgeCount > 0 && (
          <Badge
            size={25}
            style={{
              backgroundColor: colors.button.red,
              color: colors.secondary,
              textAlign: "center",
              position: "absolute",
              top: 2,
              right: 2,
            }}
          >
            {badgeCount}
          </Badge>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
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
        <View style={styles.profileHeader}>
          <Text
            style={[
              styles.title,
              { color: colors.button.lightBlue, fontFamily: colors.fontFamily },
            ]}
          >
            Welcome, {activeAccount?.username}!
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          <View style={styles.optionRow}>
            {renderOption(
              <MaterialCommunityIcons
                name="head-question-outline"
                size={36}
                color={colors.secondary}
                style={{ justifyContent: "center", alignItems: "center" }}
              />,
              "Incoming Testers",
              unconfirmedTesters?.length ?? 0,
              () => navigation.navigate("IncomingTesters")
            )}
            {renderOption(
              <MaterialCommunityIcons
                name="message-text-outline"
                size={36}
                color={colors.secondary}
              />,
              "Incoming Feedback",
              incomingFeedback.filter((message) => message.isRead === false)
                .length,
              () => navigation.navigate("IncomingFeedback")
            )}
          </View>
          <View style={styles.optionRow}>
            {renderOption(
              <AntDesign name="search1" size={36} color={colors.secondary} />,
              "Available Apps",
              0,
              () => navigation.navigate("AllApps")
            )}
            {renderOption(
              <AntDesign name="mobile1" size={36} color={colors.secondary} />,
              "My Apps",
              0,
              () => navigation.navigate("MyApps")
            )}
          </View>
          <View style={styles.optionRow}>
            {renderOption(
              <Feather name="upload" size={36} color={colors.secondary} />,
              "Upload App",
              0,
              () => navigation.navigate("UploadApp")
            )}
            {renderOption(
              <MaterialIcons
                name="approval"
                size={36}
                color={colors.secondary}
              />,
              "Apps I'm Testing",
              0,
              () => navigation.navigate("AppsImTesting")
            )}
          </View>
        </View>

        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={[
              styles.themeToggle,
              {
                backgroundColor:
                  theme == "dark"
                    ? colors.button.darkBlue
                    : colors.button.lightBlue,
              },
            ]}
            onPress={toggleTheme}
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
              styles.deleteAccount,
              { backgroundColor: colors.button.red },
            ]}
            onPress={handleDeleteAccount}
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
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 20,
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  optionCard: {
    height: 120,
    width: 150,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: "white",
    marginTop: 10,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  themeToggle: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteAccount: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    fontSize: 18,
  },
});
