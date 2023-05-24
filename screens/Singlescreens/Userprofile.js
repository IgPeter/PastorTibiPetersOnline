import {
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";
import React, {useState, useContext, useEffect} from "react";
import { Button } from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackButton } from "../../components/Backbutton";
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
          setUserProfile(user.data)
        })
      }).catch((error) => console.log(error))
  }, [context.stateUser.isAuthenticated])

  return (
    <View style={styles.container}>
          <View style={styles.header}>
        <BackButton onPress={() => props.navigation.goBack()} />
        <Text style={{ fontSize: 26, fontWeight: "bold", left: -36, alignSelf: "center" }}>
          Profile
        </Text>
      </View>
      <View style={styles.profile}>
        <View style={styles.avatar}>
          <Text style={{ fontSize: 26 }}>
            {userProfile ? userProfile.name : ''}
          </Text>
          <View>
            {userProfile ? (
              <Image source={{uri: userProfile.avatar}}/>
            ): null}
          </View>
        </View>
        <View>
          <Text style={{ textAlign: "center", fontSize: 12 }}>
            {userProfile ? userProfile.email : ''}
          </Text>
        </View>
      </View>
      <View>
        {userProfile && userProfile.subscription.plan === "Basic" && (
        <View style={{ marginBottom: 30, flexDirection: "row", justifyContent: "center", alignItems: 'center'}}>
          <Image
          style={{ marginRight: 12 }}
          source={require("../../assets/icons/Vectorstarbroze.png")}
          />
          <Text
          style={{ textAlign: "center", fontSize: 12, alignSelf: "center", 
          justifyContent: "center", color: "#235EF5"}}
        >
          90 days remaining before renewal
        </Text>
        </View>
        )}
        {userProfile && userProfile.subscription.plan === "Standard" && (
          <View>
          <Image
          style={{ marginRight: 12 }}
          source={require("../../assets/icons/VectorStarSilver.png")}
          />
          <Text
          style={{ textAlign: "center", fontSize: 12, alignSelf: "center", 
          justifyContent: "center", color: "#235EF5"}}
        >
         180 days before renewal
        </Text>
        </View>
        )}
        { userProfile && userProfile.subscription.plan === "Premuim" && (
          <View>
          <Image
          style={{ marginRight: 12 }}
          source={require("../../assets/icons/Vectorstargold.png")}
          />
          <Text
          style={{ textAlign: "center", fontSize: 12, alignSelf: "center", 
          justifyContent: "center", color: "#235EF5"}}
        >
         365 days before renewal
        </Text>
        </View>
        )} 
        {userProfile && userProfile.subscription.plan === "Free Trial" && (
         <View>
            You have only 7 days left on your free trial
         </View>
        )}
      </View>
      {/*<View style={styles.footer}>
        <View>
          <TouchableHighlight>
            <View style={styles.btn}>
              <Image source={require("../assets/home.png")} height="19px" />
            </View>
          </TouchableHighlight>l,
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
        <View>
          <Button title ='Log Out' btnstyle={{ backgroundColor: "#141414", 
        borderRadius: 8, height: 54, justifyContent: "center", padding: 10, marginBottom: 15, }} 
        txtstyle={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600", textAlign: "center" }} 
        onPress={()=> {
          AsyncStorage.removeItem('jwt'), logoutUser(context.dispatch)
        }}/>
        </View>
      </View>
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
