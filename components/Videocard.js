import React, { useState } from 'react'; 
import { StyleSheet, View, Text, Image, TouchableOpacity, Video } from 'react-native';

export const VideoCard = ({ title, imageSource, videoSource }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePress = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      {isPlaying ? (
        <Video
          style={styles.video}
          source={videoSource}
          resizeMode="cover"
          onEnd={() => setIsPlaying(false)}
          controls={true}
        />
      ) : (
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.card}>
            <Image style={styles.image} source={imageSource} />
            <TouchableOpacity style={styles.playButton}>
              <Image source={require('../assets/icons/play.png')} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 16,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  playButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  video: {
    flex: 1,
  },
});