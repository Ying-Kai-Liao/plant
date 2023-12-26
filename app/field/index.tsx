import { StyleSheet, TouchableOpacity , Dimensions} from "react-native";
import { ImageBackground } from "react-native";

import { Text, View } from "../../components/Themed";
import StartButton from "../../components/ui/StartButton";
import CustomCarousel from "../../components/ui/Carousel";
import SelectionButton from "../../components/ui/SelectionButton";

import BackIcon from "../../assets/images/icon/back.svg";
import field_bg from "../../assets/images/field_selection_bg.png";
import { Link } from "expo-router";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
console.log(viewportWidth, viewportHeight);

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Q1</Text>
        <View style={styles.separator}></View>
        <Text>1/4</Text>
      </View>
      {/* <StartButton onPress={() => {}} /> */}
      <View style={styles.selection_box}>
        <CustomCarousel/>
        <SelectionButton label="選擇想要的種植空間"/>
      </View>
      <Link href={"/field_selection"} style={styles.backButton} asChild>
        <TouchableOpacity>
          <BackIcon width={40} height={40} />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgba(240,241,247,255)",
  },
  selection_box: {
    flex: 0.75,
    alignItems: "center",
    width: viewportWidth * 0.9,
    backgroundColor: "#fff",
    borderRadius: 40,
  },
  header: {
    flex: 0.2,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    transform: [{ scaleY: 0.8 }],
  },
  separator: {
    marginTop: -5,
    height: 2,
    width: 50,
    marginVertical: 5,
    backgroundColor: 'black'

  },
  context: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 5,
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 80, // Distance from the top, adjust according to your status bar/Notch
    left: 30, // Distance from the left
    alignItems: "center", // Vertically center
    backgroundColor: "transparent", // No background color
    zIndex: 10, // Ensure it's above other components
  },
});
