import React from 'react';
import {Image, View} from 'react-native';


const  NavigationIcon = ({route, isFocused}) => {
    const renderIcon = (route, isFocues) =>{
      let height = 20;
      let width  = 20;
    
      switch (route) {
        case "Home":
          return <Image source={require('../assets/icons/VectorHome.png')} /> 
        case "onboarding":
          return <Image source={require('../assets/icons/Vectoruknown.png')} /> 
        case "Settings":
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