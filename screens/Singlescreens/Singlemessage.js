import React, { useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";

export const Singlemessage = () => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  return (
    <View style={styles.container}>
      <VideoPlayer
        style={{height: 450}}
        videoProps={{
          shouldPlay: true,
          resizeMode: ResizeMode.CONTAIN,
          // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
          source: {
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          },
        }}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        // fullscreen={}
         />
      <View style={styles.videoTitle}>
        <Text style={{fontSize: 18, fontWeight: 600}}>Enjoying God's Fufillment</Text>
        <Text style={{fontSize: 12, marginTop: 5}}>Pastor Tibi Peters</Text>
      </View>
    </View>
  );
}
// styles.container
// style={styles.videoTitle}
//  style={styles.buttons}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 20,
  },
  main: {
    // height: "85%",
    backgroundColor: "#D9D9D9",
  },
  videoTitle: {
    marginTop: 20,
    alignItems: "center"
  }
});
