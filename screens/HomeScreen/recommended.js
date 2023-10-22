import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {useFonts} from 'expo-font';

var {width} = Dimensions.get('window');

import recommendedData from '../../assets/data/recommended.json';
import MessageList from '../messages/messageList';

const RecommendedMessages = (props) => {

    const [recommended, setRecommended] = useState([]);

    useEffect(() => {
        setRecommended(recommendedData)

        return () => {
            setRecommended([]);
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
            <Text style = {styles.recHeader}>JUST A TIP OF THE ICEBERG!</Text>
            <Text style ={{fontFamily: 'WorkSans', fontWeight: 'bold', fontSize: 14, color: '#E5B80B', 
        marginTop: 0, marginBottom: 0, marginLeft: 20}}>Explore these highlights for you</Text>
            {recommended.length > 0 ? (
                <View style = {styles.recommendedContainer}>
                    {recommended.map((item, index) => {
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
                <Text>No Recommendations for you yet</Text>
            )}
        </View>
    )

} 

const styles = StyleSheet.create({
    container : {
        marginTop: 10,
        paddingTop: 30,
        paddingBottom: 30
    },

    recommendedContainer: {
        alignItems: 'center',
        width: width - 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 0
    },
    recHeader: {
        fontFamily: 'WorkSans',
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 20
    }
});

export default RecommendedMessages;