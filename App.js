import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
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

/*Sentry.init({
  dsn: 'https://0a862f7b3c78d4ba6f445329704e3d49@o4506037962145792.ingest.sentry.io/4506037987115008',
  enableInExpoDevelopment: true,
  debug: true,
  tracesSampleRate: 1.0,
  release: '1.0.0',
  environment: 'production'
})*/

export default function App() {
  return (
    <Auth>
        <Provider store = {store}>
        <NavigationContainer>
          <AppNavigator/>
          <Toast />
        </NavigationContainer>
        </Provider>
    </Auth>
 );
}