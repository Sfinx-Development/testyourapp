import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AppImTestingCard from "../components/AppImTestingCard";
import ErrorModule from "../components/ErrorModule";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import { getAllAppsAsync, getAppsImTestingAsync } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { App } from "../types";

type NavigationProps = RootNavigationScreenProps<"AppsImTesting">;

export default function AppsImTesting({ navigation }: NavigationProps) {
  const [errorPopup, setErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const dispatch = useAppDispatch();
  const activeAccount = useAppSelector(
    (state) => state.accountSlice.activeAccount
  );
  const appsImTesting = useAppSelector((state) => state.appSlice.appsImTesting);

  // useEffect(() => {
  //   if (activeAccount) {
  //     console.log("HÄMTAR TESTADE APPAR");
  //     dispatch(getAppsImTestingAsync(activeAccount?.id));
  //   }
  // }, [activeAccount]);

  const renderAppCard = ({ item }: { item: App }) => (
    <AppImTestingCard
      app={item}
      onClick={() => {
        console.log("click");
      }}
    />
  );

  return (
    <View style={styles.container}>
      {errorPopup && errorMsg ? (
        <ErrorModule
          errorMessage={errorMsg}
          buttonMessage="Got it"
          onClose={() => setErrorPopup(false)}
        />
      ) : null}
      <FlatList
        data={appsImTesting}
        renderItem={renderAppCard}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  flatListContainer: {
    justifyContent: "space-between",
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
    justifyContent: "center",
    alignItems: "center",
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
  cardImage: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: "100%",
  },
});