import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import UpdateService from "./UpdateService"

const ServicesOneProvider = () => {
  const [data, setData] = useState({
    name: '',
    imgprof: '',
    patente: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`http://192.168.104.6:3000/provider/getOne/1`)
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
    backgroundColor: 'white',
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
  }
});

export default ServicesOneProvider;
