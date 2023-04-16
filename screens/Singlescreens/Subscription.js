import {
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import user from "../../assets/data/user.json";
import { Button } from "../../components/Button";
import { BackButton } from "../../components/Backbutton";
import { MenuButton } from "../../components/Menubutton";

export const Subscription = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => console.log("Button pressed")} />
        <Text style={{ fontSize: 26, fontWeight: "bold", left: -20, alignSelf: "center" }}>
          Subscription
        </Text>
        <MenuButton onPress={() => console.log("Button pressed")} />
      </View>
      <View style={styles.main}>
        <View style={styles.star}>
          <Image source={require("../../assets/icons/star.png")} />
        </View>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            Basic Plan
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            N1000 | $20
          </Text>
          <Text
            style={{ textAlign: "center", fontSize: 14, marginBottom: 250 }}
          >
            A 90 Days Subscription Plan
          </Text>
        </View>
      </View>
      <View
        style={{
          marginBottom: 86,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            alignSelf: "center",
            justifyContent: "center",
            color: "#235EF5",
            fontWeight: 600,
          }}
        >
          10 Days remaining before Renewal
        </Text>
      </View>
      <View style={{ marginHorizontal: 16 }}>
        <Button
          title="Renew Subscription"
          btnstyle={{
            backgroundColor: "#141414",
            borderRadius: 8,
            height: 54,
            justifyContent: "center",
            padding: 10,
            marginBottom: 16,
          }}
          txtstyle={{
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: "bold",
            textAlign: "center",
          }}
        />
        <Button
          title="Cancel Subscription"
          btnstyle={{
            borderRadius: 8,
            height: 54,
            justifyContent: "center",
            padding: 10,
            borderColor: "#141414",
            borderWidth: 2,
            marginBottom: 82,
          }}
          txtstyle={{
            color: "#141414",
            fontSize: 14,
            fontWeight: "bold",
            textAlign: "center",
          }}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    // backgroundColor: "brown",
    flex: 1,
    width: "100%",
    height: "100%",
    marginTop: 20,
  },
  header: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    padding: 20,
  },
  main: {
    alignSelf: "center",
    marginTop: 43,
    marginBottom: 8,
  },
  star: {
    marginHorizontal: "100%",
    //   backgroundColor: "#D9D9D9",
    height: 120,
    width: 120,
    //borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  footer: {
    height: 115,
    width: "100%",
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    alignItems: "center",
  },
});
