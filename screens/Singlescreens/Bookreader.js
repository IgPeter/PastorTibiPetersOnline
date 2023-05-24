import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Button } from "../../components/Button";
import { BackButton } from "../../components/Backbutton";
import * as FileSystem from 'expo-file-system';
//import PDFReader from 'react-native-pdf';

const PAGE_HEIGHT = Dimensions.get("window").height;

export const Bookreader = (props) => {
  const [item] = useState(props.route.params.item)
  const [fontSize, setFontSize] = useState(16);
  const [currentPage, setCurrentPage] = useState(0);
  const [pdfPath, setPdfPath] = useState(null);

  useEffect(() => {
    const loadPdfContent = async () => {
      try {
        const fileUri = FileSystem.cacheDirectory + `${item.title}`;
        const downloadedFile = await FileSystem.downloadAsync(
          `${item.message}`,
          fileUri
        );

        setPdfPath(downloadedFile.uri);

      }catch(e){
        console.log(e);
      }
    }

    loadPdfContent();
  }, [])
  const increaseFontSize = () => {
    setFontSize(fontSize + 2);
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 2);
  };

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const pageIndex = Math.round(offsetY / PAGE_HEIGHT);
    setCurrentPage(pageIndex);
  };

  const [fontColor, setFontColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  const Colorbutton = () => {
    const changeColors = () => {
      const newFontColor = getRandomColor();
      const newBgColor = getRandomColor();
      setFontColor(newFontColor);
      setBgColor(newBgColor);
    };

    const getRandomColor = () => {
      const theme = ["#fff", "#000", "#f4f4f4"];
      // const theme = ["#fff", "#000", "#5c7", "#124", "#48f", "#cef", "#f77", "#ffc", "#7b2", "#895", "#fc8", "#9a5", "#dde", "#b2f", "#d7f"];
      // for (let i = 0; i < 6; i++) {
      //   theme = theme.length * [Math.floor(Math.random() * 16)];
      // }
      const randomIndex = Math.floor(Math.random() * theme.length);
      const randomColor = theme[randomIndex];
      return randomColor;
    };

    return (
      <TouchableOpacity onPress={changeColors} style={{ /*borderRadius: "100%",*/ height: 20, width: 20, justifyContent: "center", backgroundColor: "#A3A3A3",}}>
        <Text style={{  color: "#FFFFFF", fontSize: 14, fontWeight: "bold", textAlign: "center"}}>A</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <BackButton onPress={() => console.log("Button pressed")} />
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            left: -20,
            alignSelf: "center",
            width: "60%",
            marginLeft: 30,
          }}
        >
          {item.title}
        </Text>
        <MenuButton onPress={() => console.log("Button pressed")} />
      </View>
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
          <View>
              {/*<PDFReader 
                source={{uri: pdfPath}}
                style={{flex: 1}}
              />*/}
          </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <View style={styles.pageIndicator}>
          <Text>
          {`${currentPage + 1}`}
          </Text>
          </View>
          {<View style={{ backgroundColor: "#fff"}}></View>}
        </View>
        <View style={styles.formatting}>
          <Button
            onPress={increaseFontSize}
            title="+"
            btnstyle={{
              //borderRadius: "100%",
              height: 20,
              width: 20,
              justifyContent: "center",
              backgroundColor: "#A3A3A3",

            }}
            txtstyle={{
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: "bold",
              textAlign: "center",
            }}
          />
          <Button
            onPress={decreaseFontSize}
            title="-"
            btnstyle={{
              //borderRadius: "100%",
              height: 20,
              width: 20,
              justifyContent: "center",
              backgroundColor: "#A3A3A3",

            }}
            txtstyle={{
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: "bold",
              textAlign: "center",
            }}
          />
          <Colorbutton />
          <TouchableOpacity>
            <Image source={require('../../assets/icons/brightness.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    height: "100%",
    width: "100%",
  },
  header: {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    padding: 20,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
  },
  content: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    textAlign: "justify",
    shadowColor: "#000",
    // shadowBottom: 8
  },
  formatting: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 34
  },
  footer:{
    height: 80,
    borderTopColor: "#fff",
    borderTopWidth: 1,
    paddingVertical: 26
  },
  pageIndicator: {
    backgroundColor: "#A3A3A3",
    height: 24,
    width: 37,
    borderRadius: 8,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center"
    // marginVertical: 26
  }
});
