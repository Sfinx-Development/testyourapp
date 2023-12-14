import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Card } from "react-native-paper";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import { useAppDispatch, useAppSelector } from "../store/store";

type NavigationProps = RootNavigationScreenProps<"MyApps">;

export default function MyApps({ navigation }: NavigationProps) {
  const user = useAppSelector((state) => state.userSlice.user);
  const dispatch = useAppDispatch();
  const activeAccount = useAppSelector(
    (state) => state.accountSlice.activeAccount
  );

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
        <Card elevation={2}>
          <Image
            source={{ uri: "https://i.imgur.com/YZem2E2.png" }}
            style={styles.cardImage}
          />
          <Text style={{ fontSize: 16 }}>GREENIFY</Text>
          <Text>
            An application that helps you to take care of the planet. Need 10
            testers to deploy it.
          </Text>
          <TouchableOpacity
            onPress={() => {
              console.log("HANTERA ANMÄLAN SOM TESTARE");
            }}
            style={{ padding: 20, backgroundColor: "white" }}
          >
            <Text>Sign up as tester</Text>
          </TouchableOpacity>
        </Card>
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
  header: {
    padding: 20,
    top: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logoutText: {
    color: "blue",
  },
  content: {
    padding: 20,
    top: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  optionText: {
    fontSize: 18,
  },
  cardImage: {
    width: 50,
    height: 50,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: "100%",
  },
});
