import { StatusBar, SafeAreaView, 
    StyleSheet} from 'react-native'


    function splashScreen (){
        return(
            <SafeAreaView style = {styles.container}>
                <StatusBar 
                    backgroundColor = "#FFFFFF"
                    barStyle = "dark-content"
                />
            </SafeAreaView>
        )
    }

    const styles = StyleSheet.create({
        container: {

        }
    })

    export default splashScreen;