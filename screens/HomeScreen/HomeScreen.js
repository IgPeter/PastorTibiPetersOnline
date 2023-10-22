import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Modal, TouchableOpacity, ScrollView, 
    Dimensions, Text, SafeAreaView, Image } from 'react-native';
import { getCachedUsers, cacheUsers } from '../../shared/UserAsyncStorage';
import Banner from './banner.js';
import { Button } from '../../components/Button';
import {useFonts} from 'expo-font';
import axios from 'axios';
import baseUrl from '../../assets/common/baseUrl';
import AuthGlobal from '../../context/store/AuthGlobal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { logoutUser } from '../../context/actions/AuthActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import { setCurrentUser } from '../../context/actions/AuthActions';
import MessageList from '../messages/messageList';

var {width, height} = Dimensions.get('window');

const HomeScreen = (props) => {
    const [singleUser, setSingleUser] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [recMessages, setRecMessages] = useState({});
    const [unsubscribedUser, setUnsubscribedUser] = useState({});
    const [numOfDaysLeft, setNumOfDaysLeft] = useState(7);
    const context = useContext(AuthGlobal);
    
    useEffect(() => {
        axios.get(`${baseUrl}user/${context.stateUser.user.userId}`).then(res => {
            if(res.status == 304){
                const cachedUserData = getCachedUsers();
                setSingleUser(cachedUserData);
            }
            setSingleUser(res.data);
            cacheUsers(res.data);
        }).catch(error => {
            return error;
        })

        const setCachedMessages = async (messages) => {
            try{
                await AsyncStorage.setItem('messages', JSON.stringify(messages));
            }catch(error){
                console.log(error);
            }
        }

        const getCachedMessages = async () => {
            try{
                const messages = await AsyncStorage.getItem('messages');
                if(messages != null){
                const parsedMessages = JSON.parse(messages);

                return {messages: parsedMessages}
                }

            }catch(error){
                console.log(error);
            }
        }

        const fetchRecommendedData = async () => {
            try{
               await axios.get(`${baseUrl}message`).then(res => {
                    if (res.status == 304){
                        const messages = getCachedMessages();
                        setRecMessages(messages);
                    }else {
                        const sortedMessages = res.data.message.sort((a,b)=> new Date(b.dateCreated) - new Date(a.dateCreated));
                        const latestMessages = sortedMessages.slice(0,3);
                        setRecMessages(latestMessages);
                        setCachedMessages(latestMessages);
                    }
            }).catch(error => {return error});
            }catch(error){
                console.log(error);
            }
        }

        fetchRecommendedData();

        return () => {
            setSingleUser({});
        }
    },[]) 

     useEffect(() => {
        const checkForSubscriptionExpiration = () => {
            const userID = singleUser.id;
            const currentDate = new Date();
            if(singleUser &&  singleUser.subscription && singleUser.subscription.dateSubscribed){
                const dateSubscribed = new Date(singleUser.subscription.dateSubscribed);
                let dateSubscriptionExpired;
                if (singleUser.subscription.plan == "Free Trial"){
                    const milliSecInADay = 1000 * 60 * 60 * 24;
                    const timeDifference = currentDate - dateSubscribed;
                    const daysLeft = numOfDaysLeft - Math.floor(timeDifference/milliSecInADay)
                    if(daysLeft > 0){
                        setNumOfDaysLeft(daysLeft);
                    }else {
                        axios.patch(`${baseUrl}user/unsubscribe/${userID}`).then(res => {
                            setUnsubscribedUser(res.data.unsubscribedUser);
                            const decoded = jwt_decode(res.data.token);
                            context.dispatch(setCurrentUser(decoded, res.data.unsubscribedUser));
                            props.navigation.navigate('Subscription Expired')
                        }).catch(error=> console.log(error)) 
                }           
            }else if (singleUser.subscription.plan == "Basic"){
                dateSubscriptionExpired = dateSubscribed.setDate(dateSubscribed.getDate() + 90);
            }else if (singleUser.subscription.plan == "Standard"){
                dateSubscriptionExpired = dateSubscribed.setDate(dateSubscribed.getDate() + 180);
            }else{
                dateSubscriptionExpired = dateSubscribed.setDate(dateSubscribed.getDate() + 365);
            }
    
            if (currentDate > dateSubscriptionExpired){
                axios.patch(`${baseUrl}user/unsubscribe/${userID}`).then(res => {
                    setUnsubscribedUser(res.data.unsubscribedUser);
                    const decoded = jwt_decode(res.data.token);
                    context.dispatch(setCurrentUser(decoded, unsubscribedUser));
                    props.navigation.navigate('Subscription Expired')
                }).catch(error=> console.log(error))
            }

        }
    }

     const interval = setInterval(checkForSubscriptionExpiration, 1000 * 60 * 60 * 24);

     return () => clearInterval(interval);

     }, [singleUser && singleUser.isSubscriber == true && singleUser.subscription.dateSubscribed])

    const [font] = useFonts({
        WorkSans: require("../../assets/fonts/WorkSans-VariableFont_wght.ttf"),
      });
    
      if (!font) {
        return null;
      }

    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
            <View style={styles.container}>
                {modalVisible == true ? (
                    <Modal animationType='fade' transparent={true} visible={modalVisible} 
                    onRequestClose={()=>setModalVisible(false)}>
                    <View style={styles.HomeModal}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Button title="Log Out"
                            btnstyle={{borderRadius: 5, height: 40, justifyContent: 'center', padding: 10,  backgroundColor: "#141414"}}
                            txtstyle={{fontFamily: 'WorkSans', fontWeight: 'normal', color: '#f2f2f2', fontSize: 13}}
                            onPress={() => {
                                 setModalVisible(false);
                                 AsyncStorage.removeItem('jwt');
                                logoutUser(context.dispatch);
                                props.navigation.navigate('Login');
                            }}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
                            <Icon name="close" size={17}/>
                        </TouchableOpacity>
                        </View>
                    </Modal>
                ): null}
            <View style={styles.nameView}>
                <View>
                    { singleUser && singleUser.name && (
                    <Text style={styles.textHeader}>Hello {singleUser.name.split(' ')[0]}</Text>)}
                </View>
                <TouchableOpacity style={styles.userExpIcons} onPress={() => setModalVisible(true)}>
                    {/*<Image source={require('../../assets/icons/VectorNotification.png')} 
                    style={{resizeMode: 'contain', width: 20, height: 20, marginRight: 10}}/>*/}
                    <Image source={require('../../assets/icons/name-circle.png')} 
                    style={{resizeMode: 'contain', width: 50, height: 45}} />
                </TouchableOpacity>
                <View style={{position: 'absolute', top: 10, right: 35}}>
                {singleUser && singleUser.name && (
                <Text style={styles.textHeader}>
                    {singleUser.name.split(' ').map((initials)=> initials.charAt(0)).join('')}
                </Text>)}
                </View>
            </View>
            {singleUser &&  singleUser.isSubscriber == true && singleUser.subscription.plan === "Free Trial" && (
                <View style={styles.subscriberStatus}>
                <Text style={styles.textBody}>
                    You have {numOfDaysLeft} days left on your free trial, for more messages 
                    kindly
                </Text>
                <Button title = "Subscribe"
                btnstyle={styles.btn}
                txtstyle={styles.subscribeNow}
                 onPress={() => {
                    props.navigation.navigate('Subscription')
                 }}/>
            </View>
            )}
            { singleUser && singleUser.isSubscriber === true && singleUser.subscription.plan !== "Free Trial" && (
            <View style={{width: '100%', padding: 20, height: height/4, justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'WorkSans', fontSize:  25, fontWeight: 'bold', marginLeft: 20}} >Welcome!</Text>
                    <Text style={{fontFamily: 'WorkSans', fontSize:  16, 
                    fontWeight: 'normal', marginTop: 0, marginLeft: 20}}>This is Pastor Tibi Peters Online Library</Text>
            </View>)}
            {
                singleUser && singleUser.isSubscriber === false && (
                    <View style = {styles.subscriberStatus}>
                        <Text style={styles.textBody}>You don't have any subscription, Kindly </Text>
                        <Button title = "Subscribe"
                            btnstyle={styles.btn}
                            txtstyle={styles.subscribeNow}
                            onPress={() => {
                                props.navigation.navigate('Subscription Expired')
                        }}/>
                    </View>
                )
            }
            <ScrollView style={{width: width-20}}>
            <View style={styles.theSlider}>
                <Banner />
            </View>
            <View style={styles.specialMessageList}>
                <View style={[styles.center, {width: '100%', padding: 20, margin: 10}]}>
                    <Text style={{fontFamily: 'WorkSans', fontSize: 20, fontWeight: 'bold'}}>Latest Messages</Text>
                    <Text style={{fontFamily: 'WorkSans', fontSize: 12, fontWeight: 'normal'}}>Explore the latest messages on PastorTibiPetersOnline</Text>
                </View>
                <ScrollView>
                    {recMessages.length > 0 ? (
                        <View style = {styles.messageListContainer}>
                            { recMessages.map((item) => {
                                    return (
                                        <MessageList key={item._id} item={item} 
                                        navigation = {props.navigation}/>
                                    )
                            })}
                        </View>
                    ): (
                        <View style = {[styles.center, {height: '40%', flex: 1, padding: 30}]}>
                             <Text>No Recommended messages for you yet, you will get some options soon</Text>
                         </View>
                    )
                  }
                </ScrollView>
            </View>
            { singleUser && (<View style={{marginTop: 10, paddingBottom: 20, alignItems: 'center', justifyContent: 'center'}}>
                <Button title="Load more" btnstyle={{borderRadius: 5, height: 40, justifyContent: 'center', 
                paddingTop: 10, paddingRight: 20, paddingLeft: 20, paddingBottom: 10, backgroundColor: '#141414'}} txtstyle={{fontFamily: 'WorkSans', fontSize: 16, 
                fontWeight: 800, color: '#ffffff'}}
                 onPress={() => singleUser.isSubscriber == true ? 
                    props.navigation.navigate('Explore', {item: singleUser}):
                    props.navigation.navigate('Subscription Expired')
                }/>  
            </View>)} 
            <View style={styles.abtSone}>
                <View style={{width: '30%', marginRight: 5}}>
                    <Image source={require('../../assets/images/PstTibiPeters.png')} 
                    style={{resizeMode: 'contain', width: 100, height: 80}}/>
                </View>
                <View style={{width: '70%', marginLeft: 5}}>
                    <Text style={styles.textHeader}>Pastor Tibi Peters</Text>
                    <Text style={styles.textBody}>Pastor Tibi Peters is the Pioneer & President of Renaissance Assembly Inc. 
                        With a dynamic teaching, preaching and miracle ministry spanning across Africa, 
                        Europe and North America
                    </Text>
                </View>
            </View>
            </ScrollView>
            </View>        
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: width - 20,
        marginTop: 40,
        paddingLeft: 30,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width - 20
    },

    userExpIcons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 20
    },
    theSlider:{
        width: '100%',
        paddingRight: 20,
        marginTop: 20
    },
  specialMessageList: {
    width: '100%',
    marginBottom: 20
    },
    
    abtSone: {
        width: '100%',
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 120,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textBody: {
        fontFamily: 'WorkSans',
        fontSize: 13,
        fontWeight: '600',
        color: '#141414'
    },
    textHeader: {
        fontFamily: 'WorkSans',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#141414'
    },
    btn: {
        marginTop: 20,
        marginLeft: -90
    },
    subscribeNow: {
        fontFamily: 'WorkSans',
        fontSize: 14,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#E5B80B'
    },
    subscriberStatus: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10
    },
    HomeModal: {
        width: '40%',
        paddingHorizontal: 30,
        paddingVertical: 20,
        position: 'absolute',
        top: 70,
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        backgroundColor: 'gainsboro'
        },
    closeIcon: {
        position: 'absolute',
        top: 3,
        right: 5
    },
    messageListContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    }
});

export default HomeScreen;