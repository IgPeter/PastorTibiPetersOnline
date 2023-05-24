import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//importing message screens
import MessageContainer from '../screens/messages/messageContainer';


const Stack = createStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Explore Messages' 
                component={MessageContainer}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default function MessageNavigator(){
    return <MyStack/>
}