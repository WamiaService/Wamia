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
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store'; 
import { decode as base64Decode } from 'base-64';


const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const loginn = async (username, password) => {
    try {
      const response = await axios.post('http://192.168.104.13:3000/provider/login', {
        username: username,
        password: password,
      });
  
      console.log('Response Data:', response.data);
      const token = response.data.token;
  
      if (response.data && token) {
        const payload = JSON.parse(base64Decode(token.split('.')[1]));
  
        console.log('Parsed Payload:', payload);
  
        // Adjust this part based on your payload structure
        if (payload && payload.providerId) {
          // Save the token in SecureStore
          await SecureStore.setItemAsync('jwt-token', token);
  
          handleLogin(token, payload.providerId);
          console.log('Provider ID:', payload.providerId);
          console.log('Response Data:', response.data);
          navigation.navigate('bottomTabNav');
          alert('Login successful');
        } else {
          alert('Login failed: Invalid payload data');
        }
      } else {
        alert('Login failed: Invalid response data');
      }
    } catch (error) {
      console.log('Login Error:', error);
      alert('Login failed');
    }
  };
  
  
  
  

  const handleLoginn = () => {
    loginn(username,password); 
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        resizeMode="cover"
        source={require('../../assets/logo.png')}
      />
      <View style={styles.inputContainer}>
        <AntDesign name="user" size={24} color="black" style={styles.icon} />
        <TextInput
          onChangeText={(val) => setUsername(val)}
          style={styles.inp}
          placeholder="Username ..."
        />
      </View>
      <View style={styles.inputContainer}>
        <AntDesign name="lock" size={24} color="black" style={styles.icon} />
        <TextInput
          style={styles.inp}
          placeholder="Password ..."
          secureTextEntry
          defaultValue={password}
          onChangeText={(val) => setPassword(val)}
        />
      </View>
      <Button onPress={handleLoginn} title="Login" color="#FFA500" borderRadius={30} />
    </View>
  );
};

export default Login;

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
