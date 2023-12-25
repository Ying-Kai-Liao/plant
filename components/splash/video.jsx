import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import * as React from "react";
import { StyleSheet, Button } from "react-native";
import { Video, ResizeMode } from "expo-av";
import videoSrc from "../../assets/videos/splash.mp4";

export default function SplashComponent({ children }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [play, setPlay] = React.useState();
  React.useEffect(() => {
    // console.log(status);
    if (status.isPlaying && play != "finish") {
      setPlay("playing");
    }
    if (play == "playing" && !status.isPlaying) {
      setPlay("finish");
    }
  }, [status]);
  console.log(play);
  if (play == "finish") {
    return <>{children}</>;
  }
  return (
    <>
      {status.didJustFinish ? (
        <>{children}</>
      ) : (
        <Video
          ref={video}
          style={StyleSheet.absoluteFill}
          source={videoSrc}
          shouldPlay
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
