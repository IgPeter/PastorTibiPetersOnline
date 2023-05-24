import React,{useContext} from 'react';
import {View, StyleSheet, Dimensions, Image, Text} from 'react-native';
import {useFonts} from 'expo-font';
import { TouchableOpacity } from 'react-native';
import AuthGlobal from '../../context/store/AuthGlobal';

var width = Dimensions.get('window').width;


const SearchedMessage = (props) => {

    const context = useContext(AuthGlobal)

    const {filteredMessage} = props;

    const [font] = useFonts({
        WorkSans: require("../../assets/fonts/WorkSans-VariableFont_wght.ttf"),
      });
    
      if (!font) {
        return null;
      }

    return(
        <View>
        {context.stateUser.user.isAdmin == true ? (
           <View>
            {console.log('Bad in search interface')}
                {   filteredMessage.length > 0 ? (
                    <TouchableOpacity>
                        <View style = {{width: width-20, padding: 5, marginTop: 10}}>
                            <Text style = {{fontFamily: 'WorkSans', fontSize: 17, fontWeight: '700' }}>
                                {filteredMessage[0].title} </Text>
                            <Text style = {{fontFamily: 'WorkSans', fontSize: 12, 
                            fontWeight: 'regular', paddingTop: 2}}>{filteredMessage[0].description} 
                            </Text>
                        </View>
                    </TouchableOpacity>
            ) : (
                <View style = {styles.center}>
                    <Text style = {{alignSelf: 'center', fontFamily: 'WorkSans', fontWeight: 'bold', color: '#CCCCCC'}}>
                        No message found
                    </Text>
                </View>
            )
        }   
           </View>
        ):(
            <View style={{width: width - 40}}>
            {   filteredMessage.length > 0 ? (
                    <TouchableOpacity style = {{flexDirection: 'row', width: width - 40}} onPress = {()=>{
                        filteredMessage[0].contentType.toLowerCase() === 'audio' ?  
                        props.navigation.navigate('Single Audio', {item: filteredMessage})
                        : filteredMessage[0].contentType.toLowerCase() === 'video' ? 
                        props.navigation.navigate('Single Video', {item: filteredMessage})
                        : props.navigation.navigate('Single Book', {item: filteredMessage})
                    }}>
                        <View style = {styles.thumbnail}>
                            <Image source = {require("../../assets/messageImages/RoleOfScriptures.jpg")} 
                            style = {styles.searchImage}/>
                        </View>
                        <View style = {styles.thumbnailView}>
                            <Text style = {{fontFamily: 'WorkSans', fontSize: 17, fontWeight: '700' }}>
                                {filteredMessage[0].title} </Text>
                            <Text style = {{fontFamily: 'WorkSans', fontSize: 12, 
                            fontWeight: 'regular', paddingTop: 2}}>{filteredMessage[0].description} 
                            </Text>
                        </View>
                    </TouchableOpacity>
            ) : (
                <View style = {styles.center}>
                    <Text style = {{alignSelf: 'center', fontFamily: 'WorkSans', fontWeight: 'bold', color: '#CCCCCC'}}>
                        No message found
                    </Text>
                </View>
            )
        }
    </View>    
    )}
</View>
)
}

const styles = StyleSheet.create({
    searchImage: {
        resizeMode: 'contain',
        width: 40,
        height: 40
    },

    thumbnail: {
        marginTop: 10,
        padding: 5
    },

    thumbnailView: {
        width: '80%',
        marginTop: 10,
        padding: 5,
        alignItems: 'flex-end',
    }
})


export default SearchedMessage;