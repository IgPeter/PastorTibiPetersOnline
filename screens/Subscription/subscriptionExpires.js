import { useState, useEffect, useContext } from 'react';
import {SafeAreaView, View, Text, Dimensions, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import baseUrl from '../../assets/common/baseUrl';
import { WebView } from 'react-native-webview';
import axios from "axios";
import {useFonts} from 'expo-font';
import { cacheUsers } from "../../shared/UserAsyncStorage";
import { getCachedUsers } from "../../shared/UserAsyncStorage";
import AuthGlobal from '../../context/store/AuthGlobal';

var {width , height} = Dimensions.get('window');

const SubscriptionExpires = (props) => {
    const [checkBoxes, setCheckBoxes] = useState({checkBox1: false, checkBox2: false, checkBox3: false})
    const [subscription, setSubscription]  = useState({});
    const [prog, setProg] = useState(false);
    const [progClr, setProgClr] = useState('#000');
    const [user, setUser] = useState({});
    const [showGateway, setShowGateway] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});
    const context = useContext(AuthGlobal);


    useEffect(() => {
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
      axios.patch(`${baseUrl}user/subscribe/${context.stateUser.user.userId}`, {subscription}).then(res=> {
        setUpdatedUser(res.data.updatedUser);
        alert('You have subscribed successfully');
        props.navigation.navigate('main', {subscribedUser: updatedUser});
      }).catch(error => console.log(error))
    } else {
      alert('Payment Failed');
    }
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

    return (
        <SafeAreaView style = {styles.container}>
            <View style = {{padding: 20}}>
                <Text style={{fontFamily: 'WorkSans', 
                fontWeight: 'bold', fontSize: 25, color: '#f2f2f2', padding: 10}}>Your Subscription Has Expired!</Text>
                <Text style={{fontFamily: 'WorkSans', 
                fontWeight: '500', fontSize: 13, color: '#f2f2f2'}}>
                    The subscription plan gives you 100% access to resources, 
                    publications, and messages for a designated period of time.
                </Text>
            </View>
            <TouchableOpacity style={[styles.compGroup, {marginTop: 30}]} 
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
        {/* This is where the payment button will be shown */}
        <View style = {{width: '100%', marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
            {user && user.country === 'Nigeria'&& ( 
            <TouchableOpacity style = {{justifyContent: 'center', alignItems: 'center', width: '50%', height: 25}} onPress={() => 
            props.navigation.navigate('Paystack Payment', {item: subscription, user: user })}>
                <Text style = {{fontSize: 13, color: '#f2f2f2', fontWeight: '600'}}>Pay with PayStack</Text>
                <Image source={require('../../assets/images/paystack.png')} 
                      style = {{resizeMode:"contain", width:200, height:25}}/>
            </TouchableOpacity>)}
            {user && user.country !== 'Nigeria' && (
                <TouchableOpacity style = {{justifyContent: 'center', alignItems: 'center', width: '50%', height: 25}}
                onPress={() => setShowGateway(true)}>
                <Text style = {{fontSize: 13, color: '#f2f2f2', fontWeight: '600'}}>Pay with PayPal</Text>
                <Image source={require('../../assets/images/paypal.png')} 
                  style = {{resizeMode:"contain", width:200, height:25}}/>
            </TouchableOpacity>)
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
        </Modal>): null}
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "brown",
        flex: 1,
        width: width,
        alignItems: 'center',
        height: height,
        marginTop: 80,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'black'
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
        fontWeight: '600'
      },
      star: {
        marginLeft: 50
      },
});

export default SubscriptionExpires;