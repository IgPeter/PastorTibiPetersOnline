import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, TouchableOpacity, StyleSheet, Image, ImageBackground} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

const SingleAudioPlay = (props) => {
    const [item] = useState(props.route.params.item)
    const [audio, setAudio] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const [isRepeat, setIsRepeat] = useState(false);

    const pause = async () => {
        await audio.pauseAsync();
        setIsPlaying(false);
    }

    const playAudio = async () => {
        setIsPlaying(true)
        await audio.playAsync()
        audio.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }

    const loadAudio = async() => {
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            staysActiveInBackground: true
        });

        const playbackAudio = new Audio.Sound();

        await playbackAudio.loadAsync(require('../../assets/GUC-Yours.mp3'));

        if(playbackAudio._loaded){
            setAudio(playbackAudio)       
            //getting the duration and setting the duration
            const {duration} = playbackAudio.getStatusAsync()
            setDuration(duration)
        }

    }

    const skipForward = async () => {
        const newPosition = position + 10; // Skip 10 seconds forward
        if (newPosition < duration) {
            await audio.setPositionAsync(newPosition * 1000);
    }
}

    async function skipBackward() {
        const newPosition = position - 10; // Skip 10 seconds backward
        if (newPosition > 0) {
            await audio.setPositionAsync(newPosition * 1000);
        }
    }

    // Function to update the seekbar position
    const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded) {
            setPosition(status.positionMillis / 1000);
            setDuration(status.durationMillis / 1000);
        }

        // Check if the audio has reached its end
    if (status.didJustFinish) {
        if (isRepeat) {
          // If repeat is enabled, play the audio again
          audioPlayer.replayAsync();
        } else {
          // If repeat is not enabled, stop the audio playback
          audioPlayer.stopAsync();
        }
      }
  };

  useEffect(() => {
    loadAudio();
    return audio ? audio.loadAsync : undefined
  }, [])

    return (
        <View style = {StyleSheet.container}>
            <ImageBackground style={styles.bImage} source = {require('../../assets/images/audiobackground.jpg')}>
                <Image source = {{uri: `${item.image}`}}/>
                <Text style = {{fontFamily: 'WorkSans', fontSize: 16, color: '#fff', 
                fontWeight: 'bold', padding: 20}}>{item.title}</Text>
                <View style = {styles.sliderView}>
                    <Slider style={{width: width - 40}}
                        minimumValue={0}
                        maximumValue={duration}
                        value={position}
                        onSlidingComplete={async (value) => await audio.setPositionAsync(value * 1000) }
                        minimumTrackTintColor="#FF0000"
                        maximumTrackTintColor="#CCCCCC"
                    />
                </View>
                <View style = {styles.controls}>
                    <TouchableOpacity style = {styles.controlBtn} onPress={() => setIsRepeat(!isRepeat)}>
                        {
                            isRepeat ? <MaterialIcons name="repeat-one" size={30} color="black" />
                            :  <MaterialIcons name="repeat" size={30} color="black" />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.controlBtn} onPress={skipBackward}>
                        <FontAwesome name="backward" size={30} color="black"/>
                    </TouchableOpacity>
                    {isPlaying == true ? 
                        (<TouchableOpacity style = {styles.controlBtn}>
                            <FontAwesome name="pause" size={30} color="black" onPress={pause}/>
                        </TouchableOpacity>):
                        (<TouchableOpacity style = {styles.controlBtn}>
                            <FontAwesome name="play-circle" size={30} color="black" onPress={playAudio} />
                        </TouchableOpacity>)
                    }
                    <TouchableOpacity style = {styles.controlBtn}  onPress={skipForward}>
                        <FontAwesome name="forward" size={30} color="black"/>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: height
    },

    controls : {
        justifyContent: 'center',
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        width: width - 40,
        height: height/6,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 90
    },

    sliderView: {
        backgroundColor: '#000',
        height: 30,
        width: width - 40,
        marginTop: 20,
        justifyContent: 'center'
    },

    bImage: {
        height: height,
        alignItems: 'center',
        justifyContent: 'center'
    },

    controlBtn: {
        margin: 10
    }
})

export default SingleAudioPlay