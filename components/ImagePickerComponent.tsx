import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../contexts/themeContext';

interface ImagePickerProps {
  onImageSelected: (uri: string) => void;
}

const ImagePickerComponent: React.FC<ImagePickerProps> = ({ onImageSelected }) => {
  const { colors } = useTheme();

  const handleImagePicker = async () => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled && result.assets.length > 0) {
      onImageSelected(result.assets[0].uri);
    } else {
      console.log('Error picking image or user cancelled');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.input} onPress={handleImagePicker}>
        <Text style={[styles.buttonText, { color: colors.button.darkBlue }]}>
          Select Image from Library
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    height: 50,
    width: '100%', 
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonText: {
   
    color: 'white',
  },
});

export default ImagePickerComponent;


