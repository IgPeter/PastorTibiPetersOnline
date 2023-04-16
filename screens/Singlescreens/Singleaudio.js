import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React from "react";
import { Button } from "../../components/Button";
import { BackButton } from "../../components/Backbutton";
import { MenuButton } from "../../components/Menubutton";
import { AudioCard } from "../../components/Audiocard";
import messages from "../../assets/data/messages.json";

export const Singleaudio = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => console.log("Button pressed")} />
        <MenuButton onPress={() => console.log("Button pressed")} />
      </View>
      <View style={styles.audioInfo}>
        <View style={styles.thumbnail}>
          <AudioCard />
        </View>
        <View>
          <Text
            style={{ textAlign: "center", fontSize: 24, fontWeight: "600", paddingHorizontal: 53 }}
          >
            {messages[1].title}
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
            <Image source={require("../../assets/icons/ratingb.png")} />
            <Image source={require("../../assets/icons/ratingb.png")} />
            <Image source={require("../../assets/icons/ratingb.png")} />
            <Image source={require("../../assets/icons/ratingb.png")} />
            <Image source={require("../../assets/icons/ratingw.png")} />
          </View>
          <Text style={styles.infocon}>
            <View style={styles.info}>
              <Text style={styles.infotext}>Duration</Text>
              <Text style={styles.infosubtext}>1 hr 20 mins</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infotext}>Type</Text>
              <Text style={styles.infosubtext}>Audio</Text>
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
              onPress={() => console.log("Button pressed")}
              title="Play"
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
  audioInfo: {
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
