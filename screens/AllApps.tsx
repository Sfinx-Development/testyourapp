import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AppCard from "../components/AppCardPresentation";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import { useAppDispatch, useAppSelector } from "../store/store";
import { App } from "../types";

type NavigationProps = RootNavigationScreenProps<"AllApps">;

export default function HomeScreen({ navigation }: NavigationProps) {
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();
  const activeAccount = useAppSelector(
    (state) => state.accountSlice.activeAccount
  );

  const appList: App[] = [
    {
      id: "",
      accountId: "",
      imageUrl: "https://i.imgur.com/W0gF8eO.png",
      linkToTest: "https://example.com/test1",
      name: "App 1",
      description: "An app for apofai jeeoj iewjflw wjefliwej ",
      testersMin: 5,
      operatingSystem: "iOS and Android",
    },
    {
      id: "",
      accountId: "",
      imageUrl: "https://i.imgur.com/W0gF8eO.png",
      linkToTest: "https://example.com/test2",
      name: "App 2",
      description: "An app for apofai jeeoj iewjflw wjefliwej ",
      testersMin: 8,
      operatingSystem: "Android",
    },
    {
      id: "",
      accountId: "",
      imageUrl: "https://i.imgur.com/W0gF8eO.png",
      linkToTest: "https://example.com/test1",
      name: "Sugarappppp",
      description: "An app for apofai jeeoj iewjflw wjefliwej ",
      testersMin: 5,
      operatingSystem: "iOS and Android",
    },
    {
      id: "",
      accountId: "",
      imageUrl: "https://i.imgur.com/W0gF8eO.png",
      linkToTest: "https://example.com/test2",
      name: "Some app",
      description: "An app for apofai jeeoj iewjflw wjefliwej ",
      testersMin: 8,
      operatingSystem: "Android",
    },
    {
      id: "",
      accountId: "",
      imageUrl: "https://i.imgur.com/W0gF8eO.png",
      linkToTest: "https://example.com/test1",
      name: "ii3jwi3rw",
      description: "An app for apofai jeeoj iewjflw wjefliwej ",
      testersMin: 5,
      operatingSystem: "iOS and Android",
    },
    {
      id: "",
      accountId: "",
      imageUrl: "https://i.imgur.com/W0gF8eO.png",
      linkToTest: "https://example.com/test2",
      name: "Somejfklei we ",
      description: "An app for apofai jeeoj iewjflw wjefliwej ",
      testersMin: 8,
      operatingSystem: "Android",
    },
  ];

  const renderAppCard = ({ item }: { item: App }) => <AppCard app={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={appList}
        renderItem={renderAppCard}
        keyExtractor={(item) => item.name}
        numColumns={2} // Här anger du att du vill ha två kolumner
        contentContainerStyle={styles.flatListContainer} // Stilar för FlatList
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
