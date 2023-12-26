// DeleteAppButton.tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "../contexts/themeContext";

interface DeleteAppButtonProps {
  onPress: () => void;
}

const DeleteAppButton: React.FC<DeleteAppButtonProps> = ({ onPress }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={[styles.text, { fontFamily: colors.fontFamily }]}>
        Delete App
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});

export default DeleteAppButton;
