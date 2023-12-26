import { StyleSheet } from 'react-native';
import { ImageBackground } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import StartButton from '../../components/ui/StartButton';

import field_bg from '../../assets/images/field_selection_bg.png'

export default function FieldSelection() {
  return (
    <ImageBackground source={field_bg} style={styles.container}>
      <Text style={styles.title}>！尋找小夥伴！</Text>
      <Text style={styles.context}>你的場域需要誰來陪伴呢？</Text>
      <StartButton/>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: field_bg
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
