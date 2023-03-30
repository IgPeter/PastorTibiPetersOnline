import { StyleSheet, TouchableHighlight, Text, TextInput, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { A } from '@expo/html-elements'
import CheckBox from '@react-native-community/checkbox'

export const Login = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.login}>Log in</Text>
        <Text>We are glad to have you back.</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.inputField} placeholder="Email" keyboardType='email-address' />
        <Text style={styles.inputText}>Email/Username is wrong</Text>
        <TextInput style={styles.inputField} placeholder="Password" />
        <Text style={styles.inputText}>Password is wrong</Text>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 33, marginBottom: 27 }}>
          {/* <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          /> */}
          <Text>Remember me</Text>
          <Text style={{ marginLeft: 20 }}>Forgot Password?</Text>
        </View>
      </View>
      <View style={{ marginTop: 27 }}>
        <Text style={{ backgroundColor: '#E3E3E3', height: 1 }}></Text>
        <Text style={{ textAlign: 'center', marginBottom: 21, backgroundColor: 'white', position: 'absolute', left: '35%', top: -6 }}>Or login using</Text>
      </View>
      <View style={styles.loginAlt}>
        <A>
          <Image source={require
            ('../assets/google.png')} />
        </A>
        <A>
          <Image source={require
            ('../assets/facebook.png')} />
        </A>
      </View>
      <View>
        <TouchableHighlight>
          <View style={styles.btn}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Log in</Text>
          </View>
        </TouchableHighlight>
        <Text style={{ textAlign: 'center', marginBottom: 52 }}>
          <Text>Don't have an Account? </Text>
          <A style={{ fontWeight: 'bold' }}>Sign Up</A>
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
    padding: 15,
  },
  title: {
    marginTop: 100,
  },
  login: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  inputView: {
    marginVertical: 40
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
    marginBottom: 211,
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
  },
})