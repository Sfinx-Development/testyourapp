import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph, Title, IconButton } from "react-native-paper";
import { App } from "../types";

interface AppCardProps {
  app: App;
  isMyApp?: boolean;
  onRemove?: () => void;
  children?: React.ReactNode; // Add children prop
}

const AppCard: React.FC<AppCardProps> = ({ app, isMyApp, onRemove, children }) => {
  const { imageUrl, linkToTest, name, description, testersMin, operatingSystem } = app;

  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: imageUrl }} style={{ height: 100 }} />
      <Card.Content>
        <Title style={{ fontSize: 16, fontWeight: "bold" }}>{name}</Title>
        <Paragraph>{testersMin} Testers Needed</Paragraph>
        <Paragraph>{operatingSystem}</Paragraph>
        {description && <Paragraph>{description}</Paragraph>}
        {children} {/* Render children if provided */}
      </Card.Content>
      <Card.Actions>
        <View style={styles.linkContainer}>
          {!isMyApp && (
            <Paragraph
              style={styles.link}
              onPress={() => console.log("Sign up as a tester då i db?? eller hur ??")}
            >
              Test app
            </Paragraph>
          )}
          {isMyApp && onRemove && (
            <IconButton icon="delete" onPress={onRemove} />
          )}
        </View>
      </Card.Actions>
    </Card>
  );
}

interface MyAppCardProps extends AppCardProps {
  numTestersSignedUp: number;
}

const MyAppCard: React.FC<MyAppCardProps> = ({ app, numTestersSignedUp, onRemove }) => {
  return (
    <AppCard app={app} isMyApp onRemove={onRemove}>
      <Paragraph>{numTestersSignedUp} Testers Signed Up</Paragraph>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    flex: 1,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    color: "blue",
  },
});

export { AppCard, MyAppCard };


