import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import { getAccountByUidAsync } from "../store/accountSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logInUserAsync } from "../store/userSlice";

type NavigationProps = RootNavigationScreenProps<"SignIn">;

export default function SignIn({ navigation }: NavigationProps) {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useAppSelector(state => state.userSlice.user)

  const loggedInUser = useAppSelector((state) => state.userSlice.user);
  const userError = useAppSelector((state) => state.userSlice.error);

  async function handleLogin() {
    dispatch(logInUserAsync({ email: email, password: password }))
      .then(() => {
        if (userError) {
          setEmail("");
          setPassword("");
        } else if (loggedInUser) {
          console.log("INLOGGAD! : ", loggedInUser?.email);
        }
      })
      .then(() => {
        if(user){
          dispatch(getAccountByUidAsync(user.uid));
        }
      });
  }
  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <Image
          source={require("../assets/title.png")}
          style={styles.image}
          resizeMode="contain"
        /> */}
        <Text style={[styles.title, { color: colors.button.lightBlue }]}>
          Test Your App
        </Text>
        <Image
          source={require("../assets/phone.png")}
          style={styles.phoneImage}
          resizeMode="center"
        />
      </View>
      <Text style={[styles.subtitle, { color: colors.button.lightBlue }]}>
        Gather testers for your mobile app!
      </Text>
      <TextInput
        style={[styles.input, { fontFamily: colors.fontFamily }]}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={colors.button.darkBlue}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        onChangeText={(text) => setPassword(text)}
        style={[styles.input, { fontFamily: colors.fontFamily }]}
        placeholder="Password"
        placeholderTextColor={colors.button.darkBlue}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.button.darkBlue }]}
        onPress={handleLogin}
      >
        <Text style={[styles.buttonText, { fontFamily: colors.fontFamily }]}>
          Sign in
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.button.lightBlue }]}
        onPress={() => navigation.navigate("CreateAccount")}
      >
        <Text style={[styles.buttonText, { fontFamily: colors.fontFamily }]}>
          Create account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Text
          style={[styles.forgotPasswordText, { fontFamily: colors.fontFamily }]}
        >
          Forgot password?
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "500",
    marginBottom: 0,
    marginRight: 5,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 50,
    marginLeft: 10,
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
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  image: {
    width: 250,
    height: 100,
    marginRight: 0,
  },
  phoneImage: {
    width: 50,
    height: 100,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 16,
  },
  forgotPasswordText: {
    color: "gray",
  },
});
