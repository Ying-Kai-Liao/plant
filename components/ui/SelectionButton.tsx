import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Link } from "expo-router";
import { View } from "../Themed";

interface SelectionButtonProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  label?: string
}

const SelectionButton = ({ onPress, style, label }: SelectionButtonProps) => {
  return (
      <Link href="/field" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
      </Link>
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
    backgroundColor: "#fff", // Use the appropriate background color
    paddingHorizontal: 28, // Horizontal padding
    paddingVertical: 10, // Vertical padding
    borderRadius: 10, // Adjust the border radius to match your design
    borderWidth: 1, // Set border width
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
  text: {
    color: "#333", // Text color
    fontWeight: "400", // Font weight
    fontSize: 20, // Font size
    letterSpacing: 1, // Adjust the letter spacing
  },
});

export default SelectionButton;
