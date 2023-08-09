import React, { useState } from 'react';
import { View, Text, Button, Modal, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const Test2 = ({ id }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

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
      toggleModal(); // Close the modal after submitting
    } catch (err) {
      console.log(err);
    }
  };

  const _uploadImage = (photo, setImageUrl) => {
    const data = new FormData();
    data.append('file', {
      uri: photo.assets[0].uri,
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
        setImage(data.url);
        console.log(data);
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
        _uploadImage(result, setImage);
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
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.uploadButton} 
            onPress={handleGalleryAccessProfile}   
          >
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : null}
          <TextInput
            placeholder="Description"
            value={desc}
            onChangeText={setDesc}
            style={styles.input}
          />
          <Button title="Save" onPress={handleSubmit} />
          <Button title="Cancel" onPress={toggleModal} />
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
    padding: 16,
    borderRadius: 8,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  updateButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'blue',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    width: '100%',
  },
  customButton: {
    backgroundColor: 'blue', // Customize the background color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white', // Customize the text color
  }
});

export default Test2;
