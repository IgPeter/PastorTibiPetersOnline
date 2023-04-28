import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

export const MenuButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Image source={require('../assets/icons/menu.png')} style={styles.buttonIcon} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  buttonIcon: {
    marginLeft: 10,
  },
});
