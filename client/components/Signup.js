import React from 'react';
import { useState } from 'react';
import { StyleSheet,Image, Button,Text, TextInput, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
const Signup = () => {
  const [name, setName] = useState('');

  return (
    <View>

      <View style={styles.container}>
        <Image style={[styles.img, styles.unamePosition]}
        resizeMode="cover"
        source={require('../assets/logo.png')} />
      <Text style={styles.sng}>Sign Up</Text>
      <Text> please sing up in to continue .. </Text>

      <Text> namee </Text>
      <TextInput
        style={styles.inp}
        placeholder="enter youre name ..."
        onChangeText={(val) => setName(val)}
      />
      <Text >name: {name}</Text>
      <Button
      
        title="Sign Up"
        color="#FFA500"
        borderRadius="30"
        
      />
            <Text >If you have an account please Login</Text>

      <StatusBar style="auto" />
    </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  inp: {
    borderWidth: 1,
    borderColor: 'black',
    width: 200,
    borderRadius:30
  },
  sng:{
    fontSize:24,
  },
  btn:{
    borderRadius:30
  },
  img:{
   
    width: 463,
    height: 127,
   
    
  },
  unamePosition: {
    position:'absolute',
    top:10,
    marginTop:20

},
});
