import React from "react";
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity} from "react-native";
import { Button } from "../../components/Button";

export const Onboarding = () => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.skipbtn}>
          <Text>Skip</Text>
          <View style={{ paddingLeft: 8, }}>
            <Image
              style={styles.skipIcon}s
              source={require("../../assets/icons/nextbutton.png")}
            />
          </View>
        </Text>
      </TouchableOpacity>
      <View style={styles.containerText}>
        <Text style={styles.mainText}>
          Get Access to Publications by Pastor Tibi Peters
        </Text>
        <Text style={styles.subText}>
          Gain 100% access of publications of Pastor Tibi Peters in Mp3, PDF,
          etc.
        </Text>
        <Button
          title="GET STARTED"
          btnstyle={{
            backgroundColor: "#141414",
            borderRadius: 8,
            height: 54,
            justifyContent: "center",
            padding: 10,
            marginBottom: 83,
          }}
          txtstyle={{
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: "600",
            textAlign: "center",
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    top: 20,
    padding: 10,
  },

  skipbtn: {
    marginBottom: 419,
    textAlign: "right",
    marginRight: 20,
    marginTop: 47,
  },
  btn: {
    color: "#fff",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 15,
    height: 54,
    marginBottom: 83,
  },
  containerText: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: "60%",
  },
  mainText: {
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center",
    marginBottom: 15,
    paddingHorizontal: 17,
  },
  subText: {
    textAlign: "center",
    marginBottom: 107,
    paddingHorizontal: 17,
  },
});
