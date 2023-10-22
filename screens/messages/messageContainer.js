import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator, SafeAreaView} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MessageList from './messageList';
import MessageCategory from '../../shared/messageCategory';
import Header from '../../shared/Header';
import baseUrl from '../../assets/common/baseUrl';
import  AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

var  width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const MessageContainer = (props) => {

    const [messages, setMessages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [messageCtg, setMessageCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]); 
    const [loading, setLoading] = useState(true);

     useFocusEffect((
        useCallback(()=> {

            //caching messages
            const cacheMessages = async (message) => {
                try {
                  await AsyncStorage.setItem('message', JSON.stringify(message));
                } catch (e) {
                  console.log(e);
                }
              };

              //caching categories
              const cacheCategories = async (category) => {
                try {
                  await AsyncStorage.setItem('category', JSON.stringify(category));
                } catch (e) {
                  console.log(e);
                }
              };
              
              //getting cached messages and categories
            const getCachedData = async () => {
                try {

                  const messages = await AsyncStorage.getItem('message');
                  const categories = await AsyncStorage.getItem('category');

                  if (messages !== null && categories !== null) {
                    // Both messages and categories are cached, use the data here
                    const parsedMessages = JSON.parse(messages);
                    const parsedCategories = JSON.parse(categories);

                    return {
                        messages: parsedMessages,
                        categories: parsedCategories
                    }
                  }
                } catch (e) {
                  console.log(e);
                }
              };
              
            const fetchData = async () => {
            try{        
                const {messages, categories} = getCachedData();     
                    //Getting messages data from the database
                axios.get(`${baseUrl}message`)
                .then(res =>{
                    if(res.status == 304){
                        setMessages(messages);
                        setMessageCtg(messages);
                        setInitialState(messages);
                        setActive(-1);
                        setLoading(false);
                    }else{
                        setMessages(res.data.message);
                        setMessageCtg(res.data.message);
                        setInitialState(res.data.message);
                        setActive(-1);
                        setLoading(false);
                        cacheMessages(res.data.message)
                    }
                }).catch((error) => {
                    console.log('Message fetch error')
                    console.log(error);
                })
            
            //Getting categories data
            axios.get(`${baseUrl}category`).then(res => {
                if(res.status == 304){
                    setCategories(categories);
                }else{
                    setCategories(res.data.category);
                    cacheCategories(res.data.category);
                }
            }).catch((error) => {
                console.log('Category fetch error');
                console.log(error);
            })
        }catch(e){
            console.log(e);//end of fetchData
        }
    }

        fetchData();
                    
             return () => {
                 setMessages([]);
                 setCategories([]);
                 setMessageCtg([])
                 setActive();
                 setInitialState([]);
             }
             
        }, [])
        
        ))    

    const changeCT = (ctg) => {
        {
            ctg === 'all' ? [
                setMessageCtg(initialState), setActive(true)
            ] : [
                setMessageCtg(
                    messages.filter((i) => i.category._id == ctg),
                    setActive(true)
                )
            ];
        }
    }
    
    return (
        <>
        {loading == false ? (
             <SafeAreaView style = {styles.container}>                
             <View>          
                 <Header message={messages} navigation = {props.navigation}/>
                 <View style = {{height: 80, width: width - 40}}>
                     <MessageCategory categories = {categories}
                 changeCT = {changeCT} messageCtg = {messageCtg} active = {active} setActive={setActive}
                />
            </View>
                 <ScrollView>
                     {messageCtg.length > 0 ? (
                         <View style = {styles.listContainer}>
                             {messageCtg.map((item)=> {
                                 return (
                                     <MessageList key={item._id} item={item} 
                                     navigation = {props.navigation}/>
                                 )
                             })}
                         </View>
                     ) : (
                         <View style = {[styles.center, {height: '40%', flex: 1}]}>
                             <ActivityIndicator color ="gold" />
                         </View>
                     )}
                     </ScrollView>
             </View>
             </SafeAreaView>
        ): (
            //loading
            <SafeAreaView style = {[styles.center, {backgroundColor: '#f2f2f2', height: height}]}>
                <ActivityIndicator size='large' color='gold'/>
            </SafeAreaView>
        )}        
        </>
        ) 
}

const styles = StyleSheet.create({
    container : {
        height: height,
        marginTop: 55,
        alignItems: 'center',
        paddingBottom: 120
    },

    listContainer: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default MessageContainer;