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
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  const loginn =  (username,password) => {
       axios.post('http://192.168.11.127:3000/provider/login', { username :username, password:password })
      .then((res)=>{
console.log(res.data);
        alert('login success')
      }).catch((err)=>{
        console.log(err);
      })
    
  };
  const handleLogin = () => {
    loginn(
     username,
     password
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
