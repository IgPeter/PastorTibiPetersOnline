import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import React from 'react'
import { Button } from '../components/Button'

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
                    <Button title="Next"  btnstyle={{ backgroundColor: "#141414", borderRadius: 8, height: 54, justifyContent: "center", padding: 10, marginBottom: 15, }} txtstyle={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600", textAlign: "center" }} />
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