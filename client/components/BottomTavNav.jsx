
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

import Home from './Home/HomePage.jsx';
import Choose from './Choose.jsx';
import One from './Custumor/One.jsx';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = ({providerId}) => {
  const navigation = useNavigation();



  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'cog' : 'cog';
          } else if (route.name === 'profile') {
            iconName = focused ? 'user' : 'user';
          }

          return <Entypo name={iconName} size={size} color={color} />;
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
  {() => <Home providerId={providerId} />}
</Tab.Screen>
     <Tab.Screen name="profile" component={One}  /> 
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
