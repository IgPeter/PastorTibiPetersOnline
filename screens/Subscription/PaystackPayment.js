import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Paystack } from "react-native-paystack-webview";
import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function PaymentScreen(props) {
  const [subscription] = useState(props.route.params.item);
  const [user] = useState(props.route.params.user);
  const [publickey, setPublicKey] = useState("");
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    const cacheKeys = async (keys) => {
      try{
        await AsyncStorage.setItem('publicKey', JSON.stringify(keys))
      }catch(error){
        console.log(error)
      }
    }

    const getPublicKey = async () => {
      try{
      const publicKey = await AsyncStorage.getItem('publicKey')
      if(publicKey != null) {
        const publicKeyParsed = JSON.parse(publicKey)
        return publicKeyParsed;
      }
      }catch(error){
        console.log(error);
      }
    }

    async function fetchData(){
      try{
        const publicKey = await getPublicKey();

        axios.get(`${baseUrl}user/biller/paystack`)
        .then((res) => {
          if(res.status == 304){
            setPublicKey(publicKey)
          }
          setPublicKey(res.data.paystackPublicKey);
          cacheKeys(res.data.paystackPublicKey);
      })
      .catch((error) => {
        console.log(error);
      });
      }catch(error){
        return error
      }  
    }

    fetchData();
    
  }, []);

  const handleOnCancel = async () => {
    console.log("Payment was cancelled");
  };

  const handleOnSuccess = async () => {
    axios.patch(`${baseUrl}user/subscribe/${user.id}`, {subscription}).then(res=> {
      setUpdatedUser(res.data.updatedUser);
      props.navigation.navigate('main', {subscribedUser: updatedUser});
      console.log("payment was successful");
    }).catch(error => console.log(error))
  };

  return (
    <View style={styles.container}>
          <Paystack
            paystackKey={publickey}
            amount={subscription.price}
            billingEmail= {user.email}
            activityIndicatorColor="gold"
            onCancel={handleOnCancel}
            onSuccess={handleOnSuccess}
            autoStart={true}
          />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  input: {},
});

export default PaymentScreen;
