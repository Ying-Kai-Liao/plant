import { Dimensions, StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import React from "react";
import Lottie from "lottie-react-native";
import lottie from "../../assets/lotties/work.json";

const { width, height } = Dimensions.get("window");

export default function HandBook() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Handbook</Text>
      <View style={styles.lottie}>
        <Lottie source={lottie} autoPlay loop />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignContent: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  lottie: {
    position: "absolute",
    zIndex: 10,
    top: 200,
    width: width * 0.9,
    height: width,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
