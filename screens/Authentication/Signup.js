import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { A } from '@expo/html-elements';
import { Button } from '../../components/Button';
import Error from '../../shared/Error';
import axios from 'axios';
import baseUrl from '../../assets/common/baseUrl';
import * as DocumentPicker from 'expo-document-picker';
import { Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';

var {width} = Dimensions.get('window');

export const Signup = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [file, setFile] = useState();


  const register = () => {
    
    if(firstName === '' || lastName === '' || email === '' || phone === '' || country === ''
    || password === ''){
      setError('Fill in the form completely');
    }

    let user =  new FormData()
    user.append("firstName", firstName)
    user.append("lastName", lastName)
    user.append("email", email)
    user.append("password", password)
    user.append("isAdmin", false)
    user.append("phone", phone)
    user.append("country", country)
    user.append("avatar", {
      name: file.name,
      type: file.mimeType,
      uri: file.uri
    }
      )

    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }

    axios.post(`${baseUrl}user/register`, user, config).then((res)=> {
      if (res.status == 200){
        Toast.show({
          topeOffset: 60,
          type: 'success',
          text1: 'Registration Succeeded',
          text2: 'Please login to your account'

        })
        setTimeout(() => {
                props.navigation.navigate('Login');
            }, 300)
      }
    }).catch((error)=> {
      Toast.show({
        topeOffset: 60,
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Please try again'
      })
    })
  }

  const pickDocument = async () => {
   try {
      let result = await DocumentPicker.getDocumentAsync({})
      setFile(result);
   } catch(e){
      console.log(e);
   }
  };

  const comparePassword = (newPassword) => {
    if(newPassword !== password){
      setError('Password does not match');
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.signup}>Create an Account</Text>
        <Text>Let's help you get started!</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.inputField} 
        placeholder="First Name" keyboardType='default' onChangeText={(text) => setFirstName(text.trim())} />
        <TextInput style={styles.inputField} 
        placeholder="Last Name" keyboardType='default' onChangeText={(text) => setLastName(text.trim())} />
        <TextInput style={styles.inputField} 
        placeholder="Email" keyboardType='email-address' 
        onChangeText={(text)=> setEmail(text.trim().toLowerCase())}/>
        <TextInput style={styles.inputField} 
        placeholder="Phone number" keyboardType='numeric' onChangeText={(text)=> setPhone(text.trim())}/>
         <TextInput style={styles.inputField} 
        placeholder="Country" keyboardType='default' onChangeText={(text)=> setCountry(text.trim())}/>
        <View style={styles.filePicker}>
          <TextInput style={styles.inputField} placeholder="Upload a profile picture" editable={false} 
          value={file ? file.name : ''}/>
          <Button title='Browse' btnstyle={{ backgroundColor: "#141414", borderRadius: 8, 
          padding: 10, width: 70, position: 'absolute', right: 10, top: 23 }} 
          txtstyle={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600", textAlign: "center" }} 
          onPress={pickDocument} />
        </View>
        <TextInput style={styles.inputField} 
        placeholder="Password" keyboardType='default' 
        secureTextEntry={true} onChangeText={(text)=> setPassword(text.trim())}/>
        <TextInput style={styles.inputField} secureTextEntry={true}
        placeholder="Confirm Password" keyboardType='default' onChangeText={(text)=>comparePassword(text.trim())}/>
         {error ? <Error message={error} />: null}
      </View>
      <View>
        <Button title="Sign Up"  btnstyle={{ backgroundColor: "#141414", borderRadius: 8, height: 54, 
        justifyContent: "center", padding: 10, marginBottom: 15, }} 
        txtstyle={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600", textAlign: "center" }} 
        onPress={()=> register()}/>
        {error ? <Error message={error} />: null}
        <Text style={{ textAlign: 'center', marginBottom: 52 }}>
          <Text>Already have an Account? </Text>
          <A style={{ fontWeight: '600' }} onPress={()=> props.navigation.navigate('Login')}>Log in</A>
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -20,
    width: '100%',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 70,
  },
  title: {
    marginTop: 109,
  },
  signup: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  inputView: {
    marginVertical: 20,
    marginBottom: 30
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
  }
})