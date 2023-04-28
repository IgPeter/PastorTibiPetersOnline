import { StyleSheet, TouchableOpacity, Text, View, ScrollView, Image} from "react-native";
  import React from "react";
  import { BackButton } from "../../components/Backbutton";
  import {useFonts} from 'expo-font';
  
  export const Settingspage = () => {

    const [font] = useFonts({
      WorkSans: require("../../assets/fonts/WorkSans-VariableFont_wght.ttf")
    })

    if(!font){
      return null
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={() => console.log("Button pressed")} />
          <Text style={{fontSize: 20, fontFamily: 'WorkSans', fontWeight: "bold", left: 10, alignSelf: "center" }}>
            Settings
          </Text>
        </View>
        <View style={styles.menuItems}>
            <TouchableOpacity style={styles.item}>
                <Image source={require('../../assets/icons/profile2.png')} style={styles.icons}/>
                <Text style={styles.setText}>Account</Text>
                <Image style={[{marginLeft: 137}, styles.forwardarrow]} 
                source={require('../../assets/icons/forwardarrow.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Image source={require('../../assets/icons/notification.png')} style={styles.icons}/>
                <Text style={styles.setText}>Notifications</Text>
                <Image style={[{marginLeft: 110}, styles.forwardarrow]} 
                source={require('../../assets/icons/forwardarrow.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Image source={require('../../assets/icons/appearance.png')} style={styles.icons}/>
                <Text style={styles.setText}>Appearance</Text>
                <Image style={[{marginLeft: 112}, styles.forwardarrow]} 
                source={require('../../assets/icons/forwardarrow.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Image source={require('../../assets/icons/privacy.png')} style={styles.icons}/>
                <Text style={styles.setText}>Privacy & Security</Text>
                <Image style={[{marginLeft: 75}, styles.forwardarrow]} 
                source={require('../../assets/icons/forwardarrow.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Image source={require('../../assets/icons/help.png')} style={styles.icons}/>
                <Text style={styles.setText}>Help & FAQ</Text>
                <Image style={[{marginLeft: 120}, styles.forwardarrow]} 
                source={require('../../assets/icons/forwardarrow.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Image source={require('../../assets/icons/info.png')} style={styles.icons}/>
                <Text style={styles.setText}>About</Text>
                <Image style={[{marginLeft: 148}, styles.forwardarrow]} 
                source={require('../../assets/icons/forwardarrow.png')} />
            </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f2f2f2',
      flex: 1,
      width: "100%",
      height: "100%",
      marginTop: 60,
    },
    header: {
      //justifyContent: "center",
      display: "flex",
      flexDirection: "row",
      padding: 20,
    },
    item: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingBottom: 50,
    },
    menuItems: {
      marginTop: 30,
      marginBottom: 30,
      paddingHorizontal: 30
    },
    forwardarrow: {
      resizeMode: 'contain',
      width: 20,
      height: 15
    },

    setText: {
      marginLeft: 23,
      fontFamily: 'WorkSans',
      fontSize: 14,
      fontWeight: 'bold'
    },
    icons: {
      resizeMode: 'contain',
      width: 14,
      heigt: 10
    }
  });
  