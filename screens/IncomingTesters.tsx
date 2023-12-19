import React, { useEffect } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import TesterConfirmCard from "../components/TesterConfirmCard";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import {
  addTesterToAppAsync,
  confirmTesterToAppAsync,
  getMyAppsAsync,
  getUnconfirmedTestersAsync,
} from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { TesterToApp } from "../types";

type NavigationProps = RootNavigationScreenProps<"IncomingTesters">;

export default function IncomingTesters({ navigation }: NavigationProps) {
  const dispatch = useAppDispatch();
  const activeAccount = useAppSelector(
    (state) => state.accountSlice.activeAccount
  );
  const myApps = useAppSelector((state) => state.appSlice.myApps);

  const unconfirmedTesters = useAppSelector(
    (state) => state.appSlice.uncofirmedTesters
  );

  // useEffect(() => {
  //   if (myApps) {
  //     console.log("my apps: ", myApps);
  //     for (const app of myApps) {
  //       dispatch(getUnconfirmedTestersAsync(app)).then(() => {
  //         console.log("TESTERS: ", unconfirmedTesters);
  //       });
  //     }
  //   }
  // }, [myApps]);

  //detta räcker med att det händer en gång vid startsidan och en gång när man laddar in en ny app? kanske
  // useEffect(() => {
  //   if (activeAccount) {
  //     dispatch(getMyAppsAsync(activeAccount));
  //   }
  // }, []);

  const handleConfirmTesterToApp = (testerToAppId: string) => {
    if (activeAccount) {
      dispatch(confirmTesterToAppAsync(testerToAppId));
    }
  };

  useEffect(() => {
    console.log("UNCONFIRMED TESTERS: ", unconfirmedTesters);
  }, [unconfirmedTesters]);

  const renderAppCard = ({ item }: { item: any }) => (
    <TesterConfirmCard
      appName={item.appName}
      testerUsername={item.username}
      //här hämta playstore eller appstore, det som gller för appen
      testerMail={item.playStoreMail}
      testerId={item.testerId}
      onClick={() => handleConfirmTesterToApp(item.testerToAppId)}
    />
  );

  return (
    <View style={styles.container}>
      {unconfirmedTesters.length > 0 ? (
        <FlatList
          data={unconfirmedTesters}
          renderItem={renderAppCard}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
        />
      ) : (
        <Text
          style={{
            fontSize: 20,
            color: "black",
            top: 100,
            textAlign: "center",
          }}
        >
          No incoming testers
        </Text>
      )}
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
