import {StyleSheet} from 'react-native';

const onboardingHeader = "Get access to publications by Pastor Tibi Peters"
const onboardingPara = "Gain 100% access of publications of Pastor Tibi Peters in Mp3, PDF, etc."


const onBoardingScreen =  () => {
    return (
        <View style = {styles.container}>
            <Text>{onboardingHeader}</Text>
            <Text>{onboardingPara}</Text>
            <Button title = "Getting Started"/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {

    }
});


export default onBoardingScreen;