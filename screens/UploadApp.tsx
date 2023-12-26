import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import { addAppAsync } from "../store/appSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { App } from "../types";

type NavigationProps = RootNavigationScreenProps<"UploadApp">;
export default function UploadApp({ navigation }: NavigationProps) {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [linkToTest, setLinkToTest] = useState("");
  const [operatingSystem, setOperatingSystem] = useState(
    "Android" || "IOS" || "All"
  );
  const [error, setErrorMsg] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [testersMin, setTestersMin] = useState(1);

  const activeAccount = useAppSelector(
    (state) => state.accountSlice.activeAccount
  );

  const handleSaveApp = () => {
    if (
      name == "" ||
      description == "" ||
      linkToTest == "" ||
      imageUrl == "" ||
      testersMin == null
    ) {
      setErrorMsg(true);
      return;
    }
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
        testersRegistered: 0,
      };
      dispatch(addAppAsync(appToSave)).then(() => {
        navigation.navigate("Menu");
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      {error ? (
        <Text style={styles.warningText}>All inputs are required.</Text>
      ) : null}

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
      <Text style={styles.warningText}>
        In this version, only Android is available as an operating system.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Operating system"
        autoCapitalize="none"
        value="Android"
        onChangeText={(text) => setOperatingSystem(text)}
        editable={false}
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

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.button.darkBlue }]}
        onPress={handleSaveApp}
      >
        <Text style={styles.buttonText}>Upload app</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  warningText: {
    color: "red",
    marginBottom: 10,
  },
  container: {
    flex: 1,
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
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
  forgotPassword: {
    marginTop: 16,
  },
  forgotPasswordText: {},
});
