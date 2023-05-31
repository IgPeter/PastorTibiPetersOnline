import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator, Dimensions} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from '../../assets/common/baseUrl';
import Header from '../../shared/Header';
import ListItem from './ListItem';
import EasyButton from '../../shared/styledComponents/EasyButton';
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

        const deleteMessage  = (id) => {
            axios.delete(`${baseUrl}message/${id}`, {
                headers: {Authorization: `Bearer ${token}`}
            }).then(res=> {
                const messages = messageFiltered.filter((item) => item._id !== id)
                setMessageFiltered(messages);
            }).catch((error) => console.log(error))
        }

    return (
        <View style = {styles.container}>
            <View style = {styles.buttonContainer}>
                <EasyButton
                    meduim
                    dark
                    onPress={()=>props.navigation.navigate('Categories')}
                >
                    <Text style={styles.buttonText}>Categories</Text>
                </EasyButton>
                <EasyButton
                    large
                    dark
                    onPress={()=>props.navigation.navigate('Message Form')}
                >
                    <Text style={styles.buttonText}>Create Message</Text>
                </EasyButton>
            </View>
                <Header message={messageList} navigation = {props.navigation}/>
            <View style={{ width: '100%'}}>
                {loading == true ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="gold" />
                </View>
                ):(
                    <FlatList 
                        style={{marginTop: 40}}
                        data={messageFiltered}
                        ListHeaderComponent={ListHeader}
                        renderItem={({item, index}) => (
                            <ListItem
                                key = {item.id}
                                {...item}
                                token={token}
                                navigation = {props.navigation}
                                index={index}
                                delete={deleteMessage}
                            />
                        )}
                        keyExtractor={(item) => item.id}
                    />
                )}
            </View>
        </View>
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
        marginBottom: 160,
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
        fontWeight: 600,
        textAlign: 'center' 
    }
})

export default Messages