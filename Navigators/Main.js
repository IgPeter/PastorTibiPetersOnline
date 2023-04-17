import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyTabBar from './MyTabBar';
import { Settingspage } from "../screens/Singlescreens/Settingspage";
import { Userprofile } from "../screens/Singlescreens/Userprofile";
import HomeScreen from '../screens/Singlescreens/HomeScreen';
import MessageContainer from '../screens/messages/messageContainer';
import HomeNavigator from './HomeNavigator';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      tabBar = {(props) => <MyTabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnkeyboard: true,
        showLabel: false,
        tabBarStyle : [
          {
            display:'flex'
          },
          null
        ]
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={HomeNavigator} />
      <Tab.Screen name="Settings" component={Settingspage} />
      <Tab.Screen name="User" component={Userprofile} />
    </Tab.Navigator>
  );
};


export default Main