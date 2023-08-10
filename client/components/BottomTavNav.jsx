
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

import Home from './Home/HomePage.jsx';
import Choose from './Choose.jsx';
import One from './Custumor/One.jsx';
import { useRoute } from '@react-navigation/native';
import OneProv from './Provider/OneProv.jsx';
import AllProviders from './Provider/AllProviders.jsx';
import Chat from './chat/Chat.jsx';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = ({providerId, custumorId}) => {
  const navigation = useNavigation();
  const route = useRoute();

  const role = route.params?.role; 
  console.log("role in the homepage:",role);

console.log("provider id =",providerId);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Providers') {
            iconName = focused ? 'store' : 'store';
          } else if (route.name === 'message') {
            iconName = focused ? 'facebook-messenger' : 'facebook-messenger';
          }
          else if (route.name === 'profile') {
            iconName = focused ? 'user' : 'user';
          }
          
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarOnPress: ({ navigation, route }) => {
          navigation.navigate(route.name);
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
<Tab.Screen name="home">
  {() => <Home custumorId={custumorId} providerId={providerId} />}
</Tab.Screen>
     
     <Tab.Screen name="Providers" component={AllProviders} />
     <Tab.Screen name="message" component={Chat}/>
     <Tab.Screen name="profile" component={role === 'provider' ? OneProv : One}  /> 
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
