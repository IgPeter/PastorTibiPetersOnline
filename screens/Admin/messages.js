import React, {useState, useCallback} from 'react';
import {View, SafeAreaView, Text, StyleSheet, Image, ActivityIndicator, ScrollView, Dimensions} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from '../../assets/common/baseUrl';
import Header from '../../shared/Header';
import ListItem from './ListItem';
import {Button} from '../../components/Button';
import {useFonts} from 'expo-font';

var {width, height} = Dimensions.get('window');

const ListHeader = () =>{
    return(
        <View elevation={1} style = {styles.listHeader}>
            <View style = {[styles.headerItem, {flex:1}]}></View>
            <View style = {[styles.headerItem, {flex:1}]}>
                <Text style={{fontWeight: 'bold', fontFamily: 'WorkSans', fontSize: 13}}>Title</Text>
            </View>
            <View style = {[styles.headerItem, {flex:2}]}>
                <Text style={{fontWeight: 'bold', fontFamily: 'WorkSans', fontSize: 13}}>Content Type</Text>
            </View>
            <View style = {[styles.headerItem, {flex:1}]}>
                <Text style={{fontWeight: 'bold', fontFamily: 'WorkSans', fontSize: 13}}>Category</Text>
            </View>
        </View>
    )
} 

const Messages = (props) => {
    const [messageList, setMessageList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [messageFiltered, setMessageFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState();

    useFocusEffect(
        useCallback(
            () => {
                //caching messages
            const cacheMessages = async (message) => {
                try {
                  await AsyncStorage.setItem('message', JSON.stringify(message));
                } catch (e) {
                  console.log(e);
                }
              };

              const getCachedData = async () => {
                    try {
                       const messages = await AsyncStorage.getItem('messaage');

                       if(messages !== null){
                        const parsedMessages = JSON.parse(messages);

                        return parsedMessages;
                       }

                    }catch(e){
                        console.log(e);
                    }
              }

              const cachedDataReturned = async () => {
                const messages = await getCachedData();
                return messages;
              }

              const fetchData = async () => {
                try{
                    //Getting messages data from the database
                axios
                    .get(`${baseUrl}message`).then((res)=> {
                        if(res.status == 304){
                            const messages = cachedDataReturned();
                                setMessageList(messages);
                                setMessageFiltered(messages);
                                setLoading(false);

                        }else{
                            setMessageList(res.data.message);
                            setMessageFiltered(res.data.message);
                            setLoading(false);
                            cacheMessages(res.data.message);
                        }
                    }).catch((error) => {
                        console.log('Message fetch error', error)
                    })
            }catch(e){
                console.log(e);//end of fetchData
            }
        }
            //Getting my token
            AsyncStorage.getItem('jwt').then(res=>{
                setToken(res);
            }).catch(error=> console.log(error));

            fetchData()

            return () => {
                setMessageList();
                setMessageFiltered();
                setLoading(true);
            }
        }, [])  
        )

        const [font] = useFonts({
            WorkSans: require("../../assets/fonts/WorkSans-VariableFont_wght.ttf")
        })

        if(!font){
            return null;
        }

        const deleteMessage = (id) => {
            axios.delete(`${baseUrl}message/${id}`, {
                headers: {Authorization: `Bearer ${token}`}
            }).then(res=> {
                const messages = messageFiltered.filter((item) => item._id !== id)
                setMessageFiltered(messages);
            }).catch((error) => console.log(error))
        }

    return (
        <SafeAreaView style = {styles.container}>
            <View style = {styles.buttonContainer}>
                <Button title="Categories"
                btnstyle={{borderRadius: 5, margin: 5, height: 40, justifyContent: 'center', padding: 10, backgroundColor:'#141414'}}
                txtstyle={{color: '#f2f2f2', fontFamily: 'WorkSans', fontWeight: '600', textAlign: 'center' }}
                    onPress={()=>props.navigation.navigate('Categories')}
                />
                <Button title="Create Message"
                btnstyle={{borderRadius: 5, margin: 5, height: 40, justifyContent: 'center', padding: 10, backgroundColor:'#141414'}}
                txtstyle={{color: '#f2f2f2', fontFamily: 'WorkSans', fontWeight: '600', textAlign: 'center' }}
                    onPress={()=>props.navigation.navigate('Message Form')}
                />
            </View>
            <View>
                <Header message={messageList} navigation = {props.navigation}/>
                <View style={{marginTop: 20, paddingBottom: 10}}>
                            <ListHeader />
                 </View>
            </View>
            <ScrollView style={{ width: '100%'}}>
                {loading == true ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="gold" />
                </View>
                ):(
                    <View>
                        <View style={{marginTop: 20, width: width, height: height}}>
                            {messageFiltered.length > 0 ? (
                                <View style={{flex: 1, width: width, height: height}}>
                                    {messageFiltered.map((item) => {
                                        return(
                                        <ListItem 
                                            key={item._id}
                                            {...item}
                                            navigation = {props.navigation}
                                            token = {token}
                                            delete={deleteMessage}
                                        />
                                        )
                                    })}
                                </View>
                            ) : (
                                <View>
                                    <Text>
                                        No message is available
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        backgroundColor: 'gainsboro'
    },
    headerItem: {
        margin: 3,
        width: width/8
    },
    spinner: {
        height: height/2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        paddingBottom: 60,
        alignItems: 'center',
        height: height,
        backgroundColor: 'white'
    },
    buttonContainer: {
        padding: 20,
        marginTop: 30,
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        color: '#f2f2f2',
        fontFamily: 'WorkSans',
        fontWeight: '600',
        textAlign: 'center' 
    }
})

export default Messages