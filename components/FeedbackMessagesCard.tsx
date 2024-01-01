import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { App, FeedbackMessage, TesterToApp } from "../types";
import { useTheme } from "../contexts/themeContext";

interface FeedbackMessagesCardProps {
message:FeedbackMessage;
  onClick: (id: string) => void;
}

const FeedbackMessagesCard: React.FC<FeedbackMessagesCardProps> = ({
    message,
  onClick,
}) => {

  const { colors } = useTheme();
  return (
    <Card style={[styles.card, { backgroundColor: colors.button.lightBlue }]}>
      <Card.Content>
        <Title
          style={[
            { fontSize: 16, fontWeight: "bold" },
            { fontFamily: colors.fontFamily },
          ]}
        >
          {message.appName.toUpperCase()}
        </Title>
        <Paragraph>Feedback from {message.senderMail}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <TouchableOpacity style={styles.linkContainer}>
          <Paragraph
            style={[styles.link, { fontFamily: colors.fontFamily }]}
            onPress={() => onClick(message.id)}
          >
            Delete message
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
  link: {
    color: "blue",
    fontSize: 16,
  },
});

export default FeedbackMessagesCard;
