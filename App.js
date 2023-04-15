import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Userprofile } from './Singlescreens/Userprofile';
import { Singlebook } from './Singlescreens/Singlebook';
import { Singleaudio } from './Singlescreens/Singleaudio';
import { Singlevideo } from './Singlescreens/Singlevideo';
import { Singlevideoplay } from './Singlescreens/Singlevideoplay';
import { Subscription } from './Singlescreens/Subscription';
import { Settingspage } from './Singlescreens/Settingspage';
import { Singlemessage } from './Singlescreens/Singlemessage';
import Constants from 'expo-constants';
import { Menu } from './Singlescreens/Menu';
import { Getotp } from './Authentication/Getotp';
import { Createpassword } from './Authentication/Createpassword';
import { Login } from './Authentication/Login';
import { Onboarding } from './Authentication/Onboarding';
import { Passwordsuccess } from './Authentication/Passwordsuccess';
import { Signup } from './Authentication/Signup';
import { Useotp } from './Authentication/Useotp';
import { Bookreader } from './Singlescreens/Bookreader';


export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <Getotp /> */}
      {/* <Createpassword /> */}
      {/* <Login /> */}
      {/* <Onboarding /> */}
      {/* <Passwordsuccess /> */}
      {/* <Signup /> */}
      {/* <Useotp /> */}
      { /*<Userprofile />*/ }
      {/* <Menu /> */}
      {/*<Singlebook />*/}
      {/* <Singleaudio /> */}
      {/* <Singlevideo /> */}
      {/*<Subscription />*/}
      {/*<Settingspage />*/}
      {/*<Singlemessage />*/}
      { /*<Singlevideoplay />*/ }
      {/* <HomeScreen /> */}
      {/*<Bookreader />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
