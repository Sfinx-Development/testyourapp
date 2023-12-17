
import React, { useEffect } from "react";
import { View, TextInput, StyleSheet, Text, FlatList } from "react-native";
import AppTestersPresentation from "../components/AppTestersPresentation";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import { useAppDispatch, useAppSelector } from "../store/store";
import DeleteAppButton from "../components/DeleteAppButton";
import { getMyAppsAsync } from "../store/appSlice";
import { AnyIfEmpty } from "react-redux";

type NavigationProps = RootNavigationScreenProps<"MyApps">;
type App = {
  id: string;
  name: string;
  description: string;
  testersMin: number;
  operatingSystem: string;
};

export default function MyApps({ navigation }: NavigationProps) {
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();
  const activeAccount = useAppSelector((state) => state.accountSlice.activeAccount);
  const myApps = useAppSelector((state) => state.appSlice.myApps);

  useEffect(() => {
    if (activeAccount) {
      dispatch(getMyAppsAsync(activeAccount));
    }
  }, [activeAccount]);

  const renderAppItem = ({item}: {item: App} ) => {
    return (
      <View style={styles.content}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <AppTestersPresentation testersCount={item.testersMin} />
        <Text style={styles.cardText}>Operating System: {item.operatingSystem}</Text>
        <DeleteAppButton onPress={() => console.log("Delete app pressed")} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Search for apps"
          autoCapitalize="none"
          onChangeText={(text) => console.log("SÖK PÅ: ", text)}
        />
      </View>
      <FlatList
        data={myApps}
        renderItem={renderAppItem}
        keyExtractor={(item) => item.id} // Ensure that you use a unique key for each item
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    top: 100,
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

