import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-paper";
import { BlurView } from "expo-blur";
import { useTheme } from "../contexts/themeContext";

interface Props {
  errorMessage: string;
  buttonMessage: string;
  onClose: () => void;
}

export default function ErrorModule(props: Props) {
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
            <Text style={[styles.text, {fontFamily:colors.fontFamily}]}>{props.errorMessage}</Text>
            <TouchableOpacity
              style={[
                styles.buttonView,
                { backgroundColor: colors.button.darkBlue },
              ]}
              onPress={closeModal}
            >
              <Text style={[styles.button, {fontFamily:colors.fontFamily}]}>{props.buttonMessage}</Text>
            </TouchableOpacity>
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
