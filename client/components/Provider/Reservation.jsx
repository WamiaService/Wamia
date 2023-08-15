import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react'


const Reservation = ({providerId}) => {
  const [data,setData]=useState
 
  useEffect(() => {
    fetch();
  }, []);


  const fetch = () => {
    axios.get(`http://192.168.104.7:3000/reservation/ProvReservation/${providerId}`)
      .then((res) => {
        setData(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handle=(id)=>{
    axios.get(`http://192.168.104.7:3000/reservation/resUpdate/${id}`)
    .then((res) => {
      setData(res?.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {boxes.map((ele, i) => (
        <View key={index} style={styles.box}>
          <Image source={{ uri: ele.imageUrl }} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.text}>{ele.name}</Text>
            <Text style={styles.number}>phone: {ele.phone}</Text>
            <Text style={styles.date}>Date: {ele.date}</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectButton}>
            <Text style={styles.buttonText}>reject</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    rejectButton: {
        backgroundColor: 'red',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginTop: 80,
        marginRight:10
    },
  container: {
    flexGrow: 1,
    paddingTop: 70,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    backgroundColor: 'white',
    width: 400,
    shadowColor: 'black',
    elevation: 3,
    marginBottom: 20,
  },
  infoContainer: {
    flex: 1,
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
  date: {
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight:-70
  },

  buttonText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Reservation

