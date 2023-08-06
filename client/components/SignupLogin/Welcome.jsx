import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';

const Welcome = ({ providerId }) => {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    axios
      .get(`http://192.168.1.7:3000/provider/getOne/${providerId}`)
      .then((response) => {
        setProvider(response.data);
      })
      .catch((error) => {
        console.log('Error fetching provider:', error);
      });
  }, [providerId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome home</Text>
      {provider && provider.imgprof && <Image source={{ uri: provider.imgprof }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Welcome;
