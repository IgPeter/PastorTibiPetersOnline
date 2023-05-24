import React, { useRef, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Video } from "expo-av";
import VideoPlayer from "expo-video-player";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import {useFonts} from 'expo-font';

let compPressed = false

export const Singlevideoplay = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const video = useRef(null);
  const [isRepeat, setIsRepeat] = useState(false);
  const [font] = useFonts({
    WorkSans: require("../../assets/fonts/WorkSans-VariableFont_wght.ttf")
  })

  if (!font){
    return null
  }

  const handleOnPlaybackStatusUpdate = (status) => {
    if(status.didJustFinish){
        if(isRepeat){
          video.current.replayAsync()
        }else{
          video.current.stopAsync();
        }
    }
  }
  
  return (
    <View style={styles.container}>
        <Video
          onPress={() => compPressed = !compPressed}
          ref={video}
          source={{ uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }} // Replace with your video source
          resizeMode="cover"
          useNativeControls
          style={styles.video}
          onPlaybackStatusUpdate={handleOnPlaybackStatusUpdate}
        />
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          onPress={() => setIsRepeat(!isRepeat)}
        >
          {isRepeat ? (
            <MaterialIcons name="repeat-one" size={30} color="white" />
          ) : (
            <MaterialIcons name="repeat" size={30} color="white" />
          )}
          </TouchableOpacity>
      </View>
      <View style={styles.videoTitle}>
        <Text style={{ fontSize: 20, fontWeight: 700, marginTop: 20, fontFamily: 'WorkSans', padding: 20}}>
          {item.title}
        </Text>
        <Text style={{ fontSize: 14, fontWeight: 600, marginTop: 5, fontFamily: 'WorkSans' }}>
          Pastor Tibi Peters
        </Text>
      </View>
      <View style={styles.comments}>
        <Text>{item.description}</Text>
      </View>
    </View>
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
    height: 300,
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
  controlsContainer: {
    paddingLeft: 30,
    position: 'absolute',
    top: 275,
  },
  video: {
    height: 350
  }
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
