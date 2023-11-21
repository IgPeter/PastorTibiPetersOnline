import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Settingspage } from "../screens/Singlescreens/Settingspage";

const Stack = createNativeStackNavigator();

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