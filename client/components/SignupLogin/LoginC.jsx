import React, { useEffect, useState } from 'react';
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
import * as SecureStore from 'expo-secure-store'; 
import { decode as base64Decode } from 'base-64';

const LoginC = ({ handleLoginCustumor }) => {
  const route = useRoute();
  const role = route.params?.role; 
  console.log("role in loginCust:",role);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activationCode,setActivationCode]= useState('')

  const navigation = useNavigation();

  useEffect(() => {
    const loadActivationStatus = async () => {
      const activationStatus = await SecureStore.getItemAsync('is_approved');
      setIs_approved(activationStatus === 'true');
    };

    loadActivationStatus();
  }, []);

  const loginn = async (username, password,activationCode) => {
    try {
      const response = await axios.post('http://192.168.104.6:3000/custumor/login', {
        username: username,
        password: password,
        activationCode:activationCode
      });
  
      console.log('Response Data:', response.data);
      const token = response.data.token;
  
      if (response.data && token) {
        const payload = JSON.parse(base64Decode(token.split('.')[1]));
  
        console.log('Parsed Payload:', payload);
  
        // Adjust this part based on your payload structure
        if (payload && payload.custumorId) {
          // Save the token in SecureStore
          await SecureStore.setItemAsync('jwt-token', token);
  
          handleLoginCustumor(token, payload.custumorId);
          console.log('custumor ID:', payload.custumorId);
          console.log('Response Data:', response.data);
          navigation.navigate('bottomTabNav',{role});
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
    loginn(username,password,activationCode); 
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
      <View style={styles.inputContainer}>
  <AntDesign name="key" size={24} color="black" style={styles.icon} />
  <TextInput
    onChangeText={(val) => setActivationCode(val)}
    style={styles.inp}
    placeholder="Activation Code ..."
    keyboardType="numeric"
  />
</View>
      <Button onPress={handleLoginn} title="Login" color="#FFA500" borderRadius={30} />
    </View>
  );
};

export default LoginC;

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
