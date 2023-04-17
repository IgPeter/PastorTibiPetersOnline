import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground} from 'react-native';
import { Ionicons } from '@expo/vector-ico';


const SingleAudioPlay = () => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [volume, setVolume] = useState(1.0);
    const [isBuffering, setIsBuffering] = useState(false)
    const [playBackInstance, setPlayBackInstance] = useState(null);


    return (
        <View style = {StyleSheet.container}>
            <ImageBackground>
                <Image/>
                <View>
                    <TouchableOpacity>
                        <Ionicons name ='ios-skip-backward'/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name ='ios-pause'/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name ='ios-play-circle'/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name ='ios-skip-forward'/>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})

export default SingleAudioPlay