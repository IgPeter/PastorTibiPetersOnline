import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

export const AudioCard = ({ imageSource }) => {
  return (
    <TouchableOpacity>
      <Image source={imageSource} style={styles.image} />
      {/* <Text style={styles.title}>{title}</Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 280,
    height: 280,
    resizeMode: 'cover',
    borderRadius: 5,
  },
//   title: {
//     // marginTop: 10,
//     fontSize: 24,
//     fontWeight: '600 ',
//     textAlign: 'center',
//     width: '100%'
//   },
});
