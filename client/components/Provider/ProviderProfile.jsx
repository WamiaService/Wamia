import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import ServicesOneProvider from './ServicesOneProvider';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const ProviderProfile = ({providerId}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`http://192.168.1.14:3000/provider/getOne/${providerId}`)
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
          <Text style={styles.number}>phone : +216 {data.mobile}</Text>
          
          {data.is_approved && (
        <Icon
          name="check-circle"
          size={30}
          color="blue"
          style={{ position:"absolute", top:-20, left:190 }}
        />
      )}   
        </View>
      </View>
      <ServicesOneProvider providerId={providerId}/>
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
