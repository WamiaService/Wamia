import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import axios from 'axios';
import PostOnlyClient from './PostOnlyClient';
import { useNavigation } from '@react-navigation/native';
import Res from './Res';

const ProfileFOrClient = ({ navigation }) => {
  const [data, setData] = useState({
    name: '',
    imgprof: '',
    patente: '',
  });

  const [showPosts, setShowPosts] = useState(true);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://192.168.104.6:3000/provider/getOne/1')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handlePostsButtonClick = () => {
    setShowPosts(true);
    setShowComments(false);
  };

  const handleCommentsButtonClick = () => {
    setShowPosts(false);
    setShowComments(true);
  };

  const handleReservationButtonClick = () => {
    navigation.navigate('Res'); // Navigate to Reservation page
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: data.imgprof }} style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{data.username}</Text>
          <Text style={styles.mobile}>{data.mobile}</Text>
          <AirbnbRating
            count={5}
            defaultRating={0}
            size={20}
            showRating={false}
            onFinishRating={(rating) => console.log('Rating:', rating)}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handlePostsButtonClick}
        >
          <Text style={styles.buttonText}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleCommentsButtonClick}
        >
          <Text style={styles.buttonText}>Comments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleReservationButtonClick}
        >
          <Text style={styles.buttonText}>Reservation</Text>
        </TouchableOpacity>

      </View>
      
      {showPosts && <PostOnlyClient />}
      {showComments && <View style={styles.commentSection}><Text>Comments Section</Text></View>}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f8f8f8',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    width: 350,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    elevation: 3,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden', // Clip the image
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    marginLeft: 20,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  mobile: {
    marginBottom: 5,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align buttons to the right
    paddingHorizontal: 16, // Adjust padding as needed
    marginTop: 30,
  },
  button: {
    marginRight: 15,
    backgroundColor: '#FFA500',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  commentSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    width: '100%',
  },
});

export default ProfileFOrClient;