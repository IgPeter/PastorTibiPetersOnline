import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigator from "./HomeNavigator";
import MyTabBar from './MyTabBar';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      tabBar = {(props) => <MyTabBar {...props} />}
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false
      }}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="onboarding" component={HomeNavigator} />
      <Tab.Screen name="Settings" component={HomeNavigator} />
      <Tab.Screen name="User" component={HomeNavigator} />
    </Tab.Navigator>
  );
};


export default Main