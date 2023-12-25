import React from "react";
import { StyleSheet, TouchableOpacity, Text, Linking } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { App } from "../types";

interface AppTestingCardProps {
  app: App;
  onClick: () => void;
}

const AppImTestingCard: React.FC<AppTestingCardProps> = ({ app, onClick }) => {
  const { imageUrl, name, testersMin, operatingSystem, linkToTest } = app;

  const handleOpenLink = async () => {
    try {
      await Linking.openURL(linkToTest);
    } catch (error) {
      console.error("Error opening URL: ", error);
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: imageUrl }} style={{ height: 100 }} />
      <Card.Content>
        <Title style={{ fontSize: 16, fontWeight: "bold" }}>{name}</Title>
        <TouchableOpacity onPress={handleOpenLink} style={styles.linkContainer}>
          <Text style={{ color: "blue" }}>Click here to download app</Text>
        </TouchableOpacity>
      </Card.Content>
      <Card.Actions>
        <TouchableOpacity style={styles.linkContainer}>
          <Paragraph style={{ color: "blue" }} onPress={() => onClick()}>
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
    flex: 1,
  },
  linkContainer: {
    alignItems: "flex-end",
  },
});

export default AppImTestingCard;
