import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { App } from "../types";

interface AppCardProps {
  app: App;
  onClick: (appId: string) => void;
  appsImTesting: App[] | [];
}

const AppCard: React.FC<AppCardProps> = ({ app, onClick, appsImTesting }) => {
  const { imageUrl, name, testersMin, operatingSystem } = app;
  const isTester = appsImTesting.some((testedApp) => testedApp.id === app.id);
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: imageUrl }} style={{ height: 100 }} />
      <Card.Content>
        <Title style={{ fontSize: 16, fontWeight: "bold" }}>{name}</Title>
        <Paragraph>{testersMin} Testers Needed</Paragraph>
        <Paragraph>{operatingSystem}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <View style={styles.linkContainer}>
          <Paragraph style={styles.link} onPress={() => onClick(app.id)}>
            {isTester ? "You are a tester" : "Test app"}
          </Paragraph>
        </View>
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
  link: {
    color: "blue",
  },
});

export default AppCard;
