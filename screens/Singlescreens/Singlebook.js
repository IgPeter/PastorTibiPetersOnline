import {View, Text, ScrollView, StyleSheet, Image, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import { Button } from "../../components/Button";
import { BackButton } from "../../components/Backbutton";
import {useFonts} from "expo-font";


export const Singlebook = (props) => {
  const [item] = useState(props.route.params.item);

  const [font] = useFonts({
    WorkSans: require("../../assets/fonts/WorkSans-VariableFont_wght.ttf")
  });

  if(!font){
    return null
  }

  //Helper functions
  const handleClick = () => {
    props.navigation.navigate("Bookreader", {item: item});
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => props.navigation.goBack()} />
      </View>
      <View style={styles.bookInfo}>
        <TouchableOpacity onPress={() => console.log("Button pressed")}>
          <View style={styles.thumbnail}>
            <Image source = {{uri: item.image}} style={{width: 280, height: 280}}/>
          </View>
        </TouchableOpacity>
        <View>
          <Text
            style={{
              fontFamily: 'WorkSans',
              textAlign: "center",
              fontSize: 24,
              fontWeight: "600",
              paddingHorizontal: 53,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "500",
              marginBottom: 7,
            }}
          >
            Pastor Tibi Peters
          </Text>
          <Text style={styles.infocon}>
            <View style={styles.info}>
              <Text style={styles.infotext}>Language</Text>
              <Text style={styles.infosubtext}>English</Text>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
              <Text style={styles.infotext}>Release</Text>
              <Text style={styles.infosubtext}>2023</Text>
            </View>
          </Text>
          <View style={styles.description}>
            <Text style={{ marginBottom: 40, textAlign: "justify" }}>
              {item.description}
            </Text>
            <Button
              onPress={handleClick}
              title="Read"
              btnstyle={{
                borderRadius: 8,
                height: 54,
                justifyContent: "center",
                padding: 10,
                backgroundColor: "#141414",
                marginBottom: 83,
              }}
              txtstyle={{
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: "bold",
                textAlign: "center",
              }}
            />
          </View>
        </View>
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
    marginTop: 20
  },
  header: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    padding: 20,
    marginVertical: 30
  },
  bookInfo: {
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    backgroundColor: "#D9D9D9",
    width: 280,
    height: 280,
    alignSelf: "center",
    marginBottom: 20,
  },
  infocon: {
    width: "100%",
    marginTop: 21,
    alignSelf: "center",
    marginBottom: 30,
  },
  info: {
    borderColor: "#A3A3A3",
    borderRightWidth: 2,
    paddingHorizontal: 13,
  },
  infotext: {
    fontSize: 16,
  },
  infosubtext: {
    color: "#A3A3A3",
    fontSize: 14,
  },
  description: {
    paddingHorizontal: 17,
    marginBottom: 83,
  },
});
