import React, { useEffect } from 'react';
import { StyleSheet, Text, Image, View, Dimensions, TouchableOpacity, Animated } from 'react-native';

const Choose = () => {
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
        <TouchableOpacity style={styles.button} onPress={() => console.log('Provider Button Pressed')}>
          <Text style={styles.buttonText}>Provider</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => console.log('Client Button Pressed')}>
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
    paddingTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 476,
    height: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
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
