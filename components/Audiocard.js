import React, { useState } from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

export const AudioCard = ({ title, imageSource, audioSource }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundObject = new Audio.Sound();

  const playAudio = async () => {
    try {
      if (isPlaying) {
        await soundObject.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundObject.loadAsync(audioSource);
        await soundObject.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={playAudio} style={styles.card}>
      <Image source={imageSource} style={styles.image} />
      {/* <Text style={styles.title}>{title}</Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 195,
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
