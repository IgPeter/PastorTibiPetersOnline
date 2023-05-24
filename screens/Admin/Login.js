import { StyleSheet, TouchableHighlight, Text, TextInput, View, ScrollView, Image } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { A } from '@expo/html-elements'
import { Button } from '../../components/Button'
// import CheckBox from '@react-native-community/checkbox'
import Error from '../../shared/Error'
import axios from 'axios';
import baseUrl from '../../assets/common/baseUrl'
import AuthGlobal from '../../context/store/AuthGlobal'
import { loginUser } from '../../context/actions/AuthActions'

const AdminLogin = (props) => {
  // const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    if(context.stateUser.isAuthenticated === true){
      props.navigation.navigate('Admin Message');
    }
  }, [context.stateUser.isAuthenticated])

    const handleSubmit = () => {
      const user = {
        email: email,
        password: password
      }

        if(email === '' || password === ''){
          setError("Please fill in your credentials")
      }else {
          loginUser(user, context.dispatch)
      }
    }
    
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.login}>Log in</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.inputField} 
        placeholder="Email" keyboardType='email-address' onChangeText={(text)=> setEmail(text.trim())}/>
        <TextInput style={styles.inputField} keyboardType='default'
        placeholder="Password" onChangeText={(text)=> setPassword(text.trim())}/>
        {error ? <Error message={error} /> : null}
        <View style={{ display: 'flex', flexDirection: 'row', 
        justifyContent: 'space-between', marginTop: 33, marginBottom: 5 }}>
          {/* <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => setToggleCheckBox(newValue)}
          /> */}
          <Text style={{ marginLeft: 20 }}>Forgot Password?</Text>
        </View>
      </View>
      <View>
        <Button title="Log In" btnstyle={{ backgroundColor: "#141414", 
        borderRadius: 8, height: 54, justifyContent: "center", padding: 10, marginBottom: 15, }} 
        txtstyle={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600", textAlign: "center" }} 
        onPress={()=>handleSubmit()} />
        <Text style={{ textAlign: 'center', marginBottom: 52 }}>
          <Text>Don't have an Account? </Text>
          <A style={{ fontWeight: 'bold' }}
          onPress={()=> props.navigation.navigate('Admin Register')}>Sign Up</A>
        </Text>
      </View>
    </View>
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

export  default AdminLogin