import React, { useRef, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";

export const Singlevideoplay = (props) => {

  const [item, setItem] = useState(props.route.params.item);

  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [isMute, setIsMute] = useState(false)
  return (
    <ScrollView style={styles.container}>
      <VideoPlayer 
      style={styles.main}
        videoProps={{
          shouldPlay: true,
          resizeMode: ResizeMode.CONTAIN,
          // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
          source: {
            uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          }
        }}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        // fullscreen={}
         />
      <View style={styles.videoTitle}>
        <Text style={{ fontSize: 24, fontWeight: 600, marginTop: 26 }}>
          The Process of Believing
        </Text>
        <Text style={{ fontSize: 14, marginTop: 5 }}>Pastor Tibi Peters</Text>
      </View>
      <View style={styles.comments}>
        <Text>Comments</Text>
      </View>
    </ScrollView>
  );
};

//  style={styles.buttons}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // backgroundColor: "indigo",
    marginTop: 20,
  },
  main: {
    height: 200,
    backgroundColor: "#D9D9D9",
  },
  videoTitle: {
    marginTop: 10,
    marginLeft: 16,
  },
  comments: {
    paddingHorizontal: 16,
    marginTop: 37,
  },
});

{
  /* <Video
        ref={video}
        style={styles.main}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      /> */
}
