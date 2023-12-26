import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import { useAppDispatch, useAppSelector } from "../store/store";
import { handleForgotPasswordAsync, logInUserAsync } from "../store/userSlice";
import { useTheme } from "../contexts/themeContext";

type NavigationProps = RootNavigationScreenProps<"ForgotPassword">;

export default function ForgotPassword({ navigation }: NavigationProps) {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");

  const userError = useAppSelector((state) => state.userSlice.error);

  async function handleForgotPassword() {
    dispatch(handleForgotPasswordAsync(email)).then(
        () => {
            navigation.navigate("SignIn")
        }
    )
  }
  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
   <Text style={[styles.title, { color: colors.secondary, fontFamily:colors.fontFamily  }]}>Forgot your password?</Text>

      <TextInput
        style={[styles.input, { fontFamily:colors.fontFamily }]}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.button.darkBlue }]}
        onPress={handleForgotPassword}
      >
        <Text style={[styles.buttonText,  { fontFamily:colors.fontFamily }]}>Reset my password</Text>
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
    borderRadius: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
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
