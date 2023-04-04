import {
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import user from "./user.json";

export const Userprofile = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight>
          <View style={styles.btn}>
            <Image source={require("../assets/backarrow.png")} />
          </View>
        </TouchableHighlight>
        <Text style={{ fontSize: 26, fontWeight: "bold", left: -36 }}>
          Profile
        </Text>
        <TouchableHighlight>
          <View style={styles.btn}>
            <Image source={require("../assets/menu.png")} />
          </View>
        </TouchableHighlight>
      </View>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={{ fontSize: 26 }}>
            {user[2].name.firstName[0]}
            {user[2].name.lastName[0]}
          </Text>
        </View>
        <View>
          <Text style={{ textAlign: "center", fontSize: 24 }}>
            {user[2].name.firstName} {user[2].name.lastName}
          </Text>
          <Text style={{ textAlign: "center", fontSize: 12 }}>
            {user[2].email}
          </Text>
        </View>
      </View>
      <View style={{ marginBottom: 452, display: "flex", flexDirection: "row", justifyContent: "center"}}>
          <Image
            style={{marginRight: 12}}
            source={require("../assets/onestar.png")} />
        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            alignSelf: "center",
            justifyContent: "center",
            color: "#235EF5"
          }}
        >
          10 days remaining before renewal
        </Text>
      </View>
      <View style={styles.footer}>
        <View>
          <TouchableHighlight>
            <View style={styles.btn}>
              <Image source={require("../assets/home.png")} height="19px" />
            </View>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight>
            <View style={styles.btn}>
              <Image source={require("../assets/openlink.png")} />
            </View>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight>
            <View style={styles.btn}>
              <Image source={require("../assets/bookmark.png")} />
            </View>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight>
            <View style={styles.btn}>
              <Image source={require("../assets/profile.png")} />
            </View>
          </TouchableHighlight>
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
  header: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    padding: 20,
  },
  profile: {
    alignSelf: "center",
    marginTop: 43,
    marginBottom: 8,
  },
  avatar: {
    marginHorizontal: "100%",
    backgroundColor: "#D9D9D9",
    height: 120,
    width: 120,
    borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  footer: {
    height: 115,
    width: "100%",
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    alignItems: "center",
  },
});
