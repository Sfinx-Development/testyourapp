import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";
import { colors } from "react-native-elements";
import { useTheme } from "../contexts/themeContext";

export default function SplashScreen() {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <Image source={require("../assets/phone.png")} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: "auto",
  },
});
