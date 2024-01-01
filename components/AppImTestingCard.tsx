import React from "react";
import { Linking, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";
import { App } from "../types";

interface AppTestingCardProps {
  app: App;
  onClick: () => void;
  onSendMessage: () => void;
}

const AppImTestingCard: React.FC<AppTestingCardProps> = ({
  app,
  onClick,
  onSendMessage,
}) => {
  const { imageUrl, name, linkToTest } = app;
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
      <Card.Cover source={{ uri: imageUrl }} style={styles.cardCover} />
      <Card.Content>
        <Title style={[styles.title, { color: colors.primary }]}>
          {name.toUpperCase()}
        </Title>
        <TouchableOpacity onPress={handleOpenLink} style={styles.linkContainer}>
          <Text style={[styles.linkText, { color: colors.secondary }]}>
            Click here to download app
          </Text>
        </TouchableOpacity>
      </Card.Content>
      <Card.Actions>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.button.red }]}
          onPress={() => onClick()}
        >
          <Paragraph style={styles.actionButtonText}>
            Remove me as tester
          </Paragraph>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: colors.button.darkBlue },
          ]}
          onPress={() => onSendMessage()}
        >
          <Paragraph style={styles.actionButtonText}>Send Feedback</Paragraph>
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    flex: 1 / 2,
    borderRadius: 10,
    overflow: "hidden",
  },
  cardCover: {
    height: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  linkContainer: {
    alignItems: "flex-start",
    marginTop: 10,
  },
  linkText: {
    fontSize: 18,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 5,
    paddingVertical: 5,
  },
  actionButtonText: {
    fontSize: 12,
    color: "white",
  },
});

export default AppImTestingCard;
