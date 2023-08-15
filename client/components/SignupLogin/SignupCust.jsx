import React, { useState } from 'react';
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
import { useRoute } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const SignupCust = () => {
  const navigation = useNavigation()
  const route = useRoute();

  const role = route.params?.role; 
  console.log("role signupCus:",role);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [imgprof,setImgprof] = useState('')
    const [identity,setIdentity]=useState('')
    const [adresse,setAdresse]=useState('')




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
    const photoIdentity = async () => {
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
          _uploadImage(result,setIdentity);
        }
      } catch (error) {
        console.log('Error taking photo:', error);
      }
    };
    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    

const isValidPassword = (password) => {
      return /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password);
    }
    const singUppp =  (username,password,email,imgprof,identity,adresse) => {
      if (!isValidEmail(email)) {
        // Invalid email format
        Alert.alert('Invalid email format');
        return;
      }else if (!isValidPassword(password)){
        Alert.alert('Password must contain at least one letter and one number, and be at least 6 characters long');
        return;
      }
           axios.post('http://192.168.104.5:3000/custumor/signup', { username :username, email:email, password:password , imgprof:imgprof,identity:identity,adresse:adresse })
          .then((res)=>{
    console.log(res.data);
            alert('check yore mail')
            navigation.navigate('loginc');
          }).catch((err)=>{
            
            console.log(err);
          })
        
      };
      const handleSignup = () => {
        singUppp(
         username,
         password,
         email,
         imgprof,
         identity,
         adresse
        );
      };
      const handleLoginPress = () => {
        navigation.navigate('loginc',{role}); 
      }
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
        <TextInput
          style={styles.inp}
          defaultValue={adresse}
          placeholder="adresse ..."
          onChangeText={(val)=> setAdresse(val)} 
        />
      </View>

      <View style={styles.inputContainer}>
          <AntDesign
            name="picture"
            size={24}
            color="black"
            style={styles.icon}
          />
          <TouchableOpacity style={styles.photoInput} onPress={photoIdentity}>
            <Text>Identety</Text>
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
  )
}

export default SignupCust

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
  