import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const PostForClient = ({providerId}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    axios.get(`http://192.168.104.8:3000/service/getall/${providerId}`)
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
          <Text style={styles.postTitle}>{item.name}</Text>
          <Image source={{ uri: item.img }} style={styles.image} />
          <Text style={styles.postDescription}>{item.desc}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    width: 290,
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  postDescription: {
    fontSize: 14,
    color: '#555',
  },
  image: {
    width: '100%',
    height: 200, 
    borderRadius: 12,
    marginBottom: 10,
  },
});

export default PostForClient;
