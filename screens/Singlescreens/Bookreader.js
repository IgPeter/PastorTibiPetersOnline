import React, { useState } from "react";
import {TouchableOpacity, Dimensions, StyleSheet, SafeAreaView, View} from "react-native";
import { BackButton } from "../../components/Backbutton";
import Pdf from 'react-native-pdf';

const PAGE_HEIGHT = Dimensions.get("window").height;
const PAGE_WIDTH = Dimensions.get("window").width;

export const Bookreader = (props) => {
  const [item] = useState(props.route.params.item);
  /*const [pdfResource, setPdfResource] = useState({});

  useEffect(() => {
    setPdfResource({uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" , cache: true})
  }, [])*/

  const pdfResource = {uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', cache: true}

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={{marginTop: 20, padding: 10}} onPress={props.navigation.goBack()}>
          <BackButton />
      </TouchableOpacity>
      <View>
        {console.log(pdfResource)}
            <Pdf
            trustAllcerts={false}
            source = {pdfResource}
            style = {styles.pdf}
            onLoadComplete={(numOfPages, filePath)=> {
              console.log(`number of pages : ${numOfPages}`);
            }}
          />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  pdf: {
    flex: 1,
    height: PAGE_HEIGHT,
    width: PAGE_WIDTH,
  }
  });