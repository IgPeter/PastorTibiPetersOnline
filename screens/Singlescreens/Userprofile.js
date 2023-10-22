import {StyleSheet, Text, View, Image, SafeAreaView} from "react-native";
import React, {useState, useContext, useEffect} from "react";
import { Button } from "../../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BackButton } from "../../components/Backbutton";
import axios from "axios";
import baseUrl from "../../assets/common/baseUrl";
import AuthGlobal from "../../context/store/AuthGlobal";
import { logoutUser } from "../../context/actions/AuthActions";
import {useFonts} from 'expo-font';

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


  const [font] = useFonts({
    WorkSans: require('../../assets/fonts/WorkSans-VariableFont_wght.ttf')
  });

  if(!font){
    return null
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
        <BackButton onPress={() => props.navigation.goBack()} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', left: -30, 
        alignSelf: "center", fontFamily: 'WorkSans' }}>
          {userProfile ? userProfile.name : ''}
        </Text>
      </View>
      <View style={styles.profile}>
          <View style={styles.avatar}>
            {userProfile && (
              <Image source={{uri: userProfile.avatar}} style={{resizeMode: 'cover', borderRadius: 70, width: 180, height: 180}}/>
            )}
          </View>
        <View style={styles.emailSection}>
          <Text style={{ textAlign: "center", fontSize: 15, fontFamily: 'WorkSans', fontWeight: '600' }}>
            {userProfile ? userProfile.email : ''}
          </Text>
        </View>
        <View style={styles.subscriptionSection}>
        {userProfile && userProfile.subscription.plan === "Basic" && (
        <View style={{ marginBottom: 30, flexDirection: "row", justifyContent: "center", alignItems: 'center'}}>
          <Image
          style={{ marginRight: 12 }}
          source={require("../../assets/icons/Vectorstarbroze.png")}
          />
          <Text
          style={{ textAlign: "center", fontWeight: '600', fontSize: 15, alignSelf: "center", 
          justifyContent: "center", color: "#235EF5", fontFamily: 'WorkSans'}}
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
          style={{ textAlign: "center", fontWeight: '600', fontSize: 15, alignSelf: "center", 
          justifyContent: "center", color: "#235EF5", fontFamily: 'WorkSans'}}
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
          style={{ textAlign: "center", fontWeight: '600', fontSize: 15, alignSelf: "center", 
          justifyContent: "center", color: "#235EF5", fontFamily: 'WorkSans'}}
        >
         365 days before renewal
        </Text>
        </View>
        )} 
        {userProfile && userProfile.subscription.plan === "Free Trial" && (
         <View>
            <Text style={{textAlign: "center", fontWeight: '600', fontSize: 15, alignSelf: "center", 
          justifyContent: "center", color: "#235EF5", fontFamily: 'WorkSans'}}>
            You have only 7 days left on your free trial
          </Text>
         </View>
        )}
      </View>
      <View style={styles.btnSection}>
          <Button title = "Log Out" btnstyle={{borderRadius: 5, margin: 5, height: 40, width: '50%', justifyContent: 'center', alignItems: 'center',padding: 10, backgroundColor:'#141414'}}
                txtstyle={{color: '#f2f2f2', fontFamily: 'WorkSans', fontWeight: '600', textAlign: 'center' }} 
          onPress={()=> {
            AsyncStorage.removeItem('jwt'), logoutUser(context.dispatch)
        }}/>
        </View>
    </View>
      </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    marginTop: 20,
  },
  header: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
  },
  profile: {
    width: '100%',
    alignItems: 'center',
    alignSelf: "center",
    marginTop: 43,
    marginBottom: 8,
  },
  avatar: {
    //marginHorizontal: "100%",
    backgroundColor: "#D9D9D9",
    height: 180,
    width: 180,
    borderRadius: 70,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  subscriptionSection: {
    marginTop: 5
  },
  emailSection: {
    marginTop: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight:10
  },
  btnSection: {
    marginVertical: 50,
    width: '80%',
    alignItems: "center",
    justifyContent: "center",
  }
});