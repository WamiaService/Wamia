import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

function AllProviders() {
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const categories = [
        { name: 'electricien', image: require('../../assets/Electricien.png') },
        { name: 'climatisation', image: require('../../assets/Climatisation.png') },
        { name: 'plombier', image: require('../../assets/clipart1865677.jpeg') },
        { name: 'transporteur', image: require('../../assets/Transporteur.png') },
        { name: 'peinture', image: require('../../assets/Peinture.png') },
        {
          name: 'machine a laver',
          image: require('../../assets/Machinealaver.png'),
        },
        { name: 'menuisier', image: require('../../assets/Menuisier.png') },
        { name: 'camera', image: require('../../assets/Camera.png') },
      ];
  useEffect(() => {
    const endpoint = selectedCategory 
      ? `http://192.168.1.17:3000/provider/search?category=${selectedCategory}` 
      : `http://192.168.1.17:3000/provider`;

    axios.get(endpoint)
      .then(response => {
        setProviders(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [selectedCategory]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      {/* Left side for Category Filters */}
      <View style={styles.filterContainer}>
  <ScrollView showsVerticalScrollIndicator={false}>
    {categories.map((category, index) => (
      <TouchableOpacity 
        key={index} 
        onPress={() => setSelectedCategory(category.name)}
        style={[
          styles.categoryButton, 
          selectedCategory === category.name && styles.selectedCategory
        ]}
      >
        <Image source={category.image} style={styles.categoryImage} />
        <Text style={styles.categoryText}>{category.name}</Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
</View>


  
      {/* Right side for provider list */}
      <View style={styles.resultsContainer}>
      <FlatList
        data={providers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imgprof }} style={styles.profileImage} />
            <View style={styles.textContainer}>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
          </View>
        )}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
  card: {
    padding:10,
    flexDirection: 'row',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
    objectFit:'cover'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: '#888',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  categoryButton: {
    flexDirection: 'column',  
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f5f5f5', 
  },
  categoryImage: {
    width: 50,
    height: 50,
    marginBottom: 5,  
    borderRadius: 25,
  },
  categoryText: {
    textAlign: 'center',
    fontSize: 12,
  },
  container: {
    flex: 1,
    flexDirection: 'row', // main change to layout structure
  },
  filterContainer: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  resultsContainer: {
    flex: 2,
    padding: 10,
  },
 
  selectedCategory: {
    backgroundColor: '#ddd',  // darker background color when selected
  }
});export default AllProviders;