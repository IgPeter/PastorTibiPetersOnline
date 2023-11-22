import React from 'react';
import { SafeAreaView, View, Image, Text, StyleSheet} from 'react-native';
import {useFonts} from 'expo-font';



const ComingSoon = () => {

    const [font] = useFonts({
        WorkSans: require("../../assets/fonts/WorkSans-VariableFont_wght.ttf"),
      });
    
      if (!font) {
        return null;
      }


    return (
        <SafeAreaView style = {styles.container}>
            <View style={styles.center}>
                <Image source = {require('../../assets/images/pastortibipetersLOGO.png')} 
                resizeMode="contain" style={{width: 250, height: 250}}/>
                <Text style = {{fontFamily: 'WorkSans', fontSize: 20, fontWeight: 'bold'}}>This Page Is Coming Soon...</Text>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ComingSoon;