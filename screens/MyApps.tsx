import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import AppTestersPresentation from "../components/AppTestersPresentation";
import DeleteAppButton from "../components/DeleteAppButton";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import { getMyAppsAsync } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { App } from "../types";
import { useTheme } from "../contexts/themeContext";

type NavigationProps = RootNavigationScreenProps<"MyApps">;

export default function MyApps({ navigation }: NavigationProps) {
  const { colors } = useTheme();
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();
  const activeAccount = useAppSelector(
    (state) => state.accountSlice.activeAccount
  );
  const myApps = useAppSelector((state) => state.appSlice.myApps);

  useEffect(() => {
    if (activeAccount) {
      console.log("ACTIVE ACCOUNT: ", activeAccount);
      dispatch(getMyAppsAsync(activeAccount));
    }
  }, []);

  const renderAppItem = ({ item }: { item: App }) => {
    return (
      <View style={styles.content}>
        <Text style={styles.cardTitle}>{item.name.toUpperCase()}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <AppTestersPresentation testersCount={item.testersRegistered} />
        <Text style={styles.cardText}>
          Operating System: {item.operatingSystem.toUpperCase()}
        </Text>
        <DeleteAppButton onPress={() => console.log("Delete app pressed")} />
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
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
