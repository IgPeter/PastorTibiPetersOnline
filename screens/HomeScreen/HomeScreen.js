import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import PopularMessages from './popular';
import RecommendedMessages from './recommended';
import Banner from './banner.js';

const HomeScreen = (props) => {

    return (
        <ScrollView style={{paddingTop: 40}}>
            <View style = {styles.theSlider}>
                <Banner />
            </View>
            <View style = {styles.popular}>
                <PopularMessages navigation = {props.navigation} />
            </View>
            <View style = {styles.popular}>
                <RecommendedMessages navigation = {props.navigation} />
            </View>         
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    popular: {
        paddingLeft: 15,
        paddingTop: 10
    },
    
    theSlider: {

    }
})

export default HomeScreen;