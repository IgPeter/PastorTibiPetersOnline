import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Singleaudio } from "../screens/Singlescreens/Singleaudio";
import { Singlevideo } from "../screens/Singlescreens/Singlevideo";
import { Singlebook } from "../screens/Singlescreens/Singlebook";
import {Singlevideoplay} from "../screens/Singlescreens/Singlevideoplay";
import { Bookreader } from "../screens/Singlescreens/Bookreader";
import SingleAudioPlay from "../screens/Singlescreens/SingleAudioPlay";
import messageContainer from '../screens/messages/messageContainer';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ExploreMessages" component={messageContainer} 
          options={{ headerShown: false }} />

      <Stack.Screen name="Single Audio" component={Singleaudio}
          options={{ headerShown: false}} />

      <Stack.Screen name="Single Video" component={Singlevideo}
          options={{ headerShown: false}} />

      <Stack.Screen name="Video Play" component={Singlevideoplay} 
          options ={{ headerShown: false}} />

      <Stack.Screen name="Audio Play" component={SingleAudioPlay} 
          options ={{ headerShown: false}} />

      <Stack.Screen name="Bookreader" component={Bookreader} 
          options ={{ headerShown: false}}/>

      <Stack.Screen name="Single Book" component={Singlebook}
          options={{ headerShown: false}} />
    </Stack.Navigator>
  );
};

export default function HomeNavigator() {
  return <MyStack />;
}
