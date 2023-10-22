import {useState, useEffect} from 'react'
import { SafeAreaView, Text, StyleSheet, ActivityIndicator, View, Image} from 'react-native'
import {useFonts} from 'expo-font';

function SplashScreen ({navigation}){
        const [timePassed, setTimePassed] = useState(false);
        const [loading, setLoading] = useState(true);

        useEffect(()=>{
            setTimeout(function() {
                setLoading(false);
                setTimePassed(true);
            }, 10000)
        }, []);

        useEffect(()=>{
            if(timePassed){
                navigation.navigate('Onboarding');
            }
        },[navigation, timePassed])
            
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
                            <View style={styles.center}>
                            <Image source={require('../assets/images/splashImage.jpeg')}
                                ResizeMode = 'contain'
                                style={{width: 200, height:200}}
                            />
                            </View>
                            <View style={[styles.center , {marginTop: -30 }]}>
                                <Text style={[styles.txtStyle, {fontSize: 18, fontWeight: 'bold'}]}>Pastor Tibi Peters</Text>
                                <Text style={[styles.txtStyle, {fontSize: 13, fontWeight: 'normal'}]}>Online Digital Library</Text>
                            </View>
                            {loading == true ? (
                                <View style={{marginTop: 10}}>
                                    <ActivityIndicator 
                                    style={{alignItems: 'center', justifyContent: 'center'}} color="gold"/>
                                </View>
                            ): null}
                    </View>
                </SafeAreaView>
                )
            }
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
    });

export default SplashScreen;