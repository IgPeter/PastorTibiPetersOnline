import React, {useState} from 'react';
import {StyleSheet, SafeAreaView,StatusBar, View, Text} from 'react-native';
import {useFonts} from 'expo-font'
import { Button } from '../components/Button';

const onboardingHeader = "Get access to publications by Pastor Tibi Peters"
const onboardingPara = "Gain 100% access of publications of Pastor Tibi Peters in Mp3, PDF, etc."

const OnBoardingScreen =  ({navigation}) => {
    
    const [font] = useFonts({
        WorkSans: require("../assets/fonts/WorkSans-VariableFont_wght.ttf")
    })

    if(!font){
        return null
    }

    return (
        <SafeAreaView style ={{flex:1, justifyContent: 'flex-end'}}>
                <StatusBar style ={{borderWidth: 2, borderColor: 'red'}}
                    backgroundColor = "#FFFFFF"
                    barStyle = "dark-content"
                />
            <View style={styles.content}>
                    <Text style={styles.txtStyle}>{onboardingHeader + ' ' + onboardingPara}</Text>
                    <Button title = "Get Started" btnstyle={{ backgroundColor: "#141414", marginTop: 5,
                    borderRadius: 5, height: 45, justifyContent: "center", fontFamily: 'WorkSans', 
                    paddingLeft: 30, paddingRight: 30, paddingTop: 5, paddingBottom: 5, marginBottom: 5, }} 
                    txtstyle={{ color: "#f2f2f2", fontSize: 13, fontWeight: "500", textAlign: "center" }}
                    onPress={() => navigation.navigate('Login')}               />
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        padding: 15,
        marginBottom: 200
    },

    txtStyle: {
        marginBottom: 5,
        padding: 10,
        color: '#000',
        fontFamily: 'WorkSans',
        fontWeight: 600,
        fontSize: 15
    }
});


export default OnBoardingScreen;