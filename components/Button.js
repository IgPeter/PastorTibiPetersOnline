import React from 'react';
import { TouchableOpacity, Text} from 'react-native';

export const Button = ({ onPress, title, btnstyle, txtstyle }) => (
  <TouchableOpacity onPress={onPress} style={btnstyle}>
    <Text style={txtstyle}>{title}</Text>
  </TouchableOpacity>
);
