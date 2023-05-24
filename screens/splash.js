import React, {useState} from 'react'
import { StatusBar, SafeAreaView, Text, StyleSheet, ActivityIndicator, Dimensions, View, Image} from 'react-native'
import {useFonts} from 'expo-font';

    function SplashScreen ({navigation}){
        const [timePassed, setTimePassed] = useState(false);
        const [loading, setLoading] = useState(true);

            setTimeout(function() {
                setTimePassed(true);
                setLoading(false);
            }, 10000)

        const [font] = useFonts({
            WorkSans: require("../assets/fonts/WorkSans-VariableFont_wght.ttf"),
          });
        
          if (!font) {
            return null;
          }

          if(!timePassed){
                return (
                    <SafeAreaView style = {styles.container}>
                        <View>
                            <StatusBar 
                                backgroundColor = "#FFFFFF"
                                barStyle = "dark-content"
                            />
                            <View style={styles.center}>
                            <Image source={require('../assets/images/splashImage.jpeg')}
                                ResizeMode = 'contain'
                                style={{width: 200, height:200}}
                            />
                            </View>
                            <View style={[styles.center , {marginTop: -30 }]}>
                                <Text style={[styles.txtStyle, {fontSize: 18, fontWeight: 'bold'}]}>Pastor Tibi Peters</Text>
                                <Text style={[styles.txtStyle, {fontSize: 13, fontWeight: 600}]}>Online Digital Library</Text>
                            </View>
                            {loading == true ? (
                                <View>
                                    <ActivityIndicator 
                                    style={{alignItems: 'center', justifyContent: 'center'}} color="gold"/>
                                </View>
                            ): null}
                    </View>
                </SafeAreaView>
                )
            }
            navigation.navigate('Onboarding')
            return null;
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff'
        },
        txtStyle:{
            fontFamily: 'WorkSans'
        },

        center: {
            alignItems: 'center',
            justifyContent: 'center'
        }
    })

    export default SplashScreen;