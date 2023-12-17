import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { App, TesterToApp } from "../types";

interface TesterConfirmCardProps {
  appName: string;
  testerUsername: string;
  testerId: string;
  testerMail: string;
  onClick: (appId: string) => void;
}

const AppCard: React.FC<TesterConfirmCardProps> = ({
  appName,
  testerUsername,
  testerId,
  testerMail,
  onClick,
}) => {
  useEffect(() => {
    console.log("i tester c...");
  }, []);
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={{ fontSize: 16, fontWeight: "bold" }}>{appName}</Title>
        <Paragraph>{testerUsername} wants to be a tester</Paragraph>
      </Card.Content>
      <Card.Actions>
        <View style={styles.linkContainer}>
          <Paragraph style={styles.link} onPress={() => onClick(testerId)}>
            I have added {testerMail} as a tester
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
