import React, { useState } from 'react';
import { View, Text, Button, Modal, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker'

const updateService = ({ id ,onUpdate }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [updateCount, setUpdateCount] = useState(0)
  const [isModalVisible, setModalVisible] = useState(false);
console.log(image)
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const info = {
    name: name,
    image: image,
    desc: desc,
  };

  const handleSubmit = async () => { 
    try {
      await axios.put(`http://192.168.1.14:3000/service/update/${id}`, info);
      toggleModal();// Close the modal after submitting
      onUpdate() 
      // fetch()
    } catch (err) {
      console.log(err);
    }
  };

  const _uploadImage = (photo) => {
    const data = new FormData();
    data.append('file', {
      uri: photo.assets[0].uri,
      type: 'image/jpg',
      name: 'image.jpg',
    });
    data.append('upload_preset', 'phoneProduct');
    data.append('cloud_name', 'dgcdmrj7x');
    return fetch('https://api.cloudinary.com/v1_1/dgcdmrj7x/image/upload', {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data.url); 
        console.log("data",data);
      })
      .catch((err) => {
        Alert.alert('Error While Uploading');
      });
  };

  const handleGalleryAccessProfile = async () => {
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

      if (!result.cancelled) {
        _uploadImage(result);
      }
    } catch (error) {
      console.log('Error selecting image from gallery:', error);
    }
  };

  return (
    <View>
    <TouchableOpacity style={styles.customButton} onPress={toggleModal}>
      <Text style={styles.buttonText}>Update</Text>
    </TouchableOpacity>

    <Modal
      visible={isModalVisible}
      onRequestClose={toggleModal}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>

          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleGalleryAccessProfile}
          >
            <Text style={styles.uploadButtonText}>Upload Image</Text>
          </TouchableOpacity>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : null}
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
      
          <TextInput
            placeholder="Description"
            value={desc}
            onChangeText={setDesc}
            style={styles.input}
          />
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={toggleModal}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  </View>
  );
};




const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 320,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    width: '100%',
    borderRadius: 15,
  },
  customButton: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  uploadButton: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  uploadButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '45%',
  },
  saveButton: {
    backgroundColor: '#FFA500',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '45%',
  },
});

export default updateService;
