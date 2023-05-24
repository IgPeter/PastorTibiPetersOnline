import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//importing Admin screens
import MessageForm from '../screens/Admin/createMessageForm';
import Messages from '../screens/Admin/messages';
import Categories from '../screens/Admin/categories';
import Signup from '../screens/Admin/SignUp';
import  Login  from '../screens/Admin/Login';

const Stack = createStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Admin Message' 
                component={Messages}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='Categories' 
                component={Categories}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='Message Form' 
                component={MessageForm}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default function AdminNavigator(){
    return <MyStack/>
}