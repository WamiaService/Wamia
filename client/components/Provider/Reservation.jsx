import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'

const Reservation = () => {
  const boxes = [
    {
      name: 'yacine amrouche',
      phone: '+216 46321068',
      date: '11/08/2023',
      imageUrl: 'https://t4.ftcdn.net/jpg/02/24/86/95/360_F_224869519_aRaeLneqALfPNBzg0xxMZXghtvBXkfIA.jpg',
    },
    {
      name: 'John Doe',
      phone: '+123 4567890',
      date: '12/08/2023',
      imageUrl: 'https://example.com/johndoe.jpg',
    },
    {
      name: 'Jane Smith',
      phone: '+987 6543210',
      date: '13/08/2023',
      imageUrl: 'https://example.com/janesmith.jpg',
    },
    {
      name: 'Alice Johnson',
      phone: '+555 1234567',
      date: '14/08/2023',
      imageUrl: 'https://example.com/alice.jpg',
    },
    {
      name: 'Bob Anderson',
      phone: '+999 8887777',
      date: '15/08/2023',
      imageUrl: 'https://example.com/bob.jpg',
    },
    {
      name: 'Eve Brown',
      phone: '+111 2223333',
      date: '16/08/2023',
      imageUrl: 'https://example.com/eve.jpg',
    },
    {
      name: 'Michael Miller',
      phone: '+444 6665555',
      date: '17/08/2023',
      imageUrl: 'https://example.com/michael.jpg',
    },
    {
      name: 'Sarah Wilson',
      phone: '+777 8889999',
      date: '18/08/2023',
      imageUrl: 'https://example.com/sarah.jpg',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {boxes.map((box, index) => (
        <View key={index} style={styles.box}>
          <Image source={{ uri: box.imageUrl }} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.text}>{box.name}</Text>
            <Text style={styles.number}>phone: {box.phone}</Text>
            <Text style={styles.date}>Date: {box.date}</Text>
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
        backgroundColor: '#007bff',
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
    backgroundColor: '#007bff',
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

