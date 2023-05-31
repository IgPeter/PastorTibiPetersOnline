import React, {useState, useEffect, useContext} from "react";
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Modal, 
  ActivityIndicator } from "react-native";
import { CheckBox } from "react-native-elements";
import {useFonts}  from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome'
import EasyButton from "../../shared/styledComponents/EasyButton";
import { WebView } from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';
import baseUrl from '../../assets/common/baseUrl';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import AuthGlobal from '../../context/store/AuthGlobal';
import { cacheUsers } from "../../shared/UserAsyncStorage";
import { getCachedUsers } from "../../shared/UserAsyncStorage";

var {width , height} = Dimensions.get('window');

export const Subscription = (props) => {
  const [checkBoxes, setCheckBoxes] = useState({checkBox1: false, checkBox2: false, checkBox3: false})
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentCheckBoxes, setPaymentCheckBoxes] = useState({checkBox1: false, checkBox2: false})
  const [showGateway, setShowGateway] = useState(false);
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState('#000');
  const [user, setUser] = useState({});
  const [subscription, setSubscription]  = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const context = useContext(AuthGlobal);
  
  useEffect(() => {
    console.log(context.stateUser);

  const fetchData = async () => {

    try{
    //getCachedData
      const singleUser = await getCachedUsers();

      await axios.get(`${baseUrl}user/${context.stateUser.user.userId}`).then(res=>{
        if(res.status == 304){
          setUser(singleUser);         
        }
        setUser(res.data);
        cacheUsers(res.data);
      })
    }catch(error){
      console.log(error)
    }
  }

  fetchData();
  }, [])

  const [font] = useFonts({
    WorkSans: require("../../assets/fonts/WorkSans-VariableFont_wght.ttf")
  })

  if(!font){
    return null;
  }


  //Receive notification here and take some action if payment is successful
  function onMessage(e) {
    let data = e.nativeEvent.data;
    let payment = JSON.parse(data);
    if (payment.status === 'COMPLETED') {
      axios.patch(`${baseUrl}user/subscribe/${user.id}`, {subscription}).then(res=> {
        setUpdatedUser(res.data.updatedUser);
        alert('You have subscribed successfully');
        props.navigation.navigate('main', {subscribedUser: updatedUser});
      }).catch(error => console.log(error))
    } else {
      alert('Payment Failed');
    }
  }

  //Handling Free Trial
  const handleFreeTrial = () => {
    let freeTrial = {
      plan: "Free Trial",
      desc: "7 days plan",
      price: 0
    }

    //updating user data with subscription information
    axios.patch(`${baseUrl}user/freeTrial/${user.id}`, {freeTrial}).then(res=> {
      setUpdatedUser(res.data.updatedUser);
      props.navigation.navigate('Non Subscriber', {subscribedUser: updatedUser});
    }).catch(error => console.log(error))
  }

  //Define the subscription here and  hanlde checkboxes toggle
  const handleCheckBoxPress = (checkBoxName) => {
    if(checkBoxName === 'checkBox1'){
         setSubscription({
          plan: 'Basic',
          desc: 'A 90 days subscription plan',
          price: user.country === 'Nigeria' ? 1000 : 20,
          dateSubscribed: new Date(Date.now()).toISOString()
      })
      
      setCheckBoxes((prevCheckBoxes)=> ({
        ...prevCheckBoxes,
        [checkBoxName]: !prevCheckBoxes[checkBoxName],
        checkBox2: false,
        checkBox3: false
      })) 
    }

    if(checkBoxName === 'checkBox2'){
      setSubscription({
        plan: 'Standard',
        desc: 'A 180 days subscription plan',
        price: user.country === 'Nigeria' ? 2000 : 25,
        dateSubscribed: new Date(Date.now()).toISOString()
      })
      setCheckBoxes((prevCheckBoxes)=> ({
        ...prevCheckBoxes,
        [checkBoxName]: !prevCheckBoxes[checkBoxName],
        checkBox1: false,
        checkBox3: false
      })) 
    }

    if(checkBoxName === 'checkBox3'){
      setSubscription({
        plan: 'Premuim',
        desc: 'A 365 days subscription plan',
        price: user.country === 'Nigeria' ? 3000 : 50,
        dateSubscribed: new Date(Date.now()).toISOString()
      })
      setCheckBoxes((prevCheckBoxes)=> ({
        ...prevCheckBoxes,
        [checkBoxName]: !prevCheckBoxes[checkBoxName],
        checkBox1: false,
        checkBox2: false
      })) 
    }
    }

    const handlePaymentCheckBoxes = (checkBoxName)=> {
      if(checkBoxName === 'checkBox1'){
        setPaymentCheckBoxes((prevCheckBoxes)=>({
          ...prevCheckBoxes,
          [checkBoxName]: !prevCheckBoxes[checkBoxName],
          checkBox2: false
      }))
    }

      if(checkBoxName === 'checkBox2'){
        setPaymentCheckBoxes((prevCheckBoxes)=>({
          ...prevCheckBoxes,
          [checkBoxName]: !prevCheckBoxes[checkBoxName],
          checkBox1: false 
      }))
      }
    }

  return (
    <View style={styles.container}>
      <Modal animationType='fade' transparent={true} visible={modalVisible} 
      onRequestClose={()=>setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalText}>
              <Text style={{}}>Payment</Text>
              <Text style={styles.price}>Select a payment method</Text>
            </View>
            <View style={styles.paymentButton}>
              {user.country === 'Nigeria' ? (
                  <TouchableOpacity style={[styles.payment, {marginBottom: 10}]} 
                    onPress={() => handlePaymentCheckBoxes('checkBox1')}>
                      <Image source={require('../../assets/images/paystack.png')} 
                      resizeMode="contain" width={12} height={6}/>
                      <CheckBox
                    checked={paymentCheckBoxes.checkBox1}
                    size={14}
                    checkedColor={'#141414'}
                    checkedIcon={<Icon name='square' size={14} color='#141414' />}
                    uncheckedIcon={<Icon name='square-o' size={14} />}
                    />
                  </TouchableOpacity>
              ): (
                <TouchableOpacity style={styles.payment} 
                onPress={()=> handlePaymentCheckBoxes('checkBox2')}>
                  <Image source={require('../../assets/images/paypal.png')} 
                  resizeMode="contain" width={15} height={8}/>
                  <CheckBox
                checked={paymentCheckBoxes.checkBox2}
                size={14}
                checkedColor={'#141414'}
                checkedIcon={<Icon name='square' size={14} color='#141414' />}
                uncheckedIcon={<Icon name='square-o' size={14} />}
              />
              </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity onPress={() => {
              setModalVisible(false)
              setPaymentCheckBoxes({checkBox1: false, checkBox2: false, checkBox3: false})
            }
          } 
            style={{position: 'absolute', top: 10, right: 20}}>
              <Icon name="close" size={15} />
            </TouchableOpacity>
            {paymentCheckBoxes.checkBox1 == true || paymentCheckBoxes.checkBox2 == true ? 
            (
              <EasyButton meduim dark 
              onPress={() => paymentCheckBoxes.checkBox1 == true ? 
                props.navigation.navigate('Paystack Payment', {item: subscription, user: user}) : 
                paymentCheckBoxes.checkBox2 == true ? setShowGateway(true) : null
              }>
                <Text style={{fontFamily: 'WorkSans', color: '#f2f2f2', fontSize: 13}}>Pay</Text></EasyButton>
            ): null }
          </View>
        </View>
      </Modal>
        <View style={styles.textGroup}>
            <Text style={{fontFamily: 'WorkSans', 
            fontWeight: 700, fontSize: 16, color: '#141414'}}>Choose a Subscription Plan</Text>
            <Text style={{fontFamily: 'WorkSans', 
            fontWeight: 500, fontSize: 13, color: '#141414'}}>
                The subscription plan gives you 100% access to resources, 
                publications, and messages for a designated period of time.
            </Text>
        </View>
          <TouchableOpacity style={[styles.compGroup, {marginTop: 40}]} 
          onPress={()=>handleCheckBoxPress('checkBox1')}>
            <View>
              <CheckBox
                checked={checkBoxes.checkBox1}
                size={16}
                checkedColor={'#141414'}
                checkedIcon={<Icon name='square' size={15} color='#141414' />}
                uncheckedIcon={<Icon name='square-o' size={15} />}
              />
            </View>
            <View style={styles.texts}>
                <Text style={styles.plan}>Basic Plan</Text>
                <Text style = {styles.price}>&#x20A6;1000|$20</Text>
                <Text style= {styles.desc}>A 90 Days Subscription Plan</Text>
            </View>
            <View style = {styles.star}>
                <Image style={{resizeMode: 'contain', width: 16, height: 16}} 
                source={require('../../assets/icons/VectorStarSilver.png')}/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.compGroup} onPress={()=>handleCheckBoxPress('checkBox2')}>
            <View>
              <CheckBox
                checked={checkBoxes.checkBox2}
                size={16}
                checkedColor={'#141414'}
                checkedIcon={<Icon name='square' size={15} color='#141414' />}
                uncheckedIcon={<Icon name='square-o' size={15} />}
            />
            </View>
            <View style={styles.texts}>
                <Text style={styles.plan}>Standard Plan</Text>
                <Text style = {styles.price}>&#x20A6;2000|$25</Text>
                <Text style= {styles.desc}>A 180 Days Subscription Plan</Text>
            </View>
            <View style = {styles.star}>
                <Image style={{resizeMode: 'contain', width: 16, height: 16}} 
                source={require('../../assets/icons/Vectorstarbroze.png')}/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.compGroup} onPress={()=>handleCheckBoxPress('checkBox3')}>
        <View>
              <CheckBox
                checked={checkBoxes.checkBox3}
                size={16}
                checkedColor={'#141414'}
                checkedIcon={<Icon name='square' size={15} color='#141414' />}
                uncheckedIcon={<Icon name='square-o' size={15} />}
              />
            </View>
            <View style={styles.texts}>
                <Text style={styles.plan}>Premuim Plan</Text>
                <Text style = {styles.price}>&#x20A6;3000|$50</Text>
                <Text style= {styles.desc}>A 365 Days Subscription Plan</Text>
            </View>
            <View style = {styles.star}>
                <Image style={{resizeMode: 'contain', width: 16, height: 16}}
                source={require('../../assets/icons/Vectorstargold.png')}/>
            </View>
        </TouchableOpacity>
        <View style={{marginTop: 20}}>
          {checkBoxes.checkBox1 != true && checkBoxes.checkBox2 != true && checkBoxes.checkBox3 != true ? 
                <EasyButton
                 large
                 dark
                 onPress={()=>handleFreeTrial()}
                ><Text style={styles.btnText}>Free Trial</Text></EasyButton> : 
                <EasyButton
                large
                dark
                onPress={()=>setModalVisible(true)}
                >
                  <Text style= {styles.btnText}>Subscribe</Text>
                </EasyButton>
                }
        </View> 
        {showGateway == true ? (
          <Modal
            visible={showGateway}
            onDismiss={() => setShowGateway(false)}
            onRequestClose={() => setShowGateway(false)}
            animationType={"fade"}
            transparent >
          <View style={styles.webViewCon}>
            <View style={styles.wbHead}>
              <TouchableOpacity
                style={{padding: 13}}
                onPress={() => setShowGateway(false)}>
                <Feather name={'x'} size={24} />
              </TouchableOpacity>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#00457C',
                }}>
                PayPal GateWay
              </Text>
              <View style={{padding: 13, opacity: prog ? 1 : 0}}>
                <ActivityIndicator size={24} color={progClr} />
              </View>
            </View>
            <WebView
              source={{uri: `https://web-dc911.web.app?plan=${subscription.plan}&price=${subscription.price}`}}
              onMessage={onMessage}
              style={{flex: 1}}
              onLoadStart={() => {
                setProg(true);
                setProgClr('#000');
              }}
              onLoadProgress={() => {
                setProg(true);
                setProgClr('#00457C');
              }}
              onLoadEnd={() => {
                setProg(false);
              }}
              onLoad={() => {
                setProg(false);
              }}
            />
          </View>
        </Modal>
        ): null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "brown",
    flex: 1,
    width: width,
    alignItems: 'center',
    height: height,
    marginTop: 120,
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  compGroup: {
    flexDirection: 'row',
    width: width - 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#e5e5e5',
    borderRadius: 5,
    marginTop: 20
  },

  texts: {
    padding: 10,
    marginLeft: 5
  },
  plan: {
    fontFamily: 'WorkSans',
    fontSize: 16,
    color: '#141414',
    fontWeight: 'bold'
  },

  price: {
    fontFamily: 'WorkSans',
    fontSize: 14,
    color: '#141414',
    fontWeight: '600'  
  },
  desc: {
    fontFamily: 'WorkSans',
    fontSize: 12,
    color: '#141414',
    fontWeight: '500'
  },
  star: {
    marginLeft: 50
  },
  finalTxt: {
    fontFamily: 'WorkSans',
    fontSize: 16,
    fontWeight: 600
  },
  btnText:{
    color: '#f2f2f2',
    fontFamily: 'WorkSans',
    fontSize: 14,
    fontWeight: 600
  },
  centeredView: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1
  },
  modalView: {
    width: width-20,
    marginLeft: 10,
    backgroundColor: '#f2f2f2',
    borderRaduis: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowOpacity: 0.25,
    shadowRaduis: 3.84,
    elevation: 5
  },
  paymentButton: {
    marginTop: 10,
    width: width - 20,
    padding: 20
  },
  payment: {
    backgroundColor: '#e5e5e5',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalText: {
    alignItems: 'center',
    jusifyContent: 'center'
  },
  webViewCon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wbHead: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    zIndex: 25,
    elevation: 2,
  }
});