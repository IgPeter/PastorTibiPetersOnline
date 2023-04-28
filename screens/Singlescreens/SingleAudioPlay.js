import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Dimensions, TouchableOpacity, StyleSheet, Image, ImageBackground} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

const SingleAudioPlay = () => {

    const [audio, setAudio] = useState();
    const [isPlaying, setIsPlaying] = useState(false); 
    const [status, setStatus] = useState({});


    const updatePlaybackStatus = (status, playbackInstance)=>{
    }

    const pause = async () => {
        await audio.pauseAsync();
        setIsPlaying(false);
        console.log(status);
    }

    async function playAudio(){
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            staysActiveInBackground: true
        });

        const playbackAudio = new Audio.Sound();

        await playbackAudio.loadAsync(require('../../assets/GUC-Yours.mp3'));
       
        if(playbackAudio._loaded){
            setIsPlaying(true);
        }

        await playbackAudio.playAsync();
        setAudio(playbackAudio)
        playbackAudio.getStatusAsync().then(result => {
            setStatus(result);
        })
   }

    return (
        <View style = {StyleSheet.container}>
            <ImageBackground style={styles.bImage} source = {require('../../assets/images/audiobackground.jpg')}>
                <Image source = {require('../../assets/messageImages/RoleOfScriptures.jpg')}/>
                <View style = {styles.sliderView}>
                    <Slider style={{width: width - 40}}/>
                </View>
                <View style = {styles.controls}>
                    <TouchableOpacity style = {styles.controlBtn}>
                        <Ionicons name="ios-repeat-sharp" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style = {styles.controlBtn}>
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
                    <TouchableOpacity style = {styles.controlBtn}>
                        <FontAwesome name="forward" size={30} color="black" onPress={updatePlaybackStatus}/>
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