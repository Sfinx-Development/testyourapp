import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { App } from "../types";

interface AppCardProps {
  app: App;
}

const AppCard: React.FC<AppCardProps> = ({ app }) => {
  const {
    imageUrl,
    linkToTest,
    name,
    description,
    testersMin,
    operatingSystem,
  } = app;

  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: imageUrl }} style={{ height: 100 }} />
      <Card.Content>
        <Title style={{ fontSize: 16, fontWeight: "bold" }}>{name}</Title>
        {/* <Paragraph>{description}</Paragraph> */}
        <Paragraph>{testersMin} Testers Needed</Paragraph>
        <Paragraph>{operatingSystem}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <View style={styles.linkContainer}>
          <Paragraph
            style={styles.link}
            onPress={() =>
              console.log("Sign up as tester då i db?? eller hur ??")
            }
          >
            Test app
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
