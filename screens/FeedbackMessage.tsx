import { useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import MessageCard from "../components/MessageCard";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import { useAppSelector } from "../store/store";

type NavigationProps = RootNavigationScreenProps<"FeedbackMessage">;

export default function FeedbackMessage({
  navigation,
  route,
}: NavigationProps) {
  const { colors } = useTheme();
  const { id } = route.params;
  const incomingFeedback = useAppSelector(
    (state) => state.feedbackSlice.incomingFeedback
  );
  const messageToPresent = incomingFeedback.find((message) => message.id == id);

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      {messageToPresent ? (
        <MessageCard message={messageToPresent}></MessageCard>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  flatListContainer: {
    justifyContent: "space-between",
  },
  header: {
    padding: 20,
    top: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logoutText: {
    color: "blue",
  },
  content: {
    padding: 20,
    top: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  option: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  optionText: {
    fontSize: 18,
  },
  cardImage: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: "100%",
  },
});
