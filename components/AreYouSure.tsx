import { BlurView } from "expo-blur";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-paper";
import { useTheme } from "../contexts/themeContext";

interface Props {
  errorMessage: string;
  buttonMessage1: string;
  buttonMessage2: string;
  appId: string | null;
  onClose: () => void;
  onDelete: (appId?: string) => void;
}

export default function AreYouSureModule(props: Props) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const { colors } = useTheme();

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
          <BlurView intensity={40} style={styles.blurContainer}>
            <Text style={[styles.text, { color: colors.secondary, fontFamily:colors.fontFamily }]}>
              {props.errorMessage}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  styles.buttonView,
                  { backgroundColor: colors.button.darkBlue },
                ]}
                onPress={() =>
                  props.appId ? props.onDelete(props.appId) : props.onDelete()
                }
              >
                <Text style={[styles.button, {fontFamily:colors.fontFamily}]}>{props.buttonMessage1}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.buttonView,
                  { backgroundColor: colors.button.darkBlue },
                ]}
                onPress={closeModal}
              >
                <Text style={[styles.button, {fontFamily:colors.fontFamily}]}>{props.buttonMessage2}</Text>
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
