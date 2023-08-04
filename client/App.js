import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Edit from './components/Custumor/Edit.js';

const App = () => {
  return (
    <View style={styles.container}>

   <Edit/>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255,500, 0.28)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
