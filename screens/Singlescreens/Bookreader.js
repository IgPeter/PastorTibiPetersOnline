import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Linking,
} from "react-native";
import { BackButton } from "../../components/Backbutton";
import { Buffer } from "buffer";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
//import * as FileSystem from 'expo-file-system';
//import PDFReader from 'react-native-pdf';

const PAGE_HEIGHT = Dimensions.get("window").height;
const PAGE_WIDTH = Dimensions.get("window").width;

export const Bookreader = (props) => {
  const [item] = useState(props.route.params.item)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sharePdf = async () => {
      const messageUrl = item.message;

      const messageBuff = Buffer.from(messageUrl, "base64");
      const base64 = messageBuff.toString("base64");

      const fileUri =
        FileSystem.documentDirectory + `${encodeURI(`${item.title}`)}.pdf`;

      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setLoading(false);
      Sharing.shareAsync(fileUri, {
        dialogTitle: 'Open With'
      });
    }

    sharePdf();
    
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={{marginTop: 20, padding: 10}} onPress={props.navigation.goBack()}>
          <BackButton />
      </TouchableOpacity>
      {loading == true ? (
        <ActivityIndicator color="gold"/>
      ): null}
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,

    height: PAGE_HEIGHT,
    width: PAGE_WIDTH,
  },
  });
