import React from 'react';
import {Image, View} from 'react-native';


const  NavigationIcon = ({route, isFocused}) => {
    const renderIcon = (route, isFocues) =>{
      let height = 20;
      let width  = 20;
    
      switch (route) {
        case "HomeScreen":
          return <Image source={require('../assets/icons/VectorHome.png')} /> 
        case "Explore":
          return <Image source={require('../assets/icons/Vectoruknown.png')} /> 
        case "Setting":
          return <Image source={require('../assets/icons/Vectordoo.png')}/>
        case "User":
          return <Image source={require('../assets/icons/Vectoruser.png')}/>
        default:
          break;
      }
    }
  
    return (
      <View>
        {renderIcon(route, isFocused)}
      </View>
    
    )
  }


  export default NavigationIcon;