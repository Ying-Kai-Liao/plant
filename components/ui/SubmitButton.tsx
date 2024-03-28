import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import Svg, { Polygon } from "react-native-svg";

interface SelectionButtonProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  label?: string;
  disable?: boolean;
  query?: string;
}

const SubmitButton = ({
  onPress,
  style,
  label,
  disable = false,
  query,
}: SelectionButtonProps) => {
  if (disable) {
    const combinedStyle = StyleSheet.flatten([styles.disableButton, style]);
    return (
      <View style={combinedStyle}>
        <Text style={styles.disableText}>{label}</Text>
        <Svg height="20" width="20" viewBox="0 0 24 24" style={styles.icon}>
          <Polygon points="6,9 12,15 18,9" fill="rgba(0, 0, 0, 0.38)" />
        </Svg>
      </View>
    );
  }
  if (query) {
    const combinedStyle = StyleSheet.flatten([styles.button, style]);
    return (
      <Link href={`/field/results?${query}`} asChild>
        <Pressable style={combinedStyle}>
          <Text style={styles.text}>{label}</Text>
          <Svg height="20" width="20" viewBox="0 0 24 24" style={styles.icon}>
            <Polygon points="6,9 12,15 18,9" fill="white" />
          </Svg>
        </Pressable>
      </Link>
    );
  }
  const combinedStyle = StyleSheet.flatten([styles.button, style]);
  return (
    <TouchableOpacity style={combinedStyle} onPress={onPress} ref={null}>
      <Text style={styles.text}>{label}</Text>
      <Svg height="20" width="20" viewBox="0 0 24 24" style={styles.icon}>
        <Polygon points="6,9 12,15 18,9" fill="white" />
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerBorder: {
    padding: 4, // This creates the space for the outer border
    borderRadius: 14, // This should be slightly larger than the button's borderRadius
    backgroundColor: "rgba(0, 0, 0, 0)", // The color of the outer border
    borderColor: "#fdf0e3",
    borderWidth: 1.5, // Set border width

    // Shadow effect here if you need it
  },
  button: {
    flexDirection: "row", // Arrange text and icon in a row
    backgroundColor: "rgb(90, 195, 217)", // Use the appropriate background color
    paddingLeft: 40, // Horizontal padding
    paddingRight: 30,
    paddingVertical: 10, // Vertical padding
    borderRadius: 20, // Adjust the border radius to match your design
    borderColor: "#ddd", // Set border color
    alignItems: "center", // Center the text inside the button
    justifyContent: "center", // Center the text inside the button
    shadowColor: "#000",
    shadowOffset: {
      width: -2, // Shadow to the left
      height: 4, // Shadow to the bottom
    },
    shadowOpacity: 0.1, // Opacity of shadow
    shadowRadius: 1, // Radius of shadow
    elevation: 5, // Elevation for Android (applies uniform shadow)
  },
  disableButton: {
    flexDirection: "row", // Arrange text and icon in a row
    backgroundColor: "#717171", // Use the appropriate background color
    paddingLeft: 40, // Horizontal padding
    paddingRight: 30,
    paddingVertical: 10, // Vertical padding
    borderRadius: 20, // Adjust the border radius to match your design
    borderColor: "#ddd", // Set border color
    alignItems: "center", // Center the text inside the button
    justifyContent: "center", // Center the text inside the button
    shadowColor: "#000",
    shadowOffset: {
      width: -2, // Shadow to the left
      height: 4, // Shadow to the bottom
    },
    shadowOpacity: 0.1, // Opacity of shadow
    shadowRadius: 1, // Radius of shadow
    elevation: 5,
  },
  text: {
    color: "#fff", // Text color
    fontWeight: "400", // Font weight
    fontSize: 15, // Font size
    letterSpacing: 1, // Adjust the letter spacing
  },
  disableText: {
    color: "rgba(0, 0, 0, 0.38)", // Text color
    fontWeight: "400", // Font weight
    fontSize: 15, // Font size
    letterSpacing: 1,
  },
  icon: {
    transform: [{ rotate: "-90deg" }],
  },
});

export default SubmitButton;
