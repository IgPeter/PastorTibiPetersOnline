import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Settingspage } from "../screens/Singlescreens/Settingspage";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
      <Stack.Navigator>
          <Stack.Screen
            name="Settings" component={Settingspage}
            options = {{
              headerShown: false
            }}
          />
      </Stack.Navigator>
    )
    }

export default function SettingNavigator() {
  return <MyStack />;
}