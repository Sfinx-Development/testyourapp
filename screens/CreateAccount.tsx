import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function CreateAccount() {
  return (
    <View style={styles.container}>
      <Text>CREATE ACCOUNT</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
