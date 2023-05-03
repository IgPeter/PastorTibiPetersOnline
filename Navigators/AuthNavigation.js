import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {Login} from '../screens/Authentication/Login';
import {Signup} from '../screens/Authentication/Signup';
import {Userprofile} from '../screens/Singlescreens/Userprofile';


const Stack = createStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Login' 
                component={Login}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='Register' 
                component={Signup}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='User Profile' 
                component={Userprofile}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default function AuthNavigator(){
    return <MyStack/>
}