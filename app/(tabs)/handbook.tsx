import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import React from 'react';
import LottieView from "lottie-react-native";
import lottie from "../../assets/lotties/astronaut.json"

export default function HandBook() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Handbook</Text>
      {/* <LottieView source={lottie} autoPlay loop resizeMode="contain"/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgb(0, 0, 0)'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
