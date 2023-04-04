import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Userprofile } from './Singlescreens/Userprofile';
import { Singlebook } from './Singlescreens/Singlebook';
import { Singleaudio } from './Singlescreens/Singleaudio';
import { Singlevideo } from './Singlescreens/Singlevideo';
import { Menu } from './Singlescreens/Menu';
// import { Singlemessage } from './Singlescreens/Singlemessage';


export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <Userprofile /> */}
      <Menu />
      {/* <Singlebook /> */}
      {/* <Singleaudio /> */}
      {/* <Singlevideo /> */}
      {/* <Singlemessage /> */}
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
