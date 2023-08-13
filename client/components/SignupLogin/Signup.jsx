import React, { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { useRoute } from '@react-navigation/native';
import {
  StyleSheet,
  Image,
  Button,
  Text,
  View,
  ScrollView as RNScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const Signup = () => {
  const route = useRoute();
  const role = route.params?.role; 
  console.log("role front:",role);
  const navigation = useNavigation()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [imgprof,setImgprof] = useState('')
  const [patente,setPatente]=useState('')
  const [category, setCategory] = useState([
    'electricien',
    'climatisation',
    'plombier',
    'transporteur',
    'peinture',
    'machine a laver',
    'menuisier',
    'camera',
  ]);

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
        setImageUrl(data.url);
        console.log(data);
      })
      .catch((err) => {
        Alert.alert('Error While Uploading');
      });
  };

  const photoProfile = async () => {
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

      if (!result.canceled) { 
        _uploadImage(result,setImgprof);
      }
    } catch (error) {
      console.log('Error taking photo:', error);
    }
  };

  const photoPatente = async () => {
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

      if (!result.canceled) { 
        _uploadImage(result,setPatente);
      }
    } catch (error) {
      console.log('Error taking photo:', error);
    }
  };

  const singUppp =  (username,password,email,imgprof,patente,category) => {
    const selectedCategory = category[0] || category[1];

    axios
      .post('http://192.168.1.7:3000/provider/signup', {
        username: username,
        email: email,
        password: password,
        imgprof: imgprof,
        patente: patente,
        category: selectedCategory,
      })
      .then((res) => {
        console.log(res.data);
        alert('Check your email for verification.');
        navigation.navigate('login',{role});
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data) {
          const errorMessage = err.response.data.error || 'Signup Failed';
          alert(errorMessage);
        } else {
          alert('Signup Failed');
        }
      });
  };

  const handleSignup = () => {
    singUppp(
      username,
      password,
      email,
      imgprof,
      patente,
      category
    );
  };
  const handleLoginPress = () => {
    navigation.navigate('login',{role}); 
  }
console.log("signup role:",role);
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        resizeMode="cover"
        source={require('../../assets/logo.png')}
      />
      <RNScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sng}>Sign Up</Text>
        <Text> please sign up to continue .. </Text>

        <View style={styles.inputContainer}>
          <AntDesign name="user" size={24} color="black" style={styles.icon} />
          <TextInput onChangeText={(val)=> setUsername(val)} style={styles.inp} placeholder="Username ..." />
        </View>

        <View style={styles.inputContainer}>
          <AntDesign name="mail" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.inp}
            placeholder="Email ..."
            keyboardType="email-address"
            defaultValue={email}
            onChangeText={(val)=> setEmail(val)} 
          />
        </View>

        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.inp}
            placeholder="Password ..."
            secureTextEntry
            defaultValue={password}
            onChangeText={(val)=> setPassword(val)} 
          />
        </View>

        <View style={styles.inputContainer}>
          <AntDesign
            name="picture"
            size={24}
            color="black"
            style={styles.icon}
          />
          <TouchableOpacity style={styles.photoInput} onPress={photoPatente}>
            <Text>Patente</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <AntDesign
            name="picture"
            size={24}
            color="black"
            style={styles.icon}
          />
          <TouchableOpacity style={styles.photoInput} onPress={photoProfile}>
            <Text>imageprofile</Text>
          </TouchableOpacity>
        </View>
        <SelectDropdown
          style={styles.drop}
          data={category}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item) => {
            return item;
          }}
        />

        <Button onPress={()=>handleSignup()} title="Sign Up" color="#FFA500" borderRadius={30} />

        <View>
      <Text>If you have an account, please</Text>
      <TouchableOpacity onPress={handleLoginPress}>
        <Text style={{ color: '#FFA500' }}>Login</Text>
      </TouchableOpacity>
    </View>

        <StatusBar style="auto" />
      </RNScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    marginVertical: 10,
    paddingHorizontal: 10,
  },
  drop: {},
  inp: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  sng: {
    fontSize: 24,
  },
  icon: {},
  img: {
    width: 463,
    height: 127,
    marginTop: 20,
  },
  photoInput: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
});

export default Signup;
