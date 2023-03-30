import { StyleSheet, TouchableHighlight, Text, TextInput, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { A } from '@expo/html-elements';


export const Signup = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.signup}>Create an Account</Text>
        <Text>Let's help you get started!</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.inputField} placeholder="Name" keyboardType='text' />
        <Text style={styles.inputText}>Email/Username is wrong</Text>
        <TextInput style={styles.inputField} placeholder="Email" keyboardType='email-address' />
        <Text style={styles.inputText}>Password is wrong</Text>
        <TextInput style={styles.inputField} placeholder="Phone number" keyboardType='numeric' />
        <Text style={styles.inputText}>Email/Username is wrong</Text>
        <TextInput style={styles.inputField} placeholder="Password" keyboardType='text' />
        <Text style={styles.inputText}>Email/Username is wrong</Text>
        <TextInput style={styles.inputField} placeholder="Confirm Password" keyboardType='text' />
        <Text style={styles.inputText}>Password is wrong</Text>
      </View>
      <View>
        <TouchableHighlight>
          <View style={styles.btn}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Sign Up</Text>
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
    marginTop: 109,
  },
  signup: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  inputView: {
    marginVertical: 40,
    marginBottom: 121
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
    marginBottom: 111
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