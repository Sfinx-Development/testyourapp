import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import AppTestersPresentation from "../components/AppTestersPresentation";
import AreYouSureModule from "../components/AreYouSure";
import DeleteAppButton from "../components/DeleteAppButton";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import { deleteAppAsync, getMyAppsAsync } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { App } from "../types";

type NavigationProps = RootNavigationScreenProps<"MyApps">;

export default function MyApps({ navigation }: NavigationProps) {
  const { colors } = useTheme();
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();
  const activeAccount = useAppSelector(
    (state) => state.accountSlice.activeAccount
  );
  const myApps = useAppSelector((state) => state.appSlice.myApps);
  const [errorPopup, setErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [appId, setAppId] = useState("");

  useEffect(() => {
    if (activeAccount) {
      console.log("ACTIVE ACCOUNT: ", activeAccount);
      dispatch(getMyAppsAsync(activeAccount));
    }
  }, []);

  const handleDeleteAccount = (appId: string) => {
    setErrorPopup(true);
    setErrorMsg("Are you sure you want to delete this app?");
    setAppId(appId);
  };

  const handleConfirmedDelete = (appId: string) => {
    dispatch(deleteAppAsync(appId));
    setErrorMsg("");
    setErrorPopup(false);
  };

  const renderAppItem = ({ item }: { item: App }) => {
    return (
      <View style={styles.content}>
        <Text
          style={[
            styles.cardTitle,
            { color: colors.button.darkBlue, fontFamily: colors.fontFamily },
          ]}
        >
          {item.name.toUpperCase()}
        </Text>
        <Text
          style={[
            styles.cardDescription,
            { color: colors.button.darkBlue, fontFamily: colors.fontFamily },
          ]}
        >
          {item.description}
        </Text>
        <AppTestersPresentation testersCount={item.testersRegistered} />
        <Text style={[styles.cardText, { fontFamily: colors.fontFamily }]}>
          Operating System: {item.operatingSystem.toUpperCase()}
        </Text>
        <DeleteAppButton onPress={() => handleDeleteAccount(item.id)} />
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      {errorPopup && errorMsg ? (
        <AreYouSureModule
          errorMessage={errorMsg}
          buttonMessage1="Yes"
          buttonMessage2="No"
          onDelete={() => handleConfirmedDelete(appId)}
          onClose={() => setErrorPopup(false)}
          appId={appId}
        />
      ) : null}
      <FlatList
        data={myApps}
        renderItem={renderAppItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 20,
    top: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: "100%",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 12,
    color: "#555",
  },
});
