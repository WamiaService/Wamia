import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import PostForClient from './PostsForClient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import Comments from './Comments';

const ProfileFOrClient = ({ navigation }) => {
  const route = useRoute();
  const providerId = route.params?.providerId; 
  const [data, setData] = useState([]);

  const [showPosts, setShowPosts] = useState(true);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://192.168.104.7:3000/provider/getOne/${providerId}`)
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
    navigation.navigate('calender'); // Navigate to Reservation page
  };
  console.log('');
console.log('profile for client',providerId);

//handle rating 









  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: data.imgprof }} style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{data.username}</Text>
          <Text style={styles.mobile}>phone : +216 {data.mobile ? data.mobile : "98432756"}</Text>
          {data.is_approvede && (
            <Icon
              name="check-circle"
              size={30}
              color="blue"
              style={{ position:"absolute", top:-20, left:190 }}
            />
          )}
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

      {showPosts && <PostForClient providerId={providerId} />}
      {showComments && (
        <Comments/>  )}
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
