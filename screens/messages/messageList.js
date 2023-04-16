import React from 'react'
import {View, Dimensions, TouchableOpacity, StyleSheet} from 'react-native';

//Screens
import MessageInterfaceCard from './messageInterfaceCard';

const MessageList = (props) => {
    const {item} = props;

    return (
        <TouchableOpacity style = {styles.container}>
            <View style = {{backgroundColor: '#ffffff'}}>
                <MessageInterfaceCard {...item} />
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        margin: 5,
        marginTop: 30
    }
})

export default MessageList