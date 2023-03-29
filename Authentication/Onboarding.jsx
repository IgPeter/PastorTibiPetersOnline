import { A } from '@expo/html-elements'
import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableHighlight, Image } from 'react-native'

export const Onboarding = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.skipbtn}>
                <Text>
                    <A href='#'>Skip</A>
                </Text>
                <View style={{paddingLeft: 8}}>
                <Image style={styles.skipIcon} source={require('../assets/nextbutton.png')} />
                </View>
            </Text>
            <View style={styles.containerText}>
                <Text style={styles.mainText}>Get Access to Publications by Pastor Tibi Peters</Text>
                <Text style={styles.subText}>Gain 100% access of publications of Pastor Tibi Peters in Mp3, PDF, etc.</Text>
                <TouchableHighlight>
                    <View style={styles.btn}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>GET STARTED</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        top: 20,
        padding: 10
    },
    
    skipbtn:{
        marginBottom: 419,
        textAlign: "right",
        marginRight: 20,
        marginTop: 47,
    },
    btn: {
        color: '#fff',
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        padding: 15,
        height: 54,
        marginBottom: 83,
    },
    containerText: {
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: '60%'
    },
    mainText: {
        fontWeight: 'bold',
        fontSize: 26,
        textAlign: 'center',
        marginBottom: 15,
        paddingHorizontal: 17
    },
    subText: {
        textAlign: 'center',
        marginBottom: 107,
        paddingHorizontal: 17

    },
})