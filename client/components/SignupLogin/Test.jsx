import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Modal, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Cloud = () => {
  const [picture, setPicture] = useState('');
  const [modal, setModal] = useState(false);

  const _uploadImage = (photo) => {
    const data = new FormData();
    data.append('file', {
      uri: photo.assets[0].uri, // Access the selected asset through the assets array
      type: 'image/jpg',
      name: 'image.jpg',
    });
    data.append('upload_preset', 'phoneProduct');
    data.append('cloud_name', 'dgcdmrj7x');
    fetch('https://api.cloudinary.com/v1_1/dgcdmrj7x/image/upload', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPicture(data.url);
        setModal(false);
        console.log(data);
      })
      .catch((err) => {
        Alert.alert('Error While Uploading');
      });
  };

  const handleGalleryAccess = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Gallery permission denied');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1.0,
      });

      if (!result.canceled) { // Use "canceled" instead of "cancelled"
        _uploadImage(result);
      }
    } catch (error) {
      console.log('Error selecting image from gallery:', error);
    }
  };

  const _takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        console.log('Camera permission denied');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1.0,
      });

      if (!result.canceled) { // Use "canceled" instead of "cancelled"
        _uploadImage(result);
      }
    } catch (error) {
      console.log('Error taking photo:', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.bottomButtonContainer}>
          <Button
            title={picture ? 'Image Uploaded' : 'Upload Image'}
            style={styles.input}
            onPress={() => setModal(true)}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => setModal(false)}
        >
          <View style={styles.modalView}>
            <View style={styles.buttonModalView}>
              <Button title="Camera" style={styles.input} onPress={_takePhoto} />
              <Button title="Gallery" style={styles.input} onPress={handleGalleryAccess} />
            </View>
            <Button title="Cancel" style={styles.input} onPress={() => setModal(false)} />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    margin: 6,
  },
  buttonModalView: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  modalView: {
    position: 'absolute',
    bottom: 2,
    width: '100%',
    height: 120,
  },
  bottomButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
  },
});

export default Cloud;
