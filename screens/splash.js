import {useState, useEffect} from 'react'
import { SafeAreaView, Text, StyleSheet, ActivityIndicator, View, Image, Dimensions} from 'react-native'
import {useFonts} from 'expo-font';

const {width, height} = Dimensions.get('window');

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
                            <View style={[styles.center, {}]} >
                            <Image source={require('../assets/images/pastortibipetersLOGO.png')}
                                resizeMode="contain" style={{width: 200, height:200}}
                            />
                            </View>
                            <View style={[styles.center , { flexDirection: 'flex-end'}]}>
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
            backgroundColor: '#ffffff',
            paddingBottom:  20 
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