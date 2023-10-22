import React from 'react'; 
import { StyleSheet, Image, TouchableOpacity} from 'react-native';

export const VideoCard = ({imageSource}) => {
  return (
    <TouchableOpacity>
      <Image style={styles.image} source={imageSource} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 280,
    height: 280,
    borderRadius: 8,
    marginBottom: 8,
  }
});