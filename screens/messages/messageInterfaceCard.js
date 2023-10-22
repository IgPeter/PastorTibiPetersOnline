import React from "react";
import { StyleSheet, Dimensions, View, Text, Image } from "react-native";
import { useFonts } from "expo-font";


var { width } = Dimensions.get("window");

const MessageInterfaceCard = (props) => {
  const [font] = useFonts({
    WorkSans: require("../../assets/fonts/WorkSans-VariableFont_wght.ttf"),
  });

  if (!font) {
    return null;
  }

  const { title, contentType, image } = props;

  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />    
        <View>  
          <Text style={styles.text}>{contentType}</Text>
        {contentType === "video" ? (
          <View>
            <View style = {styles.videoImageContainer}>
            <Image
              source={require("../../assets/icons/VectorvideoIcon.png")} style={styles.videoIcon}
            />
            </View>
            <View style = {styles.overlay}>
                <Image source = {require('../../assets/icons/VectorplayIcon.png')}/>
            </View>
          </View>
        ) : (
          null
        )}
        {contentType === "audio" ? (
          <Image
            source={require("../../assets/icons/Vectoraudio.png")}
            style={styles.messageFeaturesImage}
          />
        ) : (
          null
        )}
        {contentType === "book" ? (
          <Image
            source={require("../../assets/icons/Vectordevotional.png")}
            style={styles.messageFeaturesImage}
          />
        ) : (
          null
        )}
    </View>
      <Text style={styles.title}>
        {title.length > 20 ? title.substring(0, 15 - 3) + "..." : title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 3 - 20,
    height: width / 2.2
  },

  image: {
    width: width / 3 - 20,
    height: width / 3 - 20
  },

  text: {
    fontSize: 8,
    fontFamily: "WorkSans",
    fontWeight: '600',
    marginTop: 5,
    marginLeft: 5,
  },

  messageFeaturesImage: { 
    width: 11,
    height: 8,
    resizeMode: 'contain',
    marginTop: 7,
    position: "absolute",
    right: 5
  },

  videoImageContainer: {
    position: 'absolute',
    right: 5,
    top: -10
  },

  videoIcon: {
    width: 11,
    height: 7,
    resizeMode: 'contain'
  },

  title: {
    marginLeft: 5,
    fontSize: 14,
    fontFamily: "WorkSans",
    fontWeight: "bold",
  },

  overlay: {
    width: width / 3 - 20,
    height: width /3,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -117,
    backgroundColor: 'gainsboro',
    opacity: 0.7
  }
});

export default MessageInterfaceCard;