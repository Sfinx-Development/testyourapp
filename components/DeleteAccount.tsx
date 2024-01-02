import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Card } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";
import { UserCreate } from "../types";

interface Props {
  onClose: () => void;
  onDeleteConfirmed: ({ email, password }: UserCreate) => void;
}

export default function DeleteAccountModule(props: Props) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const { colors } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const closeModal = () => {
    setIsModalVisible(false);
    props.onClose();
  };

  if (!isModalVisible) {
    return null;
  }

  return (
    <Modal transparent={true} visible={isModalVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <Card style={{ alignContent: "center" }}>
          <BlurView intensity={100} style={styles.blurContainer}>
            <Text
              style={[
                styles.text,
                {
                  color: colors.button.lightBlue,
                  fontFamily: colors.fontFamily,
                },
              ]}
            >
              Enter your email and password to permanently delete your account
              and all information connected to your account.
            </Text>
            <TextInput
              style={[styles.input, { fontFamily: colors.fontFamily }]}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={colors.secondary}
            />

            <TextInput
              onChangeText={(text) => setPassword(text)}
              style={[styles.input, { fontFamily: colors.fontFamily }]}
              placeholder="Password"
              secureTextEntry
              placeholderTextColor={colors.secondary}
            />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  styles.buttonView,
                  { backgroundColor: colors.button.darkBlue },
                ]}
                onPress={() => props.onDeleteConfirmed({ email, password })}
              >
                <Text
                  style={[styles.button, { fontFamily: colors.fontFamily }]}
                >
                  Delete account
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.buttonView,
                  { backgroundColor: colors.button.darkBlue },
                ]}
                onPress={closeModal}
              >
                <Text
                  style={[styles.button, { fontFamily: colors.fontFamily }]}
                >
                  Go back
                </Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Card>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonView: {
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  button: { color: "white", fontSize: 20 },
  blurContainer: {
    flex: 1,
    padding: 20,
    margin: 16,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 20,
    maxWidth: "100%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    width: "100%",
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  popup: {
    width: 200,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
});
