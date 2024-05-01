import { Dimensions, StyleSheet } from 'react-native';
import { ImageBackground } from 'react-native';
import Lottie, { AnimationObject } from "lottie-react-native";

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import StartButton from '../../components/ui/StartButton';

import field_bg from '../../assets/images/field_selection_bg.png'
import normal1 from "../../assets/lotties/characters/1/normal.json";
import normal2 from "../../assets/lotties/characters/2/normal.json";
import normal3 from "../../assets/lotties/characters/3/normal.json";
import normal4 from "../../assets/lotties/characters/4/normal.json";
import normal5 from "../../assets/lotties/characters/5/normal.json";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

export default function FieldSelection() {
  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', width: 180, height: 180, bottom: 130, left: 30}}>
        <Lottie source={normal1} autoPlay loop/>
      </View>
      <View style={{position: 'absolute', width: 150, height: 150, top: 200, left: 0}}>
        <Lottie source={normal5} autoPlay loop/>
      </View>
      <View style={{position: 'absolute', width: 150, height: 150, top: 130, right: 0}}>
        <Lottie source={normal3} autoPlay loop/>
      </View>
      <View style={{position: 'absolute', width: 150, height: 150, bottom: 230, right: 20}}>
        <Lottie source={normal2} autoPlay loop/>
      </View>
      <Text style={styles.title}>！尋找小夥伴！</Text>
      <Text style={styles.context}>你的場域需要誰來陪伴呢？</Text>
      <StartButton/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: field_bg,
    width: viewportWidth,
    height: viewportHeight,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  context: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 5,
    marginBottom: 20,
  },
});