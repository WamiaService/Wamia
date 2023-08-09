import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import UpdateService from "./UpdateService"

const ServicesOneProvider = () => {
  const [data, setData] = useState([]);

  const del = (id) => {
    axios
      .delete(`http://192.168.1.14:3000/service/delete/${id}`)
      .then((res) => {
        console.log(res);
        fetch(); 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    axios.get(`http://192.168.1.14:3000/service/getall/1`)
      .then((res) => {
        setData(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {data.map((item, index) => (
        <View key={index} style={styles.postContainer}>
          <Text>{item.name}</Text>
          <Image
            source={{
              uri: item.img,
            }}
            style={styles.image}
          />
          <Text>{item.desc}</Text>
          <UpdateService id={item.id} />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => del(item.id)} 
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
  },
  postContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 300, 
    height: 240,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ServicesOneProvider;
