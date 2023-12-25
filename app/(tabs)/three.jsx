import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import * as React from 'react';
import { StyleSheet, Button } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import videoSrc from "../../assets/videos/splash.mp4";

export default function App() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  React.useEffect(()=>{
    console.log(status)
  }, [status])
  return (
    <>
    <View >
      <Video
        ref={video}
        style={styles.video}
        source={videoSrc}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
        <Text>{status.isPlaying ? 'Pause' : 'Play'}</Text>
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
