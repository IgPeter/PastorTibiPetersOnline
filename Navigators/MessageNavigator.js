import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//importing message screens
import MessageContainer from '../screens/messages/messageContainer';


const Stack = createNativeStackNavigator();

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