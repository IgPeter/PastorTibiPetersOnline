import React, {useState} from 'react';
import {SafeAreaView, TextInput, 
    StyleSheet, Image, 
    View, Dimensions, 
    TouchableOpacity} from 'react-native';
import SearchInterface from "../screens/messages/searchMessages";
import {useFonts} from 'expo-font';

var width = Dimensions.get('window').width;

const Header = (props) => {

    //set the message
    const [focus, setFocus] = useState(false);
    const [filteredMessage, setFilteredMessage] = useState([]);
        
    const searchMessage = (text) => {
        setFilteredMessage(props.message.filter((i) => i.title.toLowerCase().includes(text.toLowerCase())))
    }
    
    const [font] = useFonts({
        WorkSans: require("../assets/fonts/WorkSans-VariableFont_wght.ttf"),
      });
    
      if (!font) {
        return null;
      }

    const openList = () => {
        setFocus(true);
    }

    const close = () => {
        setFocus(false);
    }

     return (
            <SafeAreaView>
            {focus == true ? (
                <View style = {styles.dropdownInput}>
                    {console.log('bad in header')}
                    <TextInput style={styles.input} onChangeText={(text) => searchMessage(text)}/>
                    <TouchableOpacity style = {styles.closeIcon} onPress = {close}>
                        <Image source={require('../assets/icons/icon-close.png')} />
                    </TouchableOpacity> 
                    <SearchInterface filteredMessage = {filteredMessage} 
                    navigation = {props.navigation}/>  
                </View>            
           ):(
        <View>   
            <View style = {styles.searchInput}>
                <TextInput placeholder = "Search for anything" style={styles.input}
                onFocus = {openList}
                />
            </View>
            <View style = {styles.searchImageContainer}>
                <Image source = {require('../assets/icons/Vectorsearch.png')} style = {styles.searchIcon}/>
                <Image source = {require('../assets/icons/VectorsearchIcon.png')}  style = {styles.searchElement} />
            </View>
       </View>
       )
       }
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    searchInput: {
        width: width - 40,
    },

    center: {
        center: {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
        }
    },

    searchInterface: {
        width: width - 40,
        borderColor: '#000',
        borderWidth: 4
    },

    input: {
        fontFamily: 'WorkSans',
        fontWeight: '600',
        borderRadius: 4,
        color: '#A3A3A3',
        borderWidth: 0.5,
        borderColor: '#E3E3E3',
        fontSize: 12,
        height: 35,
        paddingLeft: 30
    },

    dropdownInput : {
        width: width-40,
        flex: 1
    },

    searchImageContainer: {
        flexDirection: 'row',
    },

    searchIcon: {
        marginTop: -25,
        marginLeft: 10
    },

    searchElement: {
        position: 'absolute',
        right: 10,
        top: -24
    },

    closeIcon: {
        position: 'absolute',
        right: 10,
        top: 5
    },

    dropdownInputAdmin: {

    },

    inputAdmin: {

    }

})

export default Header;