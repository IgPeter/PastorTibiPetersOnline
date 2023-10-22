import { createStackNavigator } from "@react-navigation/stack";
import Main from './Main';

import { Singleaudio } from '../screens/Singlescreens/Singleaudio';
import { Singlevideo } from '../screens/Singlescreens/Singlevideo';
import { Singlebook } from '../screens/Singlescreens/Singlebook';
import SingleAudioPlay from '../screens/Singlescreens/SingleAudioPlay';
import { Singlevideoplay } from '../screens/Singlescreens/Singlevideoplay';
import { Bookreader } from '../screens/Singlescreens/Bookreader';
import AdminLogin from "../screens/Admin/Login";
import AdminSignup from "../screens/Admin/SignUp";
import Messages from "../screens/Admin/messages";
import MessageForm from "../screens/Admin/createMessageForm";
import Categories from "../screens/Admin/categories";
import { Login } from "../screens/Authentication/Login";
import { Signup } from "../screens/Authentication/Signup";
import { Subscription } from "../screens/Subscription/Subscription";
import OnBoardingScreen from "../screens/onboarding";
import SplashScreen from "../screens/splash";
import PaymentScreen from "../screens/Subscription/PaystackPayment";
import SubscriptionExpires from "../screens/Subscription/subscriptionExpires";

const Stack = createStackNavigator()

const MyStack = () => {
    return (
        <Stack.Navigator initialRouteName="Splash Screen">
            <Stack.Screen name="main" component={Main} options={{headerShown: false}} />
            <Stack.Screen name='Single Audio' component={Singleaudio} options={{ headerShown: false}}/>
            <Stack.Screen name='Single Video' component={Singlevideo} options={{headerShown: false}}/>
            <Stack.Screen name='Single Book' component={Singlebook} options={{ headerShown: false}}/>
            <Stack.Screen name="Video Play" component={Singlevideoplay} options ={{ headerShown: false}} />
            <Stack.Screen name="Audio Play" component={SingleAudioPlay} options ={{ headerShown: false}} />
            <Stack.Screen name="Bookreader" component={Bookreader} options={{ headerShown: false}}/>
          {/*Admin screens*/}
          <Stack.Screen name="Admin Login" component={AdminLogin}  options ={{ headerShown: false}}/>
          <Stack.Screen name="Admin Register" component={AdminSignup}  options ={{ headerShown: false}}/>
          <Stack.Screen name='Admin Message' component={Messages} options={{headerShown: false}}/>
            <Stack.Screen name='Categories' component={Categories} options={{ headerShown: false}}/>
            <Stack.Screen name='Message Form' component={MessageForm} options={{ headerShown: false}}/>
          {/*user screens*/}
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false}}/>
        <Stack.Screen name='Register' component={Signup} options={{ headerShown: false}}/>
        <Stack.Screen name='Subscription' component={Subscription} options={{ headerShown: false}}/>
        <Stack.Screen name='Paystack Payment'  component={PaymentScreen} options={{headerShown: false}}/>
        <Stack.Screen name='Subscription Expired'  component={SubscriptionExpires} options={{headerShown: false}}/>
        {/*First Screens*/}
        <Stack.Screen name='Onboarding' component={OnBoardingScreen} options={{ headerShown: false}}/>
        <Stack.Screen name='Splash Screen' component={SplashScreen} options={{ headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default function AppNavigator(){
    return <MyStack/>
}