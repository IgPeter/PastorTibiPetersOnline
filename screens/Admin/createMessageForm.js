import { StyleSheet, Text, TextInput, View, ScrollView, Image} from 'react-native'
import React, {useState} from 'react'
import { A } from '@expo/html-elements';
import { Button } from '../../components/Button';
import Error from '../../shared/Error';
import axios from 'axios';
import baseUrl from '../../assets/common/baseUrl';
import * as DocumentPicker from 'expo-document-picker';
import { Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

var {width} = Dimensions.get('window')

const MessageForm = (props) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contentType, setContentType] = useState('');
  const [category, setCategory] = useState(options[0].value);
  const [image, setImage] = useState('');
  const [messageFile, setMessageFile] = useState();

  useEffect(()=>{

    //caching categories
    const cacheCategory = async (category) => {
      try {
        await AsyncStorage.setItem('category', JSON.stringify(category));
      } catch (e) {
        console.log(e);
      }
    };

    const getCachedData = async () => {
      try {
        const categories = await AsyncStorage.getItem('category');

        if (categories !== null) {
          // Both messages and categories are cached, use the data here
          const parsedCategories = JSON.parse(categories);
          return { categories: parsedCategories}
        }
      } catch (e) {
        console.log(e);
      }
    };
   
      const fetchData = async () => {

        try {
          const {categories} = await getCachedData(); 
        
          //Getting categories data
          axios.get(`${baseUrl}category`).then(res=> {
            if(res.status == 304){
                console.log(categories)
                setCategory(categories);
            }else{
                console.log(`${res.data}`)
                setCategory(res.data.category);
                cacheCategory(res.data.category);
            }
        y}).catch((error) => {
            console.log('Category fetch error');
            console.log(error);
        })
      }catch(e){
        console.log(e);
      }
      }//end of fetchData

      //Getting my token
      AsyncStorage.getItem('jwt').then(res=>{
        setToken(res);
    }).catch(error=> console.log(error));

      fetchData();

      return() => {
        setCategory([])
      }

    },[])

  const createMessage = () => {
    if(firstName === '' || lastName === '' || email === '' || phone === ''
    || password === ''){
      setError('Fill in the form completely');
    }
      
    let message = {
        title: title,
        description: description,
        contentType: contentType,
        category: category,
        image: image.name,
        message: messageFile.name
    }

    axios.post(`${baseUrl}message`, message).then((res)=> {
      if (res.status == 200){
        Toast.show({
          topeOffset: 60,
          type: 'success',
          text1: 'Message created successfully',
          text2: ''

        })
            setTimeout(()=> {
                props.navigation.navigate('Admin Message');
            }, 300)
      }
    }).catch((error)=> {
      Toast.show({
        topeOffset: 60,
        type: 'error',
        text1: 'Could not create message',
        text2: 'Please try again'
      })
    })
  }

  const pickDocumentDisplayImage = async () => {
   try {
      let result = await DocumentPicker.getDocumentAsync({})
      setImage(result);
   } catch(e){
      console.log(e);
   }
  };

  const pickDocumentMessageFile = async () => {
    try {
       let result = await DocumentPicker.getDocumentAsync({})
       setMessageFile(result);
    } catch(e){
       console.log(e);
    }
   };

   const handleOptionChange = (value) => {
        setCategory(value)
   }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.signup}>Hey Admin create a message</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.inputField} 
        placeholder="title" keyboardType='default' onChangeText={(text) => setTitle(text.trim())} />
        <TextInput style={styles.inputField} 
        placeholder="description" keyboardType='default' onChangeText={(text) => setDescription(text.trim())} />
        <TextInput style={styles.inputField} 
        placeholder="content type" keyboardType='email-address' onChangeText={(text)=> setContentType(text.trim())}/>
        <View>
            <Text>Category</Text>
            <Picker 
                mode = "dropdown"
                style={{width: undefined}}
                placeholder = "Select a category"
                selectedOption = {category}
                placeholderStyle={{color: '#007aff'}}
                onValueChange = {(value)=>[handleOptionChange(value), setCategory(value)]}
            >
                {
                    category.map((option) => {
                    <Picker.Item 
                        key = {option.id}
                        label = {option.name}
                        value = {option.id}
                    />
                    })
                }
            </Picker>
        </View>
        <View style={styles.filePicker}>
          <TextInput style={styles.inputField} placeholder="Set a display image" editable={false} 
          value={image ? image.name : ''}/>
          <Button title='Browse' btnstyle={{ backgroundColor: "#141414", borderRadius: 8, 
          padding: 10, width: 70, position: 'absolute', right: 10, top: 23 }} 
          txtstyle={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600", textAlign: "center" }} 
          onPress={pickDocumentDisplayImage} />
        </View>
        <View style={styles.filePicker}>
          <TextInput style={styles.inputField} placeholder="Upload message" editable={false} 
          value={messageFile ? messageFile.name : ''}/>
          <Button title='Browse' btnstyle={{ backgroundColor: "#141414", borderRadius: 8, 
          padding: 10, width: 70, position: 'absolute', right: 10, top: 23 }} 
          txtstyle={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600", textAlign: "center" }} 
          onPress={pickDocumentMessageFile} />
        </View>
        </View>
      <View>
        <Button title="Create Message"  btnstyle={{ backgroundColor: "#141414", borderRadius: 8, height: 54, 
        justifyContent: "center", padding: 10, marginBottom: 15, }} 
        txtstyle={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600", textAlign: "center" }} 
        onPress={()=> createMessage()}/>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -20,
    width: '100%',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 70,
  },
  title: {
    marginTop: 109,
  },
  signup: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  inputView: {
    marginVertical: 20,
    marginBottom: 30
  },

  inputField: {
    height: 54,
    backgroundColor: '#F5F5F5',
    marginVertical: 15,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#E3E3E3'
  },

  inputText: {
    fontSize: 10,
    marginTop: -10,
    marginLeft: 2,
    color: '#C90101'
  }
})

export default MessageForm;