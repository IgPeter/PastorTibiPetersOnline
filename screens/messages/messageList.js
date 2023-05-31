import React from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native';

//Screens
import MessageInterfaceCard from './messageInterfaceCard';

const MessageList = (props) => {
    const {item} = props;

    return (
        <TouchableOpacity style = {styles.container} onPress={()=> {        
            item.contentType.toLowerCase() === 'audio' ? 
            props.navigation.navigate('Single Audio', {item: item})
            : item.contentType.toLowerCase() === 'video' ? 
            props.navigation.navigate('Single Video', {item: item})
            : props.navigation.navigate('Single Book', {item: item})
        }}>
            <View style = {{backgroundColor: '#ffffff'}}>
                <MessageInterfaceCard {...item} />
            </View>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    container: {
        margin: 5,
        marginTop: 10
    }
})

export default MessageList