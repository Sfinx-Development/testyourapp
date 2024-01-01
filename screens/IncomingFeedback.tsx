import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FeedbackMessagesCard from "../components/FeedbackMessagesCard";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import { useAppDispatch, useAppSelector } from "../store/store";
import { FeedbackMessage } from "../types";

type NavigationProps = RootNavigationScreenProps<"IncomingFeedback">;

export default function IncomingFeedback({ navigation }: NavigationProps) {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const activeAccount = useAppSelector(
    (state) => state.accountSlice.activeAccount
  );
  const incomingFeedback = useAppSelector(
    (state) => state.feedbackSlice.incomingFeedback
  );

  const renderAppCard = ({ item }: { item: FeedbackMessage }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("FeedbackMessage", { id: item.id });
      }}
    >
      <FeedbackMessagesCard
        message={item}
        onClick={() => console.log("click")}
      />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      {incomingFeedback.length > 0 ? (
        <FlatList
          data={incomingFeedback}
          renderItem={renderAppCard}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
        />
      ) : (
        <Text
          style={[
            {
              fontSize: 20,
              top: 100,
              textAlign: "center",
            },
            { color: colors.secondary, fontFamily: colors.fontFamily },
          ]}
        >
          No incoming messages
        </Text>
      )}
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
