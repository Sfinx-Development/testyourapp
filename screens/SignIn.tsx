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
import { logInUserAsync } from "../store/userSlice";

type NavigationProps = RootNavigationScreenProps<"SignIn">;

export default function SignIn({ navigation }: NavigationProps) {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loggedInUser = useAppSelector((state) => state.userSlice.user);
  const userError = useAppSelector((state) => state.userSlice.error);

  async function handleLogin() {
    dispatch(logInUserAsync({ email: email, password: password })).then(() => {
      if (userError) {
        setEmail("");
        setPassword("");
      } else if (loggedInUser) {
        console.log("INLOGGAD! : ", loggedInUser?.email);
      }
    });
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CreateAccount")}>
        <Text style={styles.buttonText}>Create account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
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
