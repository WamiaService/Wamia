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

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('')
  const navigation = useNavigation()

  const verifyAccount = (activationCode) => {
    axios
      .get(`http://192.168.1.7:3000/provider/verify/${activationCode}`)
      .then((res) => {
        console.log(res.data);
        alert(res.data.message); // Show the response message (e.g., 'Your account has been successfully verified!')
      })
      .catch((err) => {
        console.log(err);
        alert('Verification failed');
      });
  }
  const loginn = async (username,password,code) => {
    try {
      await verifyAccount(code); 
      const response = await axios.post('http://192.168.1.7:3000/provider/login', {
        username: username,
        password: password,
        code: code,
      });
  
      console.log(response.data);
      navigation.navigate('edit');

      if (response.data.message === 'verifier votre boite email') {
        alert('Please verify your email before login.');
      } else {
        alert('Login successful');
      }
    } catch (error) {
      console.log(error);
      alert('Login failed');
    }
    
  };
  const handleLogin = () => {
    loginn(
     username,
     password,
     code
    );
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
          <TextInput onChangeText={(val)=> setUsername(val)} style={styles.inp} placeholder="Username ..." />
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
          <AntDesign name="lock" size={24} color="black" style={styles.icon} />
          <TextInput
            style={styles.inp}
            placeholder="Entre the code ..."
            onChangeText={(val) => setCode(val)}
          />
        </View>
        <Button onPress={()=>handleLogin()} title="Login" color="#FFA500" borderRadius={30} />

    </View>
  )
}

export default Login

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
