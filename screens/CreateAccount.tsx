import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { addAccountAsync } from "../store/accountSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { addUserAsync } from "../store/userSlice";

export default function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [playStoreMail, setPlayStoreMail] = useState("");
  const [appStoreMail, setAppStoreMail] = useState("");
  const userCreated = useAppSelector((state) => state.userSlice.user);

  const dispatch = useAppDispatch();

  //FIXA SÅ ACCOUNT SKAPAS DIREKT NÄR USER HAR SKAPATS?!
  const handleCreateUser = async () => {
    console.log("PASSWORD: ", password, " OCH CONFIRM PSW: ", confirmPassword);
    if (password === confirmPassword) {
      try {
        // Anropa addUserAsync och få tillbaka användaren
        const userResponse = await dispatch(addUserAsync({ email, password }));

        // Om addUserAsync lyckades, kör addAccountAsync med användarinformationen
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
        } else {
          console.log("Failed to add user");
          // Hantera fel här om det behövs
        }
      } catch (error) {
        console.error("Error creating user:", error);
        // Hantera fel här om det behövs
      }
    } else {
      console.log("fixa validering för lösen som inte stämmer som nu :)");
    }
  };

  useEffect(() => {
    if (userCreated) {
      //när user har satts efter att adduserasync har körts, så en useeffec med user som dependency?
      dispatch(
        addAccountAsync({
          id: "",
          username: username,
          playStoreMail: playStoreMail,
          appStoreMail: appStoreMail,
          uid: userCreated.uid,
        })
      );
    }
  }, [userCreated]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dina uppgifter för att logga in</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        onChangeText={(text) => setUsername(text)}
      />

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
      <TextInput
        onChangeText={(text) => setConfirmPassword(text)}
        style={styles.input}
        placeholder="Lösenord"
        secureTextEntry
      />

      <Text style={styles.subTitle}>
        Den mail du är inloggad på i play store och/eller app store
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email for your play store (ANDROID)"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setPlayStoreMail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email for your app store (IOS)"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={(text) => setAppStoreMail(text)}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleCreateUser();
        }}
      >
        <Text style={styles.buttonText}>Skapa konto</Text>
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
