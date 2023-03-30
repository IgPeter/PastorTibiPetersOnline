import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import React from 'react'

export const Passwordsuccess = () => {
    return (
        <View>
            <View style={styles.card}>
                <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 10 }}>Congratulations</Text>
                <Text style={{marginBottom: 22}}>Password successfully changed</Text>
                <View style={{marginBottom: 31, alignItems: 'center'}}>
                    <Image source={require('../assets/Success.png')} />
                </View>
                <TouchableHighlight>
                    <View style={styles.btn}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Next</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    card:{
        shadowColor: '#1E1E1E',
        width: '100%',
        // backgroundColor: 'grey'
    },
    btn: {
        color: '#fff',
        backgroundColor: '#000',
        alignItems: 'center',
        borderRadius: 8,
        padding: 15,
        height: 54,
        marginBottom: 15,
    }
})