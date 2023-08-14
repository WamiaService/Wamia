import {View,Text,Image,TextInput,Button,TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native';



const ProviderPost = ({providerId}) => {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [desc, setDesc] = useState("");
const navigation=useNavigation()
  const info = {
    name: name,
    img: img,
    desc: desc,
  };
  const handleSubmit = () => {
    axios
      .post(`http://192.168.1.14:3000/service/post/${providerId}`, info)
      .then((res) => {
        console.log(res);
        navigation.navigate("providerprofile")
      })
      .catch((err) => {
        console.log(err);
      });
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
        setImg(data.url); // Update imgprof with the secure_url
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
        _uploadImage(result);
      }
    } catch (error) {
      console.log('Error selecting image from gallery:', error);
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={handleGalleryAccessProfile}>
        <Icon name="camera" size={85} color="black" />
      </TouchableOpacity>
      <View style={{ width: "80%", marginBottom: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="user" size={24} color="black" />
          <TextInput
            placeholder="Name"
            style={{ flex: 1, marginLeft: 10 }}
            value={name}
            onChangeText={setName}
          />
        </View>
        <TextInput
          placeholder="Description"
          style={{
            marginTop: 10,
            borderWidth: 1,
            borderRadius: 15,
            height: 113,
            textAlignVertical: "top",
            padding: 10,
          }}
          value={desc}
          onChangeText={setDesc}
          multiline
        />
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: "#FFA500",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 15,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ProviderPost;