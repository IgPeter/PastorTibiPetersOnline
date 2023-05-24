import React from "react";
import { View, Pressable, Dimensions, StyleSheet, ImageBackground } from "react-native";
import NavigationIcon from './NavigationIcon';
import { useNavigation, useRoute } from '@react-navigation/native';

const width = Dimensions.get('window').width;

const TabBar = ({ state, descriptors, navigation }) => {
  
      return (
        <ImageBackground source={require('../assets/icons/SubtracttabBar.png')} 
          style= {styles.mainContainer} resizeMode = "contain">
            {
              state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
    
                const label =
                  options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;
      
                const isFocused = state.index === index;
      
                const onPress = () => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key
                  });
      
                  if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                  }
                }; //End of onPress     

              return (
                <View key = {index} style = {styles.mainItemContainer}>
                  {label === 'HomeScreen' ? (
                      <Pressable
                      onPress = {onPress} 
                      style = {[styles.HomePressable, {backgroundColor: isFocused ? "#d4af37": "#000000"}]}>
                        <ImageBackground source = {require('../assets/icons/Rectangle-5HomeCircle.png')} 
                        resizeMode="cover">             
                      <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1, padding: 15}}>
                          <NavigationIcon route='HomeScreen' isFocused={isFocused}/>
                      </View>
                      </ImageBackground> 
                    </Pressable>
                  ): (
                    <Pressable
                    onPress = {onPress} 
                    style = {[styles.pressable, {backgroundColor: isFocused ? "#d4af37": "#000000"}]}>              
                    <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1, padding: 15}}>
                        <NavigationIcon route={label} isFocused={isFocused}/>
                    </View>
                  </Pressable>
                  )}
                  </View>
              );
            })
          }
    </ImageBackground>
      );  
    }

const styles = StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: -5
    },

    mainItemContainer: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center', 
      marginVertical: 10,
      borderRadius: 1, 
      borderColor: "#333B42"
    },

    pressable: {  
      borderRadius: 4
    },

    HomePressable: {
      position: 'absolute',
      bottom: 37,
      left: 48,  
      borderRadius: 23
    }
  })

  export default TabBar