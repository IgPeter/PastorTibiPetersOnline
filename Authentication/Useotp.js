import { StyleSheet, TouchableHighlight, Text, TextInput, View, ScrollView } from 'react-native'
import React from 'react'
import { A } from '@expo/html-elements'
import { Button } from '../components/Button'

export const Useotp = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleBold}>Forgot Password</Text>
        <Text>Enter the OTP sent to your email</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.inputField} placeholder="0" keyboardType='number-pad' maxLength='1' />
        <TextInput style={styles.inputField} placeholder="0" keyboardType='number-pad' maxLength='1' />
        <TextInput style={styles.inputField} placeholder="0" keyboardType='number-pad' maxLength='1' />
        <TextInput style={styles.inputField} placeholder="0" keyboardType='number-pad' maxLength='1' />
      </View>
      <View>
        <Button title="Submit"  btnstyle={{ backgroundColor: "#141414", borderRadius: 8, height: 54, justifyContent: "center", padding: 10, marginBottom: 15, }} txtstyle={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600", textAlign: "center" }} />
        <Text style={{ textAlign: 'center', marginBottom: 70 }}>
          <Text>Didn't receive OTP? </Text>
          <A>Resend OTP</A>
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
  titleBold: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  inputView: {
    marginVertical: 40,
    marginBottom: 462,
    flexDirection: 'row'
  },
  inputField: {
    height: 64,
    width: 64,
    fontSize:20,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 5,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    textAlign: 'center'
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