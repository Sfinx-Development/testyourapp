import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../contexts/themeContext";
import { RootNavigationScreenProps } from "../navigation/RootNavigator";
import { useAppDispatch, useAppSelector } from "../store/store";
import { FeedbackMessage } from "../types";
import { sendFeedbackAsync } from "../store/feedbackSlice";

type NavigationProps = RootNavigationScreenProps<"SendFeedback">;
export default function SendFeeback({ navigation, route }: NavigationProps) {
  const { id } = route.params;
  const { colors } = useTheme();
  const appsImTesting = useAppSelector((state) => state.appSlice.appsImTesting);
  const appsToGiveFeedback = appsImTesting.find((app) => app.id);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState(appsToGiveFeedback?.name);
  const activeAccount = useAppSelector(
    (state) => state.accountSlice.activeAccount
  );
  const dispatch = useAppDispatch();
  const getFormattedDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const handleSendMessage = () => {
    if (activeAccount && activeAccount.playStoreMail && title) {
      const newMessage: FeedbackMessage = {
        id: "",
        message: message,
        //FIXA DENNA
        testerToAppId: "",
        senderMail: activeAccount.playStoreMail,
        appName: title,
        developerId: activeAccount.id,
        dateSent: getFormattedDate(),
        appId: id,
        senderId: activeAccount.id,
        isRead: false,
      };
      dispatch(sendFeedbackAsync(newMessage)).then(() => {
        navigation.navigate("Menu");
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <Text style={styles.title}>Send Constructive Feedback</Text>
      <Text style={styles.subtitle}>
        Provide constructive feedback to help the developer improve their app.
        Avoid offensive language and focus on helpful suggestions for
        enhancement.
      </Text>
      <TextInput
        style={[styles.input, { fontFamily: colors.fontFamily }]}
        placeholder={title}
        autoCapitalize="none"
        placeholderTextColor={colors.button.darkBlue}
        editable={false}
      />
      <TextInput
        style={[styles.multiLineInput, { fontFamily: colors.fontFamily }]}
        placeholder="Feedback"
        autoCapitalize="none"
        placeholderTextColor={colors.button.darkBlue}
        onChangeText={(text) => setMessage(text)}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        onSubmitEditing={() => Keyboard.dismiss()}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.button.lightBlue }]}
        onPress={() => handleSendMessage()}
      >
        <Text style={[styles.buttonText, { fontFamily: colors.fontFamily }]}>
          Send Message
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "500",
    marginBottom: 0,
    marginRight: 5,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 50,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 10,
  },
  multiLineInput: {
    height: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 10,
    fontSize: 16,
  },
});
