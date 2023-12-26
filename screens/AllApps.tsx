import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import AppCard from "../components/AppCardPresentation";
import ErrorModule from "../components/ErrorModule";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import {
  addTesterToAppAsync,
  getAllAppsAsync,
  getAppsImTestingAsync,
} from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { App, TesterToApp } from "../types";
import { useTheme } from "../contexts/themeContext";

type NavigationProps = RootNavigationScreenProps<"AllApps">;

export default function HomeScreen({ navigation }: NavigationProps) {
  const { colors } = useTheme();
  const [errorPopup, setErrorPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [search, setSearch] = useState("");
  const [filteredApps, setFilteredApps] = useState<App[] | []>();
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();
  const activeAccount = useAppSelector(
    (state) => state.accountSlice.activeAccount
  );
  const testerToAppError = useAppSelector((state) => state.appSlice.error);

  const availableApps = useAppSelector((state) => state.appSlice.availableApps);

  const appsImTesting = useAppSelector((state) => state.appSlice.appsImTesting);
  const myApps = useAppSelector((state) => state.appSlice.myApps);

  useEffect(() => {
    if (testerToAppError) {
      setErrorMsg(testerToAppError);
      setErrorPopup(true);
    }
  }, [testerToAppError]);

  useEffect(() => {
    dispatch(getAllAppsAsync());
    if (activeAccount) {
      dispatch(getAppsImTestingAsync(activeAccount?.id));
    }
  }, []);

  useEffect(() => {
    if (availableApps) {
      setFilteredApps(availableApps);
    }
  }, [availableApps]);

  const filterAppsBySearch = () => {
    if (search == "" || search == null || search == undefined) {
      setFilteredApps(availableApps);
    } else {
      const filtered = availableApps.filter(
        (app) =>
          app.name.toLowerCase().includes(search.toLowerCase()) ||
          app.operatingSystem.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredApps(filtered);
    }
  };

  const handleSaveTesterToApp = (appId: string) => {
    if (
      appsImTesting.some((app) => app.id === appId) ||
      myApps.some((app) => app.id === appId)
    ) {
      console.log("i if");
      setErrorMsg(
        "It seems as you are allready registered as a tester or this is your app."
      );
      setErrorPopup(true);
    } else {
      if (activeAccount) {
        const newTesterToApp: TesterToApp = {
          id: "",
          accountId: activeAccount?.id,
          appId: appId,
          confirmed: false,
        };
        dispatch(
          addTesterToAppAsync({
            testerToApp: newTesterToApp,
            account: activeAccount,
          })
        );
      }
    }
  };

  function testersNeeded(app: App) {
    return app.testersMin - app.testersRegistered;
  }

  const renderAppCard = ({ item }: { item: App }) => (
    <AppCard
      app={item}
      onClick={handleSaveTesterToApp}
      appsImTesting={appsImTesting}
      myApps={myApps}
      testersNeeded={testersNeeded(item)}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      {errorPopup && errorMsg ? (
        <ErrorModule
          errorMessage={errorMsg}
          buttonMessage="Got it"
          onClose={() => setErrorPopup(false)}
        />
      ) : null}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TextInput
          style={styles.input}
          placeholder="Search for apps"
          autoCapitalize="none"
          onChangeText={(text) => {
            setSearch(text);
            filterAppsBySearch();
          }}
        />
      </View>
      <FlatList
        data={filteredApps}
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
    width: "90%",
    borderRadius: 20,
    textAlign: "center",
  },
});
