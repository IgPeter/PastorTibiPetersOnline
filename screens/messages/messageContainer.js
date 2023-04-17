import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import MessageList from './messageList';
import MessageCategory from '../../shared/messageCategory';
import Header from '../../shared/Header';
const data = require('../../assets/data/messages.json');
const categoriesData = require('../../assets/data/categories.json');

var  width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const MessageContainer = (props) => {

    const [messages, setMessages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [messageCtg, setMessageCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]); 


     useEffect(() => {
        setMessages(data);
        setCategories(categoriesData);
        setMessageCtg(data)
        setActive(-1);
        setInitialState(data);

       
        return () => {
            setMessages([]);
            setCategories([]);
            setMessageCtg([])
            setActive();
            setInitialState([]);
        }
    }, [])

    const changeCT = (ctg) => {
        {
            ctg === 'all' ? [
                setMessageCtg(initialState), setActive(true)
            ] : [
                setMessageCtg(
                    messages.filter((i) => i.category == ctg),
                    setActive(true)
                )
            ];
        }
    }

    return (
            <View style = {styles.container}>                
                <View>           
                    <Header navigation = {props.navigation}/>
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
                            <View style = {[styles.center, {height: '40%'}]}>
                                <Text>No messages for this category</Text>
                            </View>
                        )}
                        </ScrollView>
                </View>
        
            </View>
        ) 
}

const styles = StyleSheet.create({
    container : {
        height: height,
        marginTop: 20,
        alignItems: 'center',
        paddingBottom: 160
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
})

export default MessageContainer;