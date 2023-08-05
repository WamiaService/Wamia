import React, { useEffect } from 'react';
import { StyleSheet, Text, Image, View, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Choose = () => {
  const navigation = useNavigation()
  useEffect(() => {
    // Your animation logic here
    // You can use Animated.timing or any other Animated API to animate the component
    // For example, you can use Animated.timing on the container view to fade it in
    Animated.timing(containerOpacity, {
      toValue: 1,
      duration: 1000, // You can adjust the duration to control the speed of the animation
      useNativeDriver: true,
    }).start();
  }, []);

  const containerOpacity = new Animated.Value(0);
  const handleProviderPress = () => {
    navigation.navigate('signup');
  };
  const handleCustumor = () => {
    navigation.navigate('signupcust');
  };
  return (
    <Animated.View style={[styles.container, { opacity: containerOpacity }]}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../assets/logg.png')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleProviderPress}>
          <Text style={styles.buttonText}>Provider</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleCustumor}>
          <Text style={styles.buttonText}>Client</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Choose;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
  },
  logoContainer: {
    position: 'absolute',
    alignItems: 'center',
    marginBottom: 20,
    top:0,
    paddingTop:160,
  },
  logo: {
    width: 476,
    height: 200,
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 0,
    paddingBottom: 200,
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
