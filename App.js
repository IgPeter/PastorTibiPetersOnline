import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, LogBox } from "react-native";
import Toast from 'react-native-toast-message';

//Redux
import { Provider } from 'react-redux';
import store from './Redux/Store';

//contextApi
import Auth from "./context/store/Auth";

//logs
LogBox.ignoreAllLogs(true);

//Navigation
import AppNavigator from "./Navigators/AppNavigator";

export default function App() {
  return (
    <Auth>
        <Provider store = {store}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppNavigator/>
          <Toast />
        </NavigationContainer>
        </Provider>
    </Auth>
 );
}