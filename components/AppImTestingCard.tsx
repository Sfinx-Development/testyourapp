import React from "react";
import { Linking, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";
import { App } from "../types";

interface AppTestingCardProps {
  app: App;
  onClick: () => void;
}

const AppImTestingCard: React.FC<AppTestingCardProps> = ({ app, onClick }) => {
  const { imageUrl, name, testersMin, operatingSystem, linkToTest } = app;
  const { colors } = useTheme();

  const handleOpenLink = async () => {
    try {
      await Linking.openURL(linkToTest);
    } catch (error) {
      console.error("Error opening URL: ", error);
    }
  };

  return (
    <Card style={[styles.card, { backgroundColor: colors.button.lightBlue }]}>
      <Card.Cover source={{ uri: imageUrl }} style={{ height: 100 }} />
      <Card.Content>
        <Title
          style={[
            { fontSize: 16, fontWeight: "bold" },
            { fontFamily: colors.fontFamily },
          ]}
        >
          {name.toUpperCase()}
        </Title>
        <TouchableOpacity
          onPress={handleOpenLink}
          style={styles.linkContainerCenter}
        >
          <Text
            style={[
              { fontSize: 18 },
              { color: colors.secondary, fontFamily: colors.fontFamily },
            ]}
          >
            Click here to download app
          </Text>
        </TouchableOpacity>
      </Card.Content>
      <Card.Actions>
        <TouchableOpacity
          style={[styles.linkContainer, { backgroundColor: colors.button.red }]}
          onPress={() => onClick()}
        >
          <Paragraph
            style={[
              { fontSize: 12, color: "white" },
              { fontFamily: colors.fontFamily },
            ]}
          >
            Remove me as tester
          </Paragraph>
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    flex: 1 / 2,
  },
  linkContainer: {
    alignItems: "flex-start",
    borderRadius: 5,
    padding: 2,
  },
  linkContainerCenter: {
    alignItems: "center",
  },
});

export default AppImTestingCard;
