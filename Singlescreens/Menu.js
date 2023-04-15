import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Togglebutton } from "../components/Togglebutton";

export const Menu = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.menu}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 12 }}>WN</Text>
          </View>
          <View style={{ alignSelf: 'center' }}>
            <Text style={{ textAlign: "center", fontSize: 18 }}>
              Wisdom Nic
            </Text>
            <Text style={{ textAlign: "center", fontSize: 10 }}>
              wisdomnic@gmail.com
            </Text>
          </View>
          <View style={{ alignSelf: 'center' }}>
            <Image source={require("../assets/edit.png")} />
          </View>
        </View>
        <View style={styles.menuItems}>
            <TouchableOpacity style={styles.item}>
                <Image source={require('../assets/notification.png')}/>
                <Text style={{ fontSize: 16, marginLeft: 23}}>Notification</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Image source={require('../assets/saved.png')}/>
                <Text style={{ fontSize: 16, marginLeft: 25}}>Saved Files</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Image source={require('../assets/subscription.png')}/>
                <Text style={{ fontSize: 16, marginLeft: 18}}>Subscription</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Image source={require('../assets/help.png')}/>
                <Text style={{ fontSize: 16, marginLeft: 22}}>Help & FAQ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Image source={require('../assets/settings.png')}/>
                <Text style={{ fontSize: 16, marginLeft: 23}}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Image source={require('../assets/logout.png')}/>
                <Text style={{ fontSize: 16, marginLeft: 23}}>Log Out</Text>
            </TouchableOpacity>
        </View>
        <View>
          <Togglebutton />
        </View>
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
  menu: {
    width: "80%",
    height: "100%",
    // backgroundColor: "grey",
    paddingVertical: 90,
    paddingHorizontal: 35,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 67
  },
  avatar: {
    backgroundColor: "#D9D9D9",
    height: 48,
    width: 48,
    borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 53
  },
  menuItems: {
    marginBottom: 222
  }
});
