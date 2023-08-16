import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const Payment = () => {
  const [form, setForm] = useState({});
  const navigation = useNavigation();

  const onchange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
console.log(form);

  const onSubmit = () => {
    axios
      .post('http://192.168.104.5:3000/api/payement/pay', form)
      .then((res) => {
       
        const { result } = res.data;
        console.log(result);
        navigation.navigate('webviewscreen', { link: result.link });

           })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onchange('amount', text)}
        placeholder="Amount ..."
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={onSubmit}
      >
        Buy
      </Button>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    marginBottom: 20,
  },
  button: {
    width: '80%',
  },
});

export default Payment;
