import { StyleSheet, ImageBackground } from 'react-native';
import LottieView from "lottie-react-native";

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import PlantButton from '../../components/ui_home/PlantButton';

import homeBg from '../../assets/images/home/home_bg.png'

type HomeData= {
  character: number
}

const defaultData: HomeData = {
  character: 1
}

export default function Home() {
  return (
    <ImageBackground source={homeBg} style={styles.container}>
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
});
