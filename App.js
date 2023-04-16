import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, LogBox } from "react-native";
import { Userprofile } from "./screens/Singlescreens/Userprofile";
import { Singlebook } from "./screens/Singlescreens/Singlebook";
import { Singleaudio } from "./screens/Singlescreens/Singleaudio";
import { Singlevideo } from "./screens/Singlescreens/Singlevideo";
import { Singlevideoplay } from "./screens/Singlescreens/Singlevideoplay";
import { Subscription } from "./screens/Singlescreens/Subscription";
import { Settingspage } from "./screens/Singlescreens/Settingspage";
import { Singlemessage } from "./screens/Singlescreens/Singlemessage";
import Constants from "expo-constants";
import { Menu } from "./screens/Singlescreens/Menu";
import { Getotp } from "./screens/Authentication/Getotp";
import { Createpassword } from "./screens/Authentication/Createpassword";
import { Login } from "./screens/Authentication/Login";
import { Onboarding } from "./screens/Authentication/Onboarding";
import { Passwordsuccess } from "./screens/Authentication/Passwordsuccess";
import { Signup } from "./screens/Authentication/Signup";
import { Useotp } from "./screens/Authentication/Useotp";
import { Bookreader } from "./screens/Singlescreens/Bookreader";

//logs
LogBox.ignoreAllLogs(true);

//Navigation
import Main from "./Navigators/Main";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Main />
      {/* <Getotp /> */}
      {/* <Createpassword /> */}
      {/* <Login /> */}
      {/* <Onboarding /> */}
      {/* <Passwordsuccess /> */}
      {/* <Signup /> */}
      {/* <Useotp /> */}
      {/*<Userprofile />*/}
      {/* <Menu /> */}
      {/*<Singlebook />*/}
      {/*<Singleaudio />*/}
      {/* <Singlevideo /> */}
      {/*<Subscription />*/}
      {/*<Settingspage />*/}
      {/*<Singlemessage />*/}
      {/*<Singlevideoplay />*/}
      {/* <HomeScreen /> */}
      {/*<Bookreader />*/}
    </NavigationContainer>
  );
}