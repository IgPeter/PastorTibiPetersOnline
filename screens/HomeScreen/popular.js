import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {useFonts} from 'expo-font';

var {height} = Dimensions.get('window');
var {width} = Dimensions.get('window');

import popularData from '../../assets/data/popular.json';
import MessageList from '../messages/messageList';

const PopularMessages = (props) => {

    const [popular, setPopular] = useState([]);

    useEffect(() => {
        setPopular(popularData)

        return () => {
            setPopular([]);
        } 
    }, [])

    const [font] = useFonts({
        WorkSans: require("../../assets/fonts/WorkSans-VariableFont_wght.ttf")
    })

    if(!font){
        return null
    }

    return (
        <View style={styles.container}>
            <Text style = {styles.popHeader}>Popular Messages</Text>
            {popular.length > 0 ? (
                <View style = {styles.popularContainer}>
                    {popular.map((item, index) => {
                            return (
                                <View key={item._id}>
                                    {index <= 5 && (
                                        <MessageList key={item._id} item = {item}
                                        navigation = {props.navigation}/>
                                    )}
                                </View>
                            )
                    })}
                </View>
            ):(
                <Text>No Popular message yet</Text>
            )}
        </View>
    )

} 

const styles = StyleSheet.create({
    container : {
        marginBottom: 20,
    },

    popularContainer: {
        alignItems: 'center',
        width: width - 20,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    popHeader: {
        fontFamily: 'WorkSans',
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default PopularMessages