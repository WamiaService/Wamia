import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    Image,
    TouchableOpacity,
    DrawerLayoutAndroid,
    TextInput,
    FlatList, ScrollView,
} from 'react-native';
import ViewPropTypes from 'deprecated-react-native-prop-types';
import { Entypo } from '@expo/vector-icons';
import DrawerButton from './Drawer.jsx';
import Carousel from 'react-native-snap-carousel';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from '../BottomTavNav.jsx';
import axios from 'axios';
import ShimmerEffect from './ShimmerEffect.jsx';


const Home = ({providerId}) => {
    const drawer = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showLoader, setShowLoader] = useState(true);
    const [avatarUrl, setAvatarUrl] = useState("");

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            setIsLoading(true);
            setError(null);
            axios.get(`http://192.168.104.13:3000/provider/search?category=${searchTerm}`)
                .then(response => {
                    setSearchResults(response.data);
                })
                .catch(error => {
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
        }, 3000);
    
        return () => clearTimeout(timer);
      }, []);
   useEffect(() => {
    const fetchAvatarUrl = async () => {
        if (providerId) {
          try {
            const response = await axios.get(`http://192.168.104.13:3000/provider/getOne/${providerId}`);
            const imgprof = response.data.imgprof;
            console.log("imgprof taswirraaaa:", imgprof); // Check the value of imgprof
            setAvatarUrl(imgprof);
          } catch (error) {
            console.error("Error fetching avatar URL:", error);
            setAvatarUrl(""); // Set empty avatarUrl to avoid the 404 error
          }
        }
      };
      

  fetchAvatarUrl();
}, [providerId]);



    const itemList = [
        { name: 'Home', icon: 'home' },
        { name: 'Booking', icon: 'calendar' },
        { name: 'Favored', icon: 'star' },
    ];

    const categories = [
        { name: 'Electricien', image: require('../../assets/Electricien.png') },
        { name: 'Climatisation', image: require('../../assets/Climatisation.png') },
        { name: 'Plombier', image: require('../../assets/clipart1865677.jpeg') },
        { name: 'Transporteur', image: require('../../assets/Transporteur.png') },
        { name: 'Peinture', image: require('../../assets/Peinture.png') },
        { name: 'Machine a laver', image: require('../../assets/Machinealaver.png') },
        { name: 'Menuisier', image: require('../../assets/Menuisier.png') },
        { name: 'Camera', image: require('../../assets/Camera.png') },

    ];
    const advertisingImages = [
        require('../../assets/banner.png'),
        require('../../assets/Samsung-banner.png'),
        require('../../assets/xbox.png'),
        require('../../assets/flouci.png'),
    ];

    const navigationView = () => (
        <View style={styles.drawerContainer}>
            <TouchableOpacity onPress={() => drawer.current.closeDrawer()}>
                <Entypo style={styles.drawerIcon} name="menu" size={40} color="black" />
            </TouchableOpacity>
            {itemList.map(item => (
                <TouchableOpacity style={styles.listItem} key={item.name}>
                    <Entypo name={item.icon} size={24} color="white" />
                    <Text style={styles.listItemText}>{item.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    return (
        <DrawerLayoutAndroid style={styles.container}
            ref={drawer}
            
            drawerWidth={300}
            drawerPosition='left'
            renderNavigationView={navigationView}
        >
            <ScrollView >
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
  source={avatarUrl ? { uri: avatarUrl } : require('../../assets/w.png')}
  style={styles.avatar}
/>
                    </TouchableOpacity>
                    </View>
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
                            onChangeText={text => setSearchTerm(text)}
                        />
                    </View>
                    {searchResults.map(result => (
                        <View key={result.id}>
                            <Text>{result.username}</Text>
                            {
                                isLoading && <Text>Loading...</Text>
                            }

                            {
                                error && <Text>{error}</Text>
                            }

                            {/* Add more fields from the result as needed */}
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
                <Image source={category.image} style={styles.categoryImage} />
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
            ))}
        </View>

                {/* Advertising Section (Carousel) */}
                <View style={styles.carouselContainer}>
                    <Text style={styles.sectionTitle}>Advertisements</Text>
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
                    />
                </View>
            </ScrollView>

        </DrawerLayoutAndroid>
    );
};

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff'
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        padding: 10
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
        width: "auto",
        backgroundColor: '#f5f5f5',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft:10 // Half of width/height to make it circular
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
        paddingBottom: 50
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
    categoryContainer: {
        padding: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryItem: {
        width: '25%', // 2 items in a row (adjust based on your preference)
        marginBottom: 20,
        alignItems: 'center'
    },
    categoryImage: {
        width: 70,
        height: 70,
        objectFit:"cover"
    },
    categoryName: {
        marginTop: 10,
        textAlign: 'center',
        fontStyle: "normal",
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
        objectFit:"contain"
    },
});

export default Home;