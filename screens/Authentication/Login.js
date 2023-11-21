import { StyleSheet, Text, TextInput, View, ScrollView, Image, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { A } from '@expo/html-elements'
import { Button } from '../../components/Button'
import Error from '../../shared/Error'
import AuthGlobal from '../../context/store/AuthGlobal'
import { loginUser } from '../../context/actions/AuthActions'
import { setLoading } from '../../context/actions/AuthActions'

export const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
      if(context.stateUser.isAuthenticated == true && context.stateUser.user.isSubscriber == true ){
        props.navigation.navigate('main', {item: context.stateUser});
      }else if (context.stateUser.isAuthenticated == true && context.stateUser.user.isSubscriber == false && 
        context.stateUser.userProfile.user.subscription.subscriberStatus === 'New User'){
        props.navigation.navigate('Subscription', {item: context.stateUser})
      }else if (context.stateUser.isAuthenticated == true && 
        context.stateUser.userProfile.user.subscription.subscriberStatus === 'unsubscribed'){
        props.navigation.navigate('Subscription Expired')
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
          context.dispatch(setLoading(true));
          loginUser(user, context.dispatch);
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
        placeholder="Email" keyboardType='email-address' onChangeText={(text)=> setEmail(text.trim())} />
        <TextInput style={styles.inputField} keyboardType='default'
          placeholder="Password" secureTextEntry={true} onChangeText={(text)=> setPassword(text.trim())}/>
        {error ? <Error message={error} /> : null}
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
        {context.stateUser.loading == true ? (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator color="gold"/>
          </View>
        ): null}
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