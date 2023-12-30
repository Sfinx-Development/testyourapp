import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
  const [testersMin, setTestersMin] = useState<number>(1);

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
      console.log("TESTERS MIN: ", testersMin);
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.primary },
        ]}
      >
        {error ? (
          <Text style={styles.warningText}>All inputs are required.</Text>
        ) : null}

        <TextInput
          style={[
            styles.input,
            { fontFamily: colors.fontFamily, color: colors.button.darkBlue },
          ]}
          placeholder="Name"
          autoCapitalize="none"
          placeholderTextColor={colors.button.darkBlue}
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          style={[
            styles.input,
            { fontFamily: colors.fontFamily, color: colors.button.darkBlue },
          ]}
          placeholderTextColor={colors.button.darkBlue}
          placeholder="Description"
          autoCapitalize="none"
          onChangeText={(text) => setDescription(text)}
        />
        <Text style={[styles.warningText, { fontFamily: colors.fontFamily }]}>
          In this version, only Android is available as an operating system.
        </Text>
        <TextInput
          style={[
            styles.input,
            { fontFamily: colors.fontFamily, color: colors.button.red },
          ]}
          placeholder="Operating system"
          autoCapitalize="none"
          value="Android"
          onChangeText={(text) => setOperatingSystem(text)}
          editable={false}
        />

        <TextInput
          style={[
            styles.input,
            { fontFamily: colors.fontFamily, color: colors.button.darkBlue },
          ]}
          placeholderTextColor={colors.button.darkBlue}
          placeholder="Image url"
          autoCapitalize="none"
          onChangeText={(text) => setImageUrl(text)}
        />

        <TextInput
          style={[
            styles.input,
            { fontFamily: colors.fontFamily, color: colors.button.darkBlue },
          ]}
          placeholderTextColor={colors.button.darkBlue}
          placeholder="Link to test"
          autoCapitalize="none"
          onChangeText={(text) => setLinkToTest(text)}
        />

        <TextInput
          style={[
            styles.input,
            { fontFamily: colors.fontFamily, color: colors.button.darkBlue },
          ]}
          placeholderTextColor={colors.button.darkBlue}
          placeholder="Amount of testers needed (minimum)"
          autoCapitalize="none"
          keyboardType="numeric"
          onChangeText={(text) => setTestersMin(Number(text))}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.button.darkBlue }]}
          onPress={handleSaveApp}
        >
          <Text style={[styles.buttonText, { fontFamily: colors.fontFamily }]}>
            Upload App
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
    height: 50,
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
