import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const DrawerButton = ({ onPress }) => {
  return (
      <TouchableOpacity onPress={onPress}>
        <Entypo name="menu" size={40} color="black" />
      </TouchableOpacity>
  );
};

export default DrawerButton;