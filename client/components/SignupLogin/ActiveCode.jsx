import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

const ActiveCode = () => {
  const route = useRoute();
  const { activationcode } = route.params;
  
useEffect(()=>{
verifyProvider()
},[activationcode])

const verifyProvider = ()=>{
    axios.post(`http://192.168.11.127:3000/provider/verify/${activationcode}`)
}
  return (
    <View>
      <Text>ActiveCode</Text>
    </View>
  );
};

export default ActiveCode;

const styles = StyleSheet.create({});
