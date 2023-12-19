import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import { addAppAsync } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { App } from "../types";

type NavigationProps = RootNavigationScreenProps<"UploadApp">;
export default function UploadApp({ navigation }: NavigationProps) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [linkToTest, setLinkToTest] = useState("");
  const [operatingSystem, setOperatingSystem] = useState(
    "Android" || "IOS" || "All"
  );
  const [imageUrl, setImageUrl] = useState("");
  const [testersMin, setTestersMin] = useState(1);

  const activeAccount = useAppSelector(
    (state) => state.accountSlice.activeAccount
  );

  const handleSaveApp = () => {
    if (activeAccount) {
      const appToSave: App = {
        id: "",
        name: name,
        description: description,
        linkToTest: linkToTest,
        imageUrl: imageUrl,
        operatingSystem: operatingSystem,
        accountId: activeAccount?.id,
        testersMin: testersMin,
      };
      dispatch(addAppAsync(appToSave)).then(() => {
        navigation.navigate("Menu");
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        autoCapitalize="none"
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        autoCapitalize="none"
        onChangeText={(text) => setDescription(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Operating system"
        autoCapitalize="none"
        onChangeText={(text) => setOperatingSystem(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Image url"
        autoCapitalize="none"
        onChangeText={(text) => setImageUrl(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Link to test"
        autoCapitalize="none"
        onChangeText={(text) => setLinkToTest(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount of testers (minimum)"
        autoCapitalize="none"
        keyboardType="numeric"
        onChange={(number) => setTestersMin(Number(number))}
      />

      <TouchableOpacity style={styles.button} onPress={handleSaveApp}>
        <Text style={styles.buttonText}>Ladda upp app</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: "100%",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  forgotPassword: {
    marginTop: 16,
  },
  forgotPasswordText: {
    color: "gray",
  },
});
