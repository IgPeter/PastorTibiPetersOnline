import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyTabBar from './MyTabBar';
import { Settingspage } from "../screens/Singlescreens/Settingspage";
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MessageContainer from "../screens/messages/messageContainer";
import AuthNavigator from "./AuthNavigation";

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      tabBar = {(props) => <MyTabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnkeyboard: true,
        showLabel: false,
        headerShown: false,
        tabBarStyle : [
          {
            display:'flex'
          },
          null
        ]
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={MessageContainer} />
      <Tab.Screen name="Settings" component={Settingspage} />
      <Tab.Screen name="User" component={AuthNavigator} />
    </Tab.Navigator>
  );
};


export default Main