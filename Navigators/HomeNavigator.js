import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import OnBoardingScreen from "../screens/onboarding";


const Stack = createStackNavigator();

const MyStack = () => {
  return (
      <Stack.Navigator>
          <Stack.Screen
            name="Home" component={HomeScreen}
            options = {{
              headerShown: false
            }}
          />
      </Stack.Navigator>
    )
    }

export default function HomeNavigator() {
  return <MyStack />;
}
