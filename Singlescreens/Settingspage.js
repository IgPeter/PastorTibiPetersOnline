import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    ScrollView,
    Image,
  } from "react-native";
  import React from "react";
  import user from "./user.json";
  import { Button } from "../components/Button";
  import { BackButton } from "../components/Backbutton";
  import { MenuButton } from "../components/Menubutton";
  
  export const Settingspage = () => {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={() => console.log("Button pressed")} />
          <Text style={{ fontSize: 26, fontWeight: "bold", left: 26, alignSelf: "center" }}>
            Settings
          </Text>
        </View>
        <View style={styles.menuItems}>
            <TouchableOpacity style={styles.item}>
                <Image source={require('../assets/profile2.png')}/>
                <Text style={{ fontSize: 16, marginLeft: 23}}>Account</Text>
                <Image style={{marginLeft: 175}} source={require('../assets/forwardarrow.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Image source={require('../assets/notification.png')}/>
                <Text style={{ fontSize: 16, marginLeft: 25}}>Notifications</Text>
                <Image style={{marginLeft: 150}} source={require('../assets/forwardarrow.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Image source={require('../assets/appearance.png')}/>
                <Text style={{ fontSize: 16, marginLeft: 18}}>Appearance</Text>
                <Image style={{marginLeft: 152}} source={require('../assets/forwardarrow.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Image source={require('../assets/privacy.png')}/>
                <Text style={{ fontSize: 16, marginLeft: 22}}>Privacy & Security</Text>
                <Image style={{marginLeft: 110}} source={require('../assets/forwardarrow.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Image source={require('../assets/help.png')}/>
                <Text style={{ fontSize: 16, marginLeft: 23}}>Help & FAQ</Text>
                <Image style={{marginLeft: 150}} source={require('../assets/forwardarrow.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Image source={require('../assets/info.png')}/>
                <Text style={{ fontSize: 16, marginLeft: 23}}>About</Text>
                <Image style={{marginLeft: 180}} source={require('../assets/forwardarrow.png')} />
            </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
  const styles = StyleSheet.create({
    container: {
      // backgroundColor: "brown",
      flex: 1,
      width: "100%",
      height: "100%",
      marginTop: 20,
    },
    header: {
      justifyContent: "around",
      display: "flex",
      flexDirection: "row",
      padding: 20,
    },
    item: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingBottom: 53,
    },
    menuItems: {
      marginTop: 70,
      marginBottom: 365,
      paddingHorizontal: 19
    }
  });
  