import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, Dimensions,Modal} from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import EasyButton from '../../shared/styledComponents/EasyButton';

var {width} = Dimensions.get('window');

const ListItem = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    
    return (
        <View>
            {console.log(props)}
            <Modal
                animationType={fade}
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            underlayColor='#E8E8E8'
                            onPress={()=> {
                                setModalVisible(false)
                            }}

                            style = {
                                {
                                    alignSelf: 'flex-end',
                                    position: 'absolute',
                                    top: 5,
                                    right: 10
                                }
                            }
                        >
                            <Ionicons name="close" size={20} />
                        </TouchableOpacity>
                        <EasyButton 
                            medium
                            secondary
                            onPress={() => {
                                props.navigation.navigate('Message Form');
                                setModalVisible(false)
                            }}
                        >
                            <Text style={styles.txtStyle}>Edit</Text>
                        </EasyButton>
                        <EasyButton 
                            medium
                            danger
                            onPress={() => {
                                props.delete(props._id)
                                setModalVisible(false)
                            }}
                        >
                            <Text style={styles.txtStyle}>Delete</Text>
                            </EasyButton>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity
            onPress={()=>{
                props.contentType.toLowerCase().trim() === 'video' ?
                props.navigation.navigate('Single Video', {item: props}) :
                props.contentType.toLowerCase().trim() === 'audio' ? 
                props.navigation.navigate('Single Audio', {item: props}) :
                props.contentType.toLowerCase().trim() === 'book'?
                props.navigation.navigate('Single Video', {item: props}): null 
            }}
            onLongPress={()=> setModalVisible(true)}
            style={[styles.container, {backgroundColor: props.index % 2 == 0 ? 
                'white' : 'gainsboro' }]}
            >
                <Image 
                    source= {{
                        uri: props.image ? 
                        props.image : 'https://pixabay.com/photos/dog-beach-sea-domestic-animal-7956828/'
                    }}
                    resizeMode = 'contain'
                    style={styles.image}
                />
            <Text style={styles.item}>{props.title}</Text>
            <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>{props.contentType}</Text>
            <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>{props.category.name}</Text>
            <Text style={styles.item} numberOfLines={1} ellipsizeMode='tail'>{props.isFeatured}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        width: width
    },
    image: {
        borderRadius: 50,
        width: width/6,
        height: 20,
        margin: 2
    },
    item: {
        flexWrap: 'wrap',
        margin: 3,
        width: width/6
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    txtStyle: {
        color: 'white',
        fontWeight: 'bold'
    }
})

export default ListItem;