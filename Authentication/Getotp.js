import { StyleSheet, TouchableHighlight, Text, TextInput, View, ScrollView, Image } from 'react-native'
import React from 'react'

export const Getotp = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleBold}>Forgot Password</Text>
        <Text>Enter your email below to reset your password</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.inputField} placeholder="Email" keyboardType='email' />
        <Text style={styles.inputText}>Email/Username is wrong</Text>
      </View>
      <View>
        <TouchableHighlight>
          <View style={styles.btn}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Sign Up</Text>
          </View>
        </TouchableHighlight>
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
  titleBold: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  inputView: {
    marginVertical: 40,
    marginBottom: 477
  },
  inputField: {
    height: 54,
    backgroundColor: '#F5F5F5',
    marginVertical: 15,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E3E3E3'
  },
  inputText: {
    fontSize: 10,
    marginTop: -10,
    marginLeft: 2,
    color: '#C90101'
  },
  btn: {
    color: '#fff',
    backgroundColor: '#000',
    alignItems: 'center',
    borderRadius: 8,
    padding: 15,
    height: 54,
    marginBottom: 83,
  },
})