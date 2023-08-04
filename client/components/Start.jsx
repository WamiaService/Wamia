import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, Image, View, Dimensions, Animated } from 'react-native';

const Start = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth * 0.4; 

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500, 
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Image
          style={[styles.img, { width: imageWidth, height: imageWidth }]}
          resizeMode="contain" 
          source={require('../assets/w.png')}
        />
      </Animated.View>
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>Wamia Service</Animated.Text>
    </View>
  );
};

export default Start;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  img: {
    marginBottom: 50,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft:15,
  },
  
});
