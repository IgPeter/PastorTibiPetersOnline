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
            <Text style = {styles.recHeader}>Recommended Messages</Text>
            {recommended.length > 0 ? (
                <View style = {styles.recommendedContainer}>
                    {recommended.map((item, index) => {
                            return (
                                <View>
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
        paddingBottom: 130
    },

    recommendedContainer: {
        alignItems: 'center',
        width: width - 20,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    recHeader: {
        fontFamily: 'WorkSans',
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default RecommendedMessages