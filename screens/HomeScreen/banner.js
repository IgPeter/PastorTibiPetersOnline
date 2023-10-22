import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import Swiper from 'react-native-swiper/src';

var {width} = Dimensions.get('window');

const Banner = () => {
    const [bannerData, setBannerData] = useState([]);

    useEffect(()=> {
        setBannerData([require('../../assets/messageImages/TraditionsOfChrist.jpg'), 
        require('../../assets/images/bannerImage.jpg'), require('../../assets/messageImages/OneWordOfGod.jpg')])

        return ()=>{
            setBannerData([]);
        }
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.swiper}>
                <Swiper 
                    showButton = {false}
                    autoplay = {true}
                    autoplayTimeout = {2}
                    style={{height: width/1.7}}  
                >
                    {bannerData.map((item) => {
                        return (
                            <Image key={item} 
                            source = {item} 
                            resizeMode= 'contain' style = {styles.imageBanner}/>
                        )
                    })}
                </Swiper>
                <View style={{height: 20}}></View>
            </View>
        </View>
    )
}

export default Banner;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#f2f2f2'
    },

    swiper: {
        width: width - 20,
        alignItems: 'center',
        marginTop: 10
    },

    imageBanner: {
        height: width/1.7,
        width: width,
        borderRadius: 5
    }

});