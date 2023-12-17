// MyApps.tsx
import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import AppTestersPresentation from "../components/AppTestersPresentation";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import { useAppDispatch, useAppSelector } from "../store/store";
import DeleteAppButton from "../components/DeleteAppButton";

type NavigationProps = RootNavigationScreenProps<"MyApps">;

export default function MyApps({ navigation }: NavigationProps) {
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();
  const activeAccount = useAppSelector((state) => state.accountSlice.activeAccount);

  const appData = {
    imageUrl: "https://i.imgur.com/YZem2E2.png",
    name: "GREENIFY",
    description: "An application that helps you take care of the planet. Need 10 testers to deploy it.",
    testersMin: 6,
    operatingSystem: "iOS", 
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
      <View style={styles.content}>
        <Text style={styles.cardTitle}>{appData.name}</Text>
        <Text style={styles.cardDescription}>{appData.description}</Text>
        <AppTestersPresentation testersCount={appData.testersMin} />
        <Text style={styles.cardText}>Operating System: {appData.operatingSystem}</Text>
        <DeleteAppButton onPress={() => console.log("Delete app pressed")} />
      </View>
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
