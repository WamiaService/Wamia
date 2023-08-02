import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Signup from './components/Signup.js';

const App = () => {
  return (
    <View style={styles.container}>
      <Signup />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'rgba(255, 255,500, 0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
