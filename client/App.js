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

const Stack = createStackNavigator();

const App = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [providerId, setproviderId] = useState('');
  
  const [token, setToken] = useState('');


  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSignup(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const fetchStoredProviderId = async () => {
      try {
        const storedProviderId = await AsyncStorage.getItem('providerId');
        if (storedProviderId) {
          setproviderId(storedProviderId);
        }
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };
  
    fetchStoredProviderId();
  }, []);
  

  const handleLogin = async (newToken, newProviderId) => {
    setToken(newToken);
  
    // Check if the newProviderId is not empty before updating it
    if (newProviderId) {
      setproviderId(newProviderId);
  
      try {
        await AsyncStorage.setItem('providerId', newProviderId);
      } catch (error) {
        console.error('Error storing data in AsyncStorage:', error);
      }
    }
  };
  
  
  
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
<Stack.Screen name="loginc">
  {(props) => <LoginC {...props} handleLogin={handleLogin} />}
</Stack.Screen>
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
