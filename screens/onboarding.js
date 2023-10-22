import {View, SafeAreaView, Text, StyleSheet} from 'react-native';
import {useFonts} from 'expo-font';
import {Button} from '../components/Button';

const onboardingHeader = "Get access to publications by Pastor Tibi Peters"
const onboardingPara = "Gain 100% access of publications of Pastor Tibi Peters in Mp3, PDF, etc."

const OnBoardingScreen = ({navigation}) => {

    const [font] = useFonts({
        WorkSans: require("../assets/fonts/WorkSans-VariableFont_wght.ttf")
    })

    if(!font){
        return null
    }

    return (
        <SafeAreaView style = {{flex: 1, justifyContent: 'flex-end'}}>
            <View style={styles.content}>
                <Text style={styles.anotherTextStyle}>{onboardingHeader + ' ' + onboardingPara}</Text>
                <Button title = "Get Started" btnstyle={{ backgroundColor: "#141414", marginTop: 5,
                    borderRadius: 5, height: 45, justifyContent: "center", fontFamily: 'WorkSans', 
                    paddingLeft: 30, paddingRight: 30, paddingTop: 5, paddingBottom: 5, marginBottom: 5, }} 
                    txtstyle={{ color: "#f2f2f2", fontSize: 13, fontWeight: '600', textAlign: "center" }}
                    onPress={() => navigation.navigate('Login')} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        padding: 15,
        marginBottom: 200
    },
    anotherTextStyle: {
        marginBottom: 5,
        padding: 10,
        color: '#000',
        fontFamily: 'WorkSans',
        fontSize: 15,
        fontWeight: '600'
    }
});

export default OnBoardingScreen;