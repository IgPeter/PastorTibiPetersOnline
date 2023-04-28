import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, LogBox } from "react-native";

//Redux
import { Provider } from 'react-redux';
import store from './Redux/Store';

//logs
LogBox.ignoreAllLogs(true);

//Navigation
import HomeNavigator from "./Navigators/HomeNavigator";

export default function App() {
  return (
    <Provider store = {store}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <HomeNavigator />
      </NavigationContainer>
    </Provider>
 );
}