import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import UpdateService from './UpdateService';

const ServicesOneProvider = ({providerId}) => {
  const [data, setData] = useState([]);
  const [updateCount, setUpdateCount] = useState(0)
  const del = (id) => {
    axios
      
      
      .delete(`http://192.168.1.7:3000/service/delete/${id}`)
      .then((res) => {
        console.log(res);
        setUpdateCount(updateCount + 1)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch();
  }, [updateCount]);

  const fetch = () => {

   
    axios.get(`http://192.168.1.5:3000/service/getall/${providerId}`)
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
          <Text style={styles.title}>{item.name}</Text>
          <Image
            source={{ uri: item.img }}
            style={styles.image}
          />
          <Text style={styles.description}>{item.desc}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => del(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            
            <UpdateService  onUpdate={() => setUpdateCount(updateCount + 1)} style={styles.serviceButton} id={item.id}/>
          </View>
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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333', // Updated color
  },
  image: {
    width: '100%', // Change to fill the container width
    height: 200, // Set the desired height
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
    color: '#555', // Updated color
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10, // Add some top padding for spacing
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '45%',
  },
  serviceButton: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: '45%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ServicesOneProvider;
