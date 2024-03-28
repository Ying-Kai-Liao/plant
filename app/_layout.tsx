import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme, Dimensions, View, StyleSheet, Text } from "react-native";
import SplashComponent from "../components/splash/video";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");
  console.log("width: ", SCREEN_WIDTH, "height: ", SCREEN_HEIGHT);
  const BASE_WIDTH = 393;
  const BASE_HEIGHT = 852;
  const scaleWidth = SCREEN_WIDTH / BASE_WIDTH;
  const scaleHeight = SCREEN_HEIGHT / BASE_WIDTH;

  return (
      <SplashComponent>
        {/* <View style={{flex: 1, transform: [{ scale: scaleWidth }]}} collapsable={false}> */}
        {/* <View style={{flex: 1, aspectRatio: BASE_WIDTH/BASE_HEIGHT}} collapsable={false}> */}
        <View style={{flex: 1}} collapsable={false}>

          
        <ThemeProvider value={DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            <Stack.Screen name="field/index" options={{ headerShown: false }} />
            <Stack.Screen
              name="field/results"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="dairy" options={{ headerShown: false }} />
          </Stack>
        </ThemeProvider></View>

      </SplashComponent>
  );
}
//bg r242 g241 b248
const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    transform: [{ scale: 1 }],
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  // Add styles for other components that might need individual scaling
});