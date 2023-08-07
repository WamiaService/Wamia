import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const ShimmerEffect = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#f0f0f0" />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
});

export default ShimmerEffect;
