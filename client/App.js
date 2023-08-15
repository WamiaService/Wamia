import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Signup from './components/SignupLogin/Signup.jsx';
import Start from './components/Start.jsx';
import Choose from './components/Choose.jsx';
import Login from './components/SignupLogin/Login.jsx';
import SignupCust from './components/SignupLogin/SignupCust.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Edit from './components/Custumor/Edit.jsx';
import One from './components/Custumor/One.jsx';

import BottomTabNavigation from './components/BottomTavNav.jsx';
import LoginC from './components/SignupLogin/LoginC.jsx';
import SessionStorage from 'react-native-session-storage';
import UpdateProvider from './components/Provider/UpdateProvider.jsx';
import Payment from './components/payment/Payment.jsx';
import ProviderPost from './components/Provider/PostProvider.jsx';
import ProviderProfile from './components/Provider/ProviderProfile.jsx';
import Reservation from './components/Provider/Reservation.jsx';
import ProfileFOrClient from './components/Provider/ProfileForClient.jsx';
import Infocus from './components/Custumor/InfoCus.jsx';
import Calender from './components/Calender/Calender.jsx';
import WebViewScreen from './components/payment/WebViewScreen.jsx';
const Stack = createStackNavigator();

const App = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [providerId, setProviderId] = useState('');
  const [custumorId, setCustumorId] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSignup(true);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);
  ///////// handle the provider Id/////////
  useEffect(() => {
    const storedProviderId = SessionStorage.getItem('providerId');

    if (storedProviderId) {
      setProviderId(storedProviderId);
    }
    console.log('storedid:', storedProviderId);
  }, []);
  const handleLogin = (newToken, newProviderId) => {
    setToken(newToken);
    setProviderId(newProviderId);

    SessionStorage.setItem('providerId', newProviderId);
  };
  //////////handle th costumor id/////////
  useEffect(() => {
    const storedCustumorId = SessionStorage.getItem('custumorId');

    if (storedCustumorId) {
      setCustumorId(storedCustumorId);
    }
    console.log('storedid:', storedCustumorId);
  }, []);

  const handleLoginCustumor = (newToken, newCustumorId) => {
    setToken(newToken);
    setCustumorId(newCustumorId);

    SessionStorage.setItem('custumorId', newCustumorId);
  };
  const handleLogoutProvider = () => {
    setToken('');
    setProviderId('');

    SessionStorage.removeItem('providerId');
  };
  var handleLogoutCustumor = () => {
    setToken('');
    setCustumorId('');

    SessionStorage.removeItem('custumorId');
  };


  console.log('ProviderId in App:', providerId);
  console.log('CustumorId in App:', custumorId);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {showSignup ? (
          <Stack.Screen
            name="choose"
            component={Choose}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="start"
            component={Start}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signupcust"
          component={SignupCust}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen name="login">
          {(props) => <Login {...props} handleLogin={handleLogin} />}
        </Stack.Screen>
        <Stack.Screen name="loginc">
          {(props) => (
            <LoginC {...props} handleLoginCustumor={handleLoginCustumor} />
          )}
        </Stack.Screen>

        <Stack.Screen name="bottomTabNav">
          {(props) => (
            <BottomTabNavigation {...props} custumorId={custumorId} providerId={providerId} options={{
              headerShown: false,
            }} />
          )}
        </Stack.Screen>
        <Stack.Screen name="edit">
          {(props) => (
            <Edit {...props} custumorId={custumorId} />
          )}
        </Stack.Screen>
        <Stack.Screen name="updateprovider">
          {(props) => (
            <UpdateProvider {...props} providerId={providerId} />
          )}
        </Stack.Screen>
        <Stack.Screen name="payment">
          {(props) => (
            <Payment {...props} providerId={providerId} />
          )}
        </Stack.Screen>
        <Stack.Screen name="postprovider">
          {(props) => (
            <ProviderPost {...props} providerId={providerId} />
          )}
        </Stack.Screen>
        <Stack.Screen name="providerprofile">
          {(props) => (
            <ProviderProfile {...props} providerId={providerId} />
          )}
        </Stack.Screen>
        <Stack.Screen name="reservation">
          {(props) => (
            <Reservation {...props} custumorId={custumorId} providerId={providerId} />
          )}
        </Stack.Screen>
        <Stack.Screen name="profileforclient">
          {(props) => (
            <ProfileFOrClient {...props} custumorId={custumorId} providerId={providerId} />
          )}
        </Stack.Screen>
        <Stack.Screen name="custprofile">
          {(props) => (
            <Infocus {...props} custumorId={custumorId} />
          )}
        </Stack.Screen>
        <Stack.Screen name="calender">
          {(props) => (
            <Calender {...props}  providerId={providerId} custumorId={custumorId} />
          )}
        </Stack.Screen>
        <Stack.Screen name="webviewscreen">
          {(props) => (
            <WebViewScreen {...props} custumorId={custumorId} />
          )}
        </Stack.Screen>
        
       
        
        
        <Stack.Screen name="one">
          {(props) => (
            <One {...props} handleLogoutCustumor={handleLogoutCustumor} />
          )}
        </Stack.Screen>  
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
