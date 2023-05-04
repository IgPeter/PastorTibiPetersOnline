import {
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
} from "react-native";
import React, {useState, useContext, useEffect, useCallback} from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackButton } from "../../components/Backbutton";
import { MenuButton } from "../../components/Menubutton";
import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";
import AuthGlobal from "../../context/store/AuthGlobal";
import { logoutUser } from "../../context/actions/AuthActions";

export const Userprofile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    //console.log(context.stateUser);
    if(context.stateUser.isAuthenticated ===  false || 
      context.stateUser.isAuthenticated === null){
        props.navigation.navigate('Login');
      }

      AsyncStorage.getItem('jwt')
      .then((res) => {
        axios.get(`${baseUrl}user/${context.stateUser.user.userId}`, {
          headers: {Authorization: `Bearer ${res}`}
        }).then((user) => {
          console.log(user)
          setUserProfile(user.data)
        })
      }).catch((error) => console.log(error))

      return ()  => {
        setUserProfile();
      }
  }, [context.stateUser.isAuthenticated])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => console.log("Button pressed")} />
        <Text style={{ fontSize: 26, fontWeight: "bold", left: -36, alignSelf: "center" }}>
          Profile
        </Text>
        <MenuButton onPress={() => console.log("Button pressed")} />
      </View>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={{ fontSize: 26 }}>
            {userProfile ? userProfile.name : ''}
          </Text>
        </View>
        <View>
          <Text style={{ textAlign: "center", fontSize: 12 }}>
            {userProfile ? userProfile.email : ''}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginBottom: 452,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Image
          style={{ marginRight: 12 }}
          source={require("../../assets/icons/onestar.png")}
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            alignSelf: "center",
            justifyContent: "center",
            color: "#235EF5",
          }}
        >
          10 days remaining before renewal
        </Text>
      </View>
      {/*<View style={styles.footer}>
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
        */}
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
    //borderRadius: "100%",
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
