import { StyleSheet, ImageBackground, Dimensions } from 'react-native'; // origin
import Lottie from "lottie-react-native"; // additional

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import PlantButton from '../../components/ui_home/PlantButton';

import homeBg from '../../assets/images/home/home_bg.png'
import lottie from "../../assets/lotties/work.json";


const { width, height } = Dimensions.get("window");

type HomeData= {
  character: number
}

const defaultData: HomeData = {
  character: 1
}

export default function Home() {
  return (
    <ImageBackground source={homeBg} style={styles.container}>
      <View style={styles.lottie}>
        <Lottie source={lottie} autoPlay loop />
      </View>
      <PlantButton/>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: homeBg
  },
  lottie: {
    position: "absolute",
    zIndex: 1000,
    top: 200,
    width: width * 0.9,
    height: width,
  },
});
