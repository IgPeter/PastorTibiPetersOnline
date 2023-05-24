import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, StatusBar, Modal, TouchableOpacity, ScrollView, 
    Dimensions, Text, SafeAreaView, Image } from 'react-native';
import { getCachedUsers, cacheUsers } from '../../shared/UserAsyncStorage';
import Banner from './banner.js';
import RecommendedMessages from './recommended';
import EasyButton from '../../shared/styledComponents/EasyButton';
import {useFonts} from 'expo-font';
import axios from 'axios';
import baseUrl from '../../assets/common/baseUrl';
import AuthGlobal from '../../context/store/AuthGlobal';
import Icon from 'react-native-vector-icons/FontAwesome'
import { logoutUser } from '../../context/actions/AuthActions';

var {width, height} = Dimensions.get('window');

const HomeScreen = (props) => {
    const [singleUser, setSingleUser] = useState({})
    const [modalVisible, setModalVisible] = useState(false);
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

        return () => {
            setSingleUser({})
        }
    },[])

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
                            <EasyButton dark meduim onPress={() => {
                                 setModalVisible(false);
                                 AsyncStorage.removeItem('jwt');
                                logoutUser(context.dispatch);
                                props.navigation.navigate('Login');
                            }}>
                                <Text style={{fontFamily: 'WorkSans', fontWeight: 500, 
                                color: '#f2f2f2', fontSize: 13}}>Log Out</Text>
                            </EasyButton>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
                            <Icon name="close" size={20}/>
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
                    <Image source={require('../../assets/icons/VectorNotification.png')} 
                    style={{resizeMode: 'contain', width: 20, height: 20, marginRight: 10}}/>
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
            {singleUser.isSubscriber == false || context.stateUser.user.isSubscriber == false ? (
                <View style={styles.subscriberStatus}>
                <Text style={styles.textBody}>
                    You have six days left on your free trial, for more messages 
                    kindly
                </Text>
                <EasyButton
                    large
                 subscribe
                 style={styles.btn}
                 onPress={() => {
                    props.navigation.navigate('Subscription')
                 }}
                >
                    <Text style={styles.subscribeNow}>Subscribe</Text>
                </EasyButton>
            </View>
            ): (
                <View style={{width: '100%', padding: 20, height: height/4, justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'WorkSans', fontSize:  25, fontWeight: 'bold', marginLeft: 20}} >Welcome!</Text>
                    <Text style={{fontFamily: 'WorkSans', fontSize:  16, 
                    fontWeight: 500, marginTop: 0, marginLeft: 20}}>This is Pastor Tibi Peters Online Library</Text>
                </View>
            )} 
            <ScrollView style={{width: width-20}}>
            <View style={styles.theSlider}>
                <Banner />
            </View>
            <View style={styles.specialMessageList}>
                <RecommendedMessages navigation = {props.navigation} />
            </View>
            { singleUser && (<View style={{paddingBottom: 20, alignItems: 'center', justifyContent: 'center'}}>
                <EasyButton
                 loadMore
                 meduim
                 onPress={() => context.stateUser.user.isSubscriber == true ? 
                    props.navigation.navigate('Explore', {item: singleUser}):
                    props.navigation.navigate('Subscription')
                }
                >
                    <Text style={{fontFamily: 'WorkSans', fontSize: 16, 
                    fontWeight: 800, color: '#E5B80B'}}>Load more</Text>                    
                </EasyButton>    
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
    paddingRight: 20,
    width: '100%'
    },
    
    abtSone: {
        width: '100%',
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 90,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textBody: {
        fontFamily: 'WorkSans',
        fontSize: 13,
        fontWeight: 600,
        color: '#141414'
    },
    textHeader: {
        fontFamily: 'WorkSans',
        fontSize: 20,
        fontWeight: 700,
        color: '#141414'
    },
    btn: {
        marginTop: 20,
        marginLeft: -125
    },
    subscribeNow: {
        fontFamily: 'WorkSans',
        fontSize: 12,
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
        padding: 10,
        position: 'absolute',
        top: 70,
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        backgroundColor: 'gainsboro'
        },
    closeIcon: {
        position: 'absolute',
        top: 5,
        right: 10
    }
})

export default HomeScreen;