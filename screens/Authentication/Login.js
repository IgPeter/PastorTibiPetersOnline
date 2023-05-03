import { StyleSheet, TouchableHighlight, Text, TextInput, View, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { A } from '@expo/html-elements'
import { Button } from '../../components/Button'
// import CheckBox from '@react-native-community/checkbox'
import Error from '../../shared/Error'
import axios from 'axios';
import baseUrl from '../../assets/common/baseUrl'

export const Login = (props) => {
  // const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

    const handleSubmit = () => {
        if(email === '' || password === ''){
          setError("Please fill in your credentials")
      }else {
        let user = {
          email: email,
          password: password
        }
        axios.post(`${baseUrl}user/login`, user).then((res)=> {
          if(res.status = 200){
              setTimeout(() => {
                props.navigation.navigate('User Profile');
                console.log('success!');
            }, 500)
          }
        }).catch((error)=> {
          console.log(`Login Failed ${error}`)
        })
      }
    }
    
  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.login}>Log in</Text>
        <Text>We are glad to have you back.</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.inputField} 
        placeholder="Email" keyboardType='email-address' onChangeText={(text)=> setEmail(text)}/>
        <Text style={styles.inputText}>Email/Username is wrong</Text>
        <TextInput style={styles.inputField} keyboardType='default' 
        placeholder="Password" onChangeText={(text)=> setPassword(text)}/>
        {error ? <Error message={error} /> : null}
        <Text style={styles.inputText}>Password is wrong</Text>
        <View style={{ display: 'flex', flexDirection: 'row', 
        justifyContent: 'space-between', marginTop: 33, marginBottom: 5 }}>
          {/* <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          /> */}
          <Text>Remember me</Text>
          <Text style={{ marginLeft: 20 }}>Forgot Password?</Text>
        </View>
      </View>
      <View>
        <Text style={{ backgroundColor: '#E3E3E3', height: 1 }}></Text>
        <Text style={{ textAlign: 'center'}}>Or login using</Text>
      </View>
      <View style={styles.loginAlt}>
        <A style={{paddingBottom:20}}>
          <Image source={require
            ('../../assets/icons/google.png')} />
        </A>
        <A style={{paddingBottom:20}}>
          <Image source={require
            ('../../assets/icons/facebook.png')} />
        </A>
      </View>
      <View>
        <Button title="Log In" btnstyle={{ backgroundColor: "#141414", 
        borderRadius: 8, height: 54, justifyContent: "center", padding: 10, marginBottom: 15, }} 
        txtstyle={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600", textAlign: "center" }} 
        onPress={()=>handleSubmit()} />
        <Text style={{ textAlign: 'center', marginBottom: 52 }}>
          <Text>Don't have an Account? </Text>
          <A style={{ fontWeight: 'bold' }}
          onPress={()=> props.navigation.navigate('Register')}>Sign Up</A>
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 20,
    width: '100%',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 10
  },
  title: {
    marginTop: 100,
  },
  login: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  inputView: {
    marginVertical: 20
  },
  inputField: {
    height: 54,
    backgroundColor: '#F5F5F5',
    marginVertical: 15,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#E3E3E3'
  },
  inputText: {
    fontSize: 10,
    marginTop: -10,
    marginLeft: 2,
    color: '#C90101'
  },
  loginAlt: {
    marginTop: 20,
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 33
  },
  btn: {
    color: '#fff',
    backgroundColor: '#000',
    alignItems: 'center',
    borderRadius: 8,
    padding: 15,
    height: 54,
    marginBottom: 15,
  }
})