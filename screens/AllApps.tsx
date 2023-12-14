import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AppCard from "../components/AppCardPresentation";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import {
  addTesterToAppAsync,
  getAllAppsAsync,
  getAppsImTestingAsync,
} from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { App, TesterToApp } from "../types";

type NavigationProps = RootNavigationScreenProps<"AllApps">;

export default function HomeScreen({ navigation }: NavigationProps) {
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();
  const activeAccount = useAppSelector(
    (state) => state.accountSlice.activeAccount
  );
  const availableApps = useAppSelector((state) => state.appSlice.availableApps);
  const appsImTesting = useAppSelector((state) => state.appSlice.appsImTesting);

  useEffect(() => {
    dispatch(getAllAppsAsync());
    if (activeAccount) {
      dispatch(getAppsImTestingAsync(activeAccount?.id));
    }
  }, []);

  const handleSaveTesterToApp = (appId: string) => {
    if (activeAccount) {
      const newTesterToApp: TesterToApp = {
        id: "",
        accountId: activeAccount?.id,
        appId: appId,
      };
      dispatch(addTesterToAppAsync(newTesterToApp));
    }
  };

  const renderAppCard = ({ item }: { item: App }) => (
    <AppCard
      app={item}
      onClick={handleSaveTesterToApp}
      appsImTesting={appsImTesting}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={availableApps}
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
