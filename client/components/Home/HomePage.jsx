import React, { useRef, useState, useEffect } from 'react';
import MapView, { Marker } from "react-native-maps";
import RBSheet from "react-native-raw-bottom-sheet";
import * as Location from 'expo-location';

import {
  Dimensions,
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  DrawerLayoutAndroid,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import DrawerButton from './Drawer.jsx';
import Carousel from 'react-native-snap-carousel';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from '../BottomTavNav.jsx';
import axios from 'axios';
import ShimmerEffect from './ShimmerEffect.jsx';
import Icon from 'react-native-vector-icons/FontAwesome';


const Home = ({ providerId, custumorId }) => {
  const windowHeight = Dimensions.get('window').height;
  const sheetHeight = windowHeight * 0.7;
  const mapHeight = sheetHeight * 0.8;


  const navigation = useNavigation();
  const drawer = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoader, setShowLoader] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [imageprofile, setImageprofile] = useState('')
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      setIsLoading(true);
      setError(null); 
      axios
        .get(
          
        
          `http://192.168.1.5:3000/provider/search?category=${searchTerm}`
        )
        .then((response) => {
          setSearchResults(response.data);
        })
        .catch((error) => {
          if (error.response) {
            console.error('Response Status:', error.response.status);
          } else {
            console.error('Error:', error.message);
          }
        })

        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchAvatarUrl = async () => {
      if (providerId) {
        try {
          const response = await axios.get(
            
            `http://192.168.1.5:3000/provider/getOne/${providerId}`
          )
          const imgprof = response.data.imgprof;
          console.log('imgprof taswirraaaa:', imgprof); // Check the value of imgprof
          setAvatarUrl(imgprof);
        } catch (error) {
          console.error('Error fetching avatar URL:', error);
          setAvatarUrl(''); // Set empty avatarUrl to avoid the 404 error
        }
      }
    };

    fetchAvatarUrl();
  }, [providerId]);

  useEffect(() => {
    const fetchProfileUrl = async () => {
      if (custumorId) {
        try {
          const response = await axios.get(
           
            `http://192.168.1.5:3000/custumor/getOne/${custumorId}`
          );
         
          
          const imgprof = response.data.imgprof;
          console.log('imgprof taswirraaaa:', imgprof); // Check the value of imgprof
          setImageprofile(imgprof);
        } catch (error) {
          console.error('Error fetching avatar URL:', error);
          setAvatarUrl(''); // Set empty avatarUrl to avoid the 404 error
        }
      }
    };

    fetchProfileUrl();
  }, [custumorId]);

  const itemList = [
    { name: 'Home', icon: 'home' },
    { name: 'Booking', icon: 'calendar' },
    { name: 'Favored', icon: 'star' },
  ];

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
  const advertisingImages = [
    require('../../assets/banner.png'),
    require('../../assets/Samsung-banner.png'),
    require('../../assets/xbox.png'),
    require('../../assets/flouci.png'),
  ];
  const refRBSheet = useRef(null);
  const [mapcor, setMatCor] = useState({
    latitude: 33.5848,
    longitude: 9.3224,
  })
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
      (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
          }

          let currentLocation = await Location.getCurrentPositionAsync({});
          setLocation(currentLocation);
      })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
      text = errorMsg;
  } else if (location) {
      text = JSON.stringify(location);
  }
  const mapViewRef = useRef(null);
  const navigationView = () => (
    <View style={styles.drawerContainer}>
      <TouchableOpacity onPress={() => drawer.current.closeDrawer()}>
        <Entypo style={styles.drawerIcon} name="menu" size={40} color="black" />
      </TouchableOpacity>
      {itemList.map((item) => (
        <TouchableOpacity style={styles.listItem} key={item.name}>
          <Entypo name={item.icon} size={24} color="white" />
          <Text style={styles.listItemText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <DrawerLayoutAndroid
      style={styles.container}
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={navigationView}
    >
      <ScrollView>
        <StatusBar barStyle="auto" />

        <View style={styles.header}>
          {/* Drawer Button */}
          <DrawerButton onPress={() => drawer.current.openDrawer()} />
          <View style={styles.rightGroup}>
            {/* Notification Icon */}
            <TouchableOpacity>
              <Entypo name="bell" size={24} color="black" />
            </TouchableOpacity>
            {/* Avatar */}
            <TouchableOpacity>
              <Image
                source={
                  providerId ? { uri: avatarUrl } : { uri: imageprofile }
                }
                style={styles.avatar}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Show Details Button */}
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <TouchableOpacity
            style={styles.showDetailsButton}
            onPress={() => refRBSheet.current.open()}
          >
            <MaterialIcons name="expand-more" size={32} color="black" />
            <Text style={styles.showDetailsText}>Show My location</Text>
          </TouchableOpacity>
        </View>


        {/* Search Component */}
        <Text style={styles.sectionTitle}>Search</Text>
        <View style={styles.searchContainer}>
          {/* Your search component goes here */}

          <View style={styles.searchInputContainer}>
            <Entypo name="magnifying-glass" size={24} color="#ccc" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            />
          </View>
          {searchResults.map((result) => (
            <View   style={styles.resultContainer} key={result.id}>
              <Image source={{ uri: result.imgprof }} style={styles.resultImage} />
              <View  style={styles.resultTextContainer}>
              <TouchableOpacity onPress={()=> navigation.navigate('profileforclient', { providerId: result.id })}>
                <Text   style={styles.resultName}>{result.username}</Text>
                <Text style={styles.resultCategory}>{result.category}</Text>
                </TouchableOpacity>
              </View>


              {isLoading && <Text>Loading...</Text>}
              {error && <Text>{error}</Text>}
            </View>
          ))}

        </View>

        {/* Category Section */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoryContainer}>
          {/* Display loader for 3 seconds */}
          {showLoader && <ShimmerEffect />}
          {/* Show categories after 3 seconds */}
          {!showLoader &&
            categories.map((category) => (
              <View key={category.name} style={styles.categoryItem}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Providers', { category: category.name });
                  }}
                >
                  <Image source={category.image} style={styles.categoryImage} />
                </TouchableOpacity>
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
            ))}
        </View>


        {/* Advertising Section (Carousel) */}
        <View style={styles.carouselContainer}>
          <Text style={styles.sectionTitle}>Advertisements</Text>
          {showLoader && <ShimmerEffect />}
          {!showLoader &&
            <Carousel
              data={advertisingImages}
              renderItem={({ item }) => (
                <Image source={item} style={styles.carouselImage} />
              )}
              sliderWidth={350}
              itemWidth={300}
              loop={true}
              autoplay={true}
              autoplayInterval={3000}
            />}
        </View>
      </ScrollView>
      {/* Bottom Sheet */}
      <RBSheet
        ref={refRBSheet}
        height={sheetHeight}
        onOpen={() => {
          if (location && mapViewRef.current) {
            mapViewRef.current.animateToRegion({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }, 500); // 500 is the duration to animate
          }
        }}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: "center",
            alignItems: "center",
          }
        }}
      >
        {/* Your bottom sheet content here */}
        <View style={{ padding: 15, borderBottomWidth: 1, borderColor: '#e0e0e0' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Maps
          </Text>
        </View>
        <View style={{ flex: 1, width: '100%', height: '100%',padding:16 }}>
          <MapView
          ref={mapViewRef}
           style={{ flex: 1, width: '100%', height: '100%' }}
           region={{
            latitude: location?.coords.latitude || 10.78825,
            longitude: location?.coords.longitude || 9.4324,
          
        }}
    >
        {location && (
            <Marker
                coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                }}
                title="My Location"
            />
        )}
            
          </MapView>
        </View>


        <View style={{ padding: 15 }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#2196F3',
              padding: 12,
              borderRadius: 5,
              alignItems: 'center'
            }}
            onPress={() => {
              if (location && mapViewRef.current) {
                  mapViewRef.current.animateToRegion({
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421
                  }, 1500);
              }}}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Zoom In
            </Text>
          </TouchableOpacity>
        </View>

      </RBSheet>

    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  showDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  showDetailsText: {
    marginLeft: 5,
    fontWeight: 'bold'
  },
  container: {
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f5f5f5',
  },
  rightGroup: {
    flexDirection: 'row', // Keep items side by side
    alignItems: 'center', // Align items vertically in the center
  },
  drawerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 'auto',
    backgroundColor: '#f5f5f5',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10, // Half of width/height to make it circular
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#ffA500',
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  listItemText: {
    marginLeft: 10,
    color: 'white',
  },
  drawerIcon: {
    paddingBottom: 50,
  },
  searchContainer: {
    padding: 30,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
  },
  searchInput: {
    marginLeft: 10,
    flex: 1,
  },
  resultContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
  },
  resultImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  resultTextContainer: {
    flex: 1,
  },
  resultName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultCategory: {
    fontSize: 14,
    color: '#888',
  },
  categoryContainer: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '25%', // 2 items in a row (adjust based on your preference)
    marginBottom: 20,
    alignItems: 'center',
  },
  categoryImage: {
    width: 70,
    height: 70,
    objectFit: 'cover',
  },
  categoryName: {
    marginTop: 10,
    textAlign: 'center',
    fontStyle: 'normal',
    fontFamily: 'Cochin',
    fontSize: 13,
    fontWeight: 'bold',
  },
  carouselContainer: {
    marginVertical: 20,
    height: 200,
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    objectFit: 'contain',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Home;
