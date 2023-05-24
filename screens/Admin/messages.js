import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator, Dimensions} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from '../../assets/common/baseUrl';
import Header from '../../shared/Header';
import ListItem from './ListItem';
import EasyButton from '../../shared/styledComponents/EasyButton';

var {width, height} = Dimensions.get('window');

const ListHeader = () =>{
    return(
        <View elevation={1} style = {styles.listHeader}>
            <View style = {styles.headerItem}></View>
            <View style = {styles.headerItem}>
                <Text style={{fontWeight: 600}}>Title</Text>
            </View>
            <View style = {styles.headerItem}>
                <Text style={{fontWeight: 600}}>ContentType</Text>
            </View>
            <View style = {styles.headerItem}>
                <Text style={{fontWeight: 600}}>Category</Text>
            </View>
            <View style = {styles.headerItem}>
                <Text style={{fontWeight: 600}}>isFeatured</Text>
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

              const fetchData = async () => {
                try{              
                    const {messages} = await getCachedData(); 
                        //Getting messages data from the database
                    axios
                    .get(`${baseUrl}message`).then((res)=> {
                        if(res.status == 304){
                                setMessageList(messages);
                                setMessageFiltered(messages);
                                setLoading(false);

                        }else{
                            setMessageList(res.data);
                            setMessageFiltered(res.data);
                            setLoading(false);
                            cacheMessages(res.data);
                        }
                    }).catch((error) => {
                        console.log('Message fetch error')
                        console.log(error);
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

        const deleteMessage  = (id) => {
            axios.delete(`${baseUrl}message`, {
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
                    secondary
                    onPress={()=>props.navigation.navigate('Categories')}
                >
                    <Text style={styles.buttonText}>Categories</Text>
                </EasyButton>
                <EasyButton
                    meduim
                    secondary
                    onPress={()=>props.navigation.navigate('Message Form')}
                >
                    <Text style={styles.buttonText}>Create Message</Text>
                </EasyButton>
            </View>
           <View>
                <Header message={messageList} navigation = {props.navigation}/>
            </View>
            <View>
                {loading == true ? (
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="gold" />
                </View>
                ):(
                    <FlatList 
                        style={{borderWidth: 2, borderColor: 'red'}}
                        data={messageFiltered}
                        ListHeaderComponent={ListHeader}
                        renderItem={({item, index}) => (
                            <ListItem
                                {...item}
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
        padding: 5,
        backgroundColor: 'gainsboro'
    },
    headerItem: {
        margin: 3,
        width: width/6
    },
    spinner: {
        height: height/2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        marginBottom: 160,
        backgroundColor: 'white'
    },
    buttonContainer: {
        margin: 20,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        marginLeft: 4,
        color: 'white'
    }
})

export default Messages