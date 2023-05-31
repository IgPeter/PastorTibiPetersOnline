import React, {useContext} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyTabBar from './MyTabBar';
import HomeNavigator from './HomeNavigator'
import MessageNavigator from './MessageNavigator';
import SettingNavigator from "./SettingNavigator";
import AdminNavigator from "./AdminNavigator";
import AuthGlobal from "../context/store/AuthGlobal";
import AuthNavigator from "./AuthNavigation";

const Tab = createBottomTabNavigator();

const Main = () => {
  const context = useContext(AuthGlobal);

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
      <Tab.Screen name="HomeScreen" component={HomeNavigator}/>
      <Tab.Screen name="Explore" component={MessageNavigator}/>
      <Tab.Screen name="Setting" component={SettingNavigator} />
      {context.stateUser.user.isAdmin == true ? (
        <Tab.Screen name="User" component={AdminNavigator}/>
      ):(
        <Tab.Screen name="User" component={AuthNavigator}/>
      )}
    </Tab.Navigator>
  );
};


export default Main