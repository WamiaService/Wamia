import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import ServicesOneProvider from './ServicesOneProvider';
import axios from 'axios';

const ProviderProfile = () => {
  const [data, setData] = useState({
    name: '',
    imgprof: '',
    patente: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`http://192.168.1.14:3000/provider/getOne/1`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image
          source={{
            uri: data.imgprof,
          }}
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.text}>{data.username}</Text>
          <Text style={styles.number}>{data.mobile}</Text>
          <Text style={styles.category}>{data.patente}</Text>
        </View>
      </View>
      <ServicesOneProvider/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    width: 370,
    shadowColor: 'black',
    elevation: 3,
  },
  infoContainer: {
    marginLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  text: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  number: {
    marginBottom: 5,
  },
  category: {
    color: '#888',
    marginBottom: 5,
  },
});

export default ProviderProfile;
