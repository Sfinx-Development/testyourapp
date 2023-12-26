import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { App } from "../types";
import { useTheme } from "../contexts/themeContext";

interface AppCardProps {
  app: App;
  onClick: (appId: string) => void;
  appsImTesting: App[] | [];
  myApps: App[] | [];
  testersNeeded: number;
}

const AppCard: React.FC<AppCardProps> = ({
  app,
  onClick,
  appsImTesting,
  myApps,
  testersNeeded,
}) => {
  const { imageUrl, name, testersMin, operatingSystem } = app;
  const isTester = appsImTesting.some((testedApp) => testedApp.id === app.id);
  const isMyApp = myApps.some((myApp) => myApp.id === app.id);
  const { colors } = useTheme();

  const handlePress = () => {
    if (isTester || isMyApp) {
      return;
    } else {
      onClick(app.id);
    }
  };

  return (
    <Card style={[styles.card, { backgroundColor: colors.button.lightBlue }]}>
      <Card.Cover source={{ uri: imageUrl }} style={styles.cardCover} />
      <Card.Content>
        <Title style={[styles.cardTitle, { fontFamily: colors.fontFamily }]}>
          {name.toUpperCase()}
        </Title>
        <Paragraph>{testersNeeded} TESTERS NEEDED</Paragraph>
        <Paragraph>{operatingSystem.toUpperCase()}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <TouchableOpacity style={styles.linkContainer}>
          <Paragraph
            style={[
              styles.linkText,
              {
                color: isMyApp || isTester ? colors.primary : colors.secondary,
                fontFamily: colors.fontFamily,
              },
            ]}
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
    flex: 1 / 2,
    borderRadius: 10,
    overflow: "hidden",
  },
  cardCover: {
    height: 100,
    resizeMode: "cover",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  linkContainer: {
    alignItems: "flex-end",
  },
  linkText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default AppCard;
