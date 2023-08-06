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
import Welcome from './components/SignupLogin/Welcome.jsx';
import Edit from "./components/Custumor/Edit.jsx"
import One from './components/Custumor/One.jsx';
const Stack = createStackNavigator();

const App = () => {
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSignup(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

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
                  }}/>
                  <Stack.Screen name="signupcust" component={SignupCust} options={{
                     headerShown: false
                  }} />

<Stack.Screen name="login" component={Login} options={{
                     headerShown: false
                  }} />
                  <Stack.Screen name="welcome" component={Welcome} options={{
                     headerShown: false
                  }} />
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
