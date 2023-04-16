import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MessageContainer from '../screens/messages/messageContainer';

const Stack = createStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name = "Home"
                component = {MessageContainer}
                options = {{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default function HomeNavigator(){
    return <MyStack />
}