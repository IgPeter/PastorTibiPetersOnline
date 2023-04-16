import { StyleSheet, TouchableHighlight, Text, TextInput, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { Button } from '../../components/Button'

export const Createpassword = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleBold}>Forgot Password</Text>
        <Text>Enter your email below to reset your password</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.inputField} placeholder="New Password" />
        <Text style={styles.inputText}>Email/Username is wrong</Text>
        <TextInput style={styles.inputField} placeholder="Confirm New Password" />
        <Text style={styles.inputText}>Email/Username is wrong</Text>
      </View>
      <Button title="ENTER" btnstyle={{ backgroundColor: "#141414", borderRadius: 8, height: 54, justifyContent: "center", padding: 10, marginBottom: 83,
 }} txtstyle={{ color: "#FFFFFF", fontSize: 14, fontWeight: "bold", textAlign: "center" }} />
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
    // backgroundColor: 'grey',
  },
  title: {
    marginTop: 100,
  },
  titleBold: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  inputView: {
    marginVertical: 40,
    marginBottom: 388
  },
  inputField: {
    height: 54,
    backgroundColor: '#F5F5F5',
    marginVertical: 15,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
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