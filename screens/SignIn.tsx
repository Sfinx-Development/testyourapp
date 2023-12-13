import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logInUserAsync } from "../store/userSlice";

export default function SignIn() {
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
      <Text style={styles.title}>Logga in</Text>

      <TextInput
        style={styles.input}
        placeholder="E-postadress"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        placeholder="Lösenord"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Logga in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>Glömt lösenord?</Text>
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
