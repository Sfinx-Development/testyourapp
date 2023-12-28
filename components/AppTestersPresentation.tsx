// AppTestersPresentation.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../contexts/themeContext";

interface AppTestersPresentationProps {
  testersCount: number;
}

const AppTestersPresentation: React.FC<AppTestersPresentationProps> = ({
  testersCount,
}) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          { color: colors.button.darkBlue, fontFamily: colors.fontFamily },
        ]}
      >
        {testersCount} Testers
      </Text>
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
