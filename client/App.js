import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Signup from './components/SignupLogin/Signup.jsx';
import Start from './components/Start.jsx';
import Choose from './components/Choose.jsx';
import Login from './components/SignupLogin/Login.jsx';
import SignupCust from './components/SignupLogin/SignupCust.jsx';
import Test from './components/SignupLogin/Test.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Edit from "./components/Custumor/Edit.jsx"
import One from './components/Custumor/One.jsx';

import Home from './components/Home/HomePage.jsx';
import BottomTabNavigation from './components/BottomTavNav.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginC from './components/SignupLogin/LoginC.jsx';
import SessionStorage from 'react-native-session-storage';
const Stack = createStackNavigator();

const App = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [providerId, setProviderId] = useState('');
  const [custumorId,setCustumorId] = useState('')
  const [token, setToken] = useState('');


  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSignup(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const storedProviderId = SessionStorage.getItem('providerId');

    if (storedProviderId) {
      setProviderId(storedProviderId);
    }
    console.log("storedid:",storedProviderId);
  }, []);
  /////////////
  useEffect(() => {
    const storedCustumorId = SessionStorage.getItem('custumorId');

    if (storedCustumorId) {
      setCustumorId(storedCustumorId);
    }
    console.log("storedid:",storedCustumorId);
  }, []);

  const handleLogin = (newToken, newProviderId) => {
    setToken(newToken);
    setProviderId(newProviderId);

    // Store user ID and role in sessionStorage
    SessionStorage.setItem('providerId', newProviderId);
  };

  const handleLoginCustumor = (newToken, newCustumorId) => {
    setToken(newToken);
    setCustumorId(newCustumorId);

    SessionStorage.setItem('custumorId', newCustumorId);
  };

  console.log("ProviderId in App:", providerId)
  console.log("Custumor in App:", custumorId)

  
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {showSignup ? (
          <Stack.Screen name="choose" component={Choose} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="start" component={Start} options={{ headerShown: false }} />
        )}
        <Stack.Screen name="signup" component={Signup} options={{
          headerShown: false
        }} />
        <Stack.Screen name="signupcust" component={SignupCust} options={{
          headerShown: false
        }} />


        <Stack.Screen name="login">
  {(props) => <Login {...props} handleLogin={handleLogin} />}
</Stack.Screen>
{/* <Stack.Screen name="loginc">
  {(props) => <LoginC {...props} handleLoginCustumor={handleLoginCustumor} />}
</Stack.Screen> */}
        {/* <Stack.Screen name="home" component={Home} options={{
          headerShown: false
        }} /> */}
           <Stack.Screen name="bottomTabNav">
          {(props) => <BottomTabNavigation {...props} providerId={providerId} />}
        </Stack.Screen>
  
                  <Stack.Screen name ="one" component={One}/>
                  <Stack.Screen name ="edit" component={Edit} />
      </Stack.Navigator>
      
      

    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
