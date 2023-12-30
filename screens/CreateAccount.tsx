import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import { addAccountAsync } from "../store/accountSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { addUserAsync, resetUser } from "../store/userSlice";

type NavigationProps = RootNavigationScreenProps<"CreateAccount">;

export default function CreateAccount({ navigation }: NavigationProps) {
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [playStoreMail, setPlayStoreMail] = useState("");
  const [appStoreMail, setAppStoreMail] = useState("");
  const userCreated = useAppSelector((state) => state.userSlice.user);
  const userCreatedError = useAppSelector((state) => state.userSlice.error);
  const [error, setErrorMsg] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useAppDispatch();

  //FIXA SÅ ACCOUNT SKAPAS DIREKT NÄR USER HAR SKAPATS?!
  const handleCreateUser = async () => {
    if (
      playStoreMail == "" ||
      playStoreMail == undefined ||
      playStoreMail == null
    ) {
      setErrorMsg(true);
      return;
    }
    if (password === confirmPassword) {
      try {
        const userResponse = await dispatch(addUserAsync({ email, password }));
        if (addUserAsync.fulfilled.match(userResponse)) {
          const addedUser = userResponse.payload;
          dispatch(
            addAccountAsync({
              id: "",
              username,
              playStoreMail,
              appStoreMail,
              uid: addedUser.uid,
            })
          );
          if (userCreated) {
            dispatch(resetUser(userCreated));
          }
        } else {
          console.log("Failed to add user");
        }
      } catch (error) {
        console.error("Error creating user:", error);
      }
    } else {
      setPasswordError(true);
    }
  };

  // useEffect(() => {
  //   if (userCreated) {
  //     //när user har satts efter att adduserasync har körts, så en useeffec med user som dependency?
  //     dispatch(
  //       addAccountAsync({
  //         id: "",
  //         username: username,
  //         playStoreMail: playStoreMail,
  //         appStoreMail: appStoreMail,
  //         uid: userCreated.uid,
  //       })
  //     ).then(() => navigation.navigate("SignIn"));
  //   }
  // }, [userCreated]);

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <Text
        style={[
          styles.title,
          { color: colors.button.lightBlue, fontFamily: colors.fontFamily },
        ]}
      >
        Create account
      </Text>

      {userCreatedError ? (
        <Text style={[styles.warningText, { fontFamily: colors.fontFamily }]}>
          {userCreatedError}
        </Text>
      ) : null}

      <TextInput
        style={[
          styles.input,
          { fontFamily: colors.fontFamily, color: colors.button.darkBlue },
        ]}
        placeholder="Username"
        autoCapitalize="none"
        placeholderTextColor={colors.button.darkBlue}
        onChangeText={(text) => setUsername(text)}
      />

      <TextInput
        style={[styles.input, { fontFamily: colors.fontFamily }]}
        placeholder="E-postadress"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={colors.button.darkBlue}
        onChangeText={(text) => setEmail(text)}
      />

      {passwordError ? (
        <Text style={[styles.warningText, { fontFamily: colors.fontFamily }]}>
          Passwords does not match.
        </Text>
      ) : null}

      <TextInput
        onChangeText={(text) => setPassword(text)}
        style={[styles.input, { fontFamily: colors.fontFamily }]}
        placeholder="Lösenord"
        placeholderTextColor={colors.button.darkBlue}
        secureTextEntry
      />
      <TextInput
        onChangeText={(text) => setConfirmPassword(text)}
        style={[styles.input, { fontFamily: colors.fontFamily }]}
        placeholder="Lösenord"
        placeholderTextColor={colors.button.darkBlue}
        secureTextEntry
      />

      {error ? (
        <Text style={[styles.warningText, { fontFamily: colors.fontFamily }]}>
          In this version, only android operating system is being handled.
          Please enter your email for play store.
        </Text>
      ) : null}

      <TextInput
        style={[styles.input, { fontFamily: colors.fontFamily }]}
        placeholder="Email for your play store (ANDROID)"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={colors.button.darkBlue}
        onChangeText={(text) => setPlayStoreMail(text)}
      />

      <TextInput
        style={[styles.input, { fontFamily: colors.fontFamily }]}
        placeholder="Email for your app store (IOS)"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={colors.button.darkBlue}
        onChangeText={(text) => setAppStoreMail(text)}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.button.darkBlue }]}
        onPress={() => {
          handleCreateUser();
        }}
      >
        <Text style={[styles.buttonText, { fontFamily: colors.fontFamily }]}>
          Create account
        </Text>
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
  subTitle: {
    fontSize: 20,
    marginBottom: 10,
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
  warningText: {
    color: "red",
    marginBottom: 10,
  },
});
