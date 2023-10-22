import React, { useRef, useState, useEffect } from "react";
import { TouchableOpacity, View, StyleSheet, Text, Dimensions } from "react-native";
import { Video } from "expo-av";
import {MaterialIcons } from "@expo/vector-icons";
import {useFonts} from 'expo-font';

const width = Dimensions.get('window').width;

export const Singlevideoplay = (props) => {
  const [item] = useState(props.route.params.item);
  const video = useRef(null);
  const [isRepeat, setIsRepeat] = useState(false);
  const [onPressed, setOnPressed] = useState(false);
  const [font] = useFonts({
    WorkSans: require("../../assets/fonts/WorkSans-VariableFont_wght.ttf")
  })

  useEffect(() => {
    (async () => {
      setOnPressed(true);
      setTimeout(() => {
        setOnPressed(false);
      }, 700)
    })();

    return () => {
      setOnPressed(false);
    }
  }, [])

  /*const removeFirstInstanceRepeatButton = (async () => {
    if(onPressed == true){
      setTimeout(() => {
        setOnPressed(false);
      },500)
    }
  })()

  const removeSecondInstanceRepeatButton = () => {
    if(onPressed == true){
      setTimeout(() => {
        setOnPressed(false);
      },5000)
    }
  }*/

  
  /*useEffect(() => {
  (async ()=> {s
      if(video.current){
        await video.current.loadAsync({uri: `${item.message}`}, {shouldPlay: true});

        //video.current.setWidth('100%'); // Set the desired width
        //video.current.setHeight(350);
      }
    })();
  },[video.current])*/

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
    <TouchableOpacity onPress = {() => {setOnPressed(true); 
      setTimeout(() => {
        setOnPressed(false);
      }, 2950)
    }}>
        <Video
          ref={video}
          source={{uri: `${item.message}`}}
          resizeMode="cover"
          useNativeControls
          style={styles.video}
          onPlaybackStatusUpdate={handleOnPlaybackStatusUpdate}
        />
    <View style={styles.controlsContainer}>
        {
          onPressed ? (
            <TouchableOpacity onPress={() => setIsRepeat(!isRepeat)}>
          {isRepeat ? (
            <MaterialIcons name="repeat-one" size={30} color="white" />
          ) : (
            <MaterialIcons name="repeat" size={30} color="white" />
          )}
          </TouchableOpacity>
          ): null
        }
      </View>
      <View style={styles.videoTitle}>
        <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 20, fontFamily: 'WorkSans', padding: 20}}>
          {item.title}
        </Text>
        <Text style={{ fontSize: 14, fontWeight: '600', marginTop: 5, fontFamily: 'WorkSans' }}>
          Pastor Tibi Peters
        </Text>
      </View>
      <View style={styles.comments}>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

//  style={styles.buttons}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    // backgroundColor: "indigo",
    marginTop: 20
  },
  main: {
    height: 300,
    backgroundColor: "#D9D9D9",
  },
  videoTitle: {
    marginTop: 10,
    marginLeft: 16
  },
  comments: {
    paddingHorizontal: 16,
    marginTop: 37,
  },
  controlsContainer: {
    position: 'absolute',
    top: 276,
    paddingLeft: 30
  },
  video: {
    width: '100%',
    height: 350,
    marginBottom: 10
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
