import React from 'react';
import {StyleSheet, TouchableOpacity, Text, ScrollView, Dimensions, View} from 'react-native';
import {useFonts} from 'expo-font';

var width = Dimensions.get('window').width;


const MessageCategory = (props) => {

    const [font] = useFonts({
        WorkSans: require("../assets/fonts/WorkSans-VariableFont_wght.ttf"),
      });
    
      if (!font) {
        return null;
      }

    
    return (
        <ScrollView horizontal={true} bounces={true} style={styles.scrollView}>
                <TouchableOpacity key={1} onPress = { () => {props.changeCT('all'), props.setActive(-1)}}>
                    <View style = {[styles.center, {margin: 5}, 
                        props.active == -1 ? styles.active : styles.inactive]}>
                            <Text style = {styles.category}>All</Text>
                    </View>
                </TouchableOpacity>
                {props.categories.map((item) => (
                    <TouchableOpacity key = {item._id} onPress = { () => {props.changeCT(item._id),
                     props.setActive(props.categories.indexOf(item))}}>
                    <View style = {[styles.center, {margin: 5}, 
                        props.active == props.categories.indexOf(item) ? styles.active : styles.inactive]}>
                            <Text style = {styles.category}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
                ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView : {
        paddingTop: 10,
        paddingBottom: 5,
        width: width - 40,
        paddingLeft: 10,
        marginTop: 10
    },

    category : {
        fontFamily: 'WorkSans',
        fontSize: 13,
        color:'#f2f2f2',
        textAlign: 'center'
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        borderRadius: 3
    },

    active: {
        backgroundColor: '#d4af37'
    },

    inactive: {
        backgroundColor: '#000'
    }
})

export default MessageCategory