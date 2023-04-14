import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Button } from "../components/Button";
import { BackButton } from "../components/Backbutton";
import { MenuButton } from "../components/Menubutton";
import { Bookreader } from "./Bookreader";

export const Singlebook = ({ navigation }) => {
  const handleClick = () => {
    navigation.navigate({Bookreader});
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => console.log("Button pressed")} />
        <MenuButton onPress={() => console.log("Button pressed")} />
      </View>
      <View style={styles.bookInfo}>
        <TouchableOpacity onPress={() => console.log("Button pressed")}>
          <View style={styles.thumbnail}>
            <Image />
          </View>
        </TouchableOpacity>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              fontWeight: "600",
              paddingHorizontal: 53,
            }}
          >
            30 Days in the Book of Revelation
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
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Image source={require("../assets/ratingb.png")} />
            <Image source={require("../assets/ratingb.png")} />
            <Image source={require("../assets/ratingb.png")} />
            <Image source={require("../assets/ratingb.png")} />
            <Image source={require("../assets/ratingw.png")} />
          </View>
          <Text style={styles.infocon}>
            <View style={styles.info}>
              <Text style={styles.infotext}>Pages</Text>
              <Text style={styles.infosubtext}>100</Text>
            </View>
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
              30 Days in the Book of Revelation is a daily devotional coi ned
              from the chapters of the new testament book, Revel ation. 30 Days
              in the Book of Revelation is a daily devotio nal coined from the
              chapters of the new testament book, Revelation. 30 Days in the
              Book of Revelation is a daily de votional coined from the chapters
              of the new testament book, Revelation.
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
    marginTop: 20,
  },
  header: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    padding: 20,
  },
  bookInfo: {
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    backgroundColor: "#D9D9D9",
    width: 195,
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
