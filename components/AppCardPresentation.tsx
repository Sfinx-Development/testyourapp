import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { App } from "../types";
import MyApps from "../screens/MyApps";

interface AppCardProps {
  app: App;
  onClick: (appId: string) => void;
  appsImTesting: App[] | [];
  myApps: App[] | [];
}
const AppCard: React.FC<AppCardProps> = ({
  app,
  onClick,
  appsImTesting,
  myApps,
}) => {
  const { imageUrl, name, testersMin, operatingSystem } = app;
  const isTester = appsImTesting.some((testedApp) => testedApp.id === app.id);
  const isMyApp = myApps.some((myApp) => myApp.id === app.id);

  const handlePress = () => {
    if (isTester || isMyApp) {
      return;
    } else {
      onClick(app.id);
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: imageUrl }} style={{ height: 100 }} />
      <Card.Content>
        <Title style={{ fontSize: 16, fontWeight: "bold" }}>{name}</Title>
        <Paragraph>{testersMin} Testers Needed</Paragraph>
        <Paragraph>{operatingSystem}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <TouchableOpacity style={styles.linkContainer}>
          <Paragraph
            style={{ color: isMyApp ? "grey" : "blue" }}
            onPress={() => handlePress()}
          >
            {isTester ? "You are a tester" : "Test app"}
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

export default AppCard;
