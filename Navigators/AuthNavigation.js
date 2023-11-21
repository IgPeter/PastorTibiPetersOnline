import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Login} from '../screens/Authentication/Login';
import {Signup} from '../screens/Authentication/Signup';
import {Userprofile} from '../screens/Singlescreens/Userprofile';

const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator>
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