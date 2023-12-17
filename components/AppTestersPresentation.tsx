// AppTestersPresentation.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface AppTestersPresentationProps {
  testersCount: number;
}

const AppTestersPresentation: React.FC<AppTestersPresentationProps> = ({ testersCount }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{testersCount} Testers</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    color: "#555",
  },
});

export default AppTestersPresentation;




