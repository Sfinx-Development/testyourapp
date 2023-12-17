// DeleteAppButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface DeleteAppButtonProps {
  onPress: () => void;
}

const DeleteAppButton: React.FC<DeleteAppButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>Delete App</Text>
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
