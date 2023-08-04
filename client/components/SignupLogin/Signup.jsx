import React, { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
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
const Signup = () => {
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

  const singUppp =  (username,password,email,imgprof,patente,category) => {
    const selectedCategory = category[0] || category[1]
       axios.post('http://192.168.11.127:3000/provider/signup', { username :username, email:email, password:password , imgprof:imgprof,patente:patente,category: selectedCategory })
      .then((res)=>{
console.log(res.data);
        alert('check youre boite email')

      }).catch((err)=>{
        console.log(err);
      })
    
  };
  const handleSignup = () => {
    singUppp(
     username,
     password,
     email,
     patente,
     imgprof,
     category
    );
  };



  // console.log('username',username);
  // console.log(email);
  // console.log(password);
  
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
            placeholder="imgprof ..."
            defaultValue={imgprof}
            onChangeText={(val)=> setImgprof(val)} 
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inp}
            defaultValue={patente}
            placeholder="patente ..."
            onChangeText={(val)=> setPatente(val)} 
          />
        </View>

        {/* <View style={styles.inputContainer}>
          <AntDesign
            name="picture"
            size={24}
            color="black"
            style={styles.icon}
          />
          <TouchableOpacity style={styles.photoInput}>
            <Text>Image</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <AntDesign
            name="picture"
            size={24}
            color="black"
            style={styles.icon}
          />
          <TouchableOpacity style={styles.photoInput}>
            <Text>Patente</Text>
          </TouchableOpacity>
        </View> */}
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

        <Text>If you have an account please Login</Text>

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
