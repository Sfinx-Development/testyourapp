import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import { FeedbackMessage } from "../types";
import { useTheme } from "../contexts/themeContext";

interface MessageCardProps {
  message: FeedbackMessage;
}

const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
  const { colors } = useTheme();

  return (
    <Card style={[styles.card, { backgroundColor: colors.secondary }]}>
      <Card.Content>
        <Title style={[styles.title, { color: colors.primary }]}>
          {message.appName.toUpperCase()}
        </Title>
        <Paragraph style={{ color: colors.button.lightBlue }}>{message.dateSent}</Paragraph>
        <Paragraph style={{ color:  colors.button.lightBlue }}>{message.message}</Paragraph>
        <Paragraph style={{ color:  colors.button.lightBlue}}>
          Feedback from {message.senderMail}
        </Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default MessageCard;
