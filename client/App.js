import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Signup from './components/SignupLogin/Signup.jsx';
import Start from './components/Start.jsx';
import Choose from './components/Choose.jsx';
import Login from './components/SignupLogin/Login.jsx';
import SignupCust from './components/SignupLogin/SignupCust.jsx';

const App = () => {
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSignup(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      {/* {showSignup ? <Choose/> : <Start />} */}
      {/* <Signup/> */}
      <SignupCust/>
      {/* <Login/> */}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
