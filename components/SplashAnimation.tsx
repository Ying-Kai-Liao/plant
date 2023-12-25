import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { View } from "./Themed";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import videoSrc from "../assets/videos/splash.mp4";

//remember to run  '' npx pod-install '' when first time running

type SplashAnimationProps = {
  children?: React.ReactNode;
};

type AVPlaybackStatusEx = AVPlaybackStatus & {
  isPlaying?: boolean;
};

export default function SplashAnimation({ children }: SplashAnimationProps) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState<AVPlaybackStatusEx | null>(null);

  React.useEffect(() => {
    console.log(status);
  }, [status]);

  // if (status?.isPlaying) {
  //   return <>{children}</>;
  // }

  return (
    <>
      <Video
        ref={video}
        // style={StyleSheet.absoluteFill}
        source={videoSrc}
        useNativeControls
        // shouldPlay
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={(update: AVPlaybackStatus) => setStatus(update)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
