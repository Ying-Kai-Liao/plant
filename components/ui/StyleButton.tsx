import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Animated,
} from "react-native";

interface SelectionButtonProps {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  label?: string;
  selected?: boolean;
}

const SizeButton = ({ onPress, style, label, selected = false }: SelectionButtonProps) => {
    // Use Animated.Value for animating the background color
    const backgroundColorAnim = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
      // Animate the background color when the selected state changes
      Animated.timing(backgroundColorAnim, {
        toValue: selected ? 1 : 0,
        duration: 200, // Animation duration in milliseconds
        useNativeDriver: false, // 'useNativeDriver' must be false for animating colors
      }).start();
    }, [selected, backgroundColorAnim]);
  
    // Interpolate the background color value
    const backgroundColor = backgroundColorAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgb(233, 246, 250)', 'rgb(90, 195, 217)'], // Unselected color to selected color
    });
  
    // Combine the animated style with the passed style
    const combinedStyle = [
      styles.button,
      style,
      { backgroundColor }, // Apply the animated background color
    ];
  
    return (
      <Animated.View style={combinedStyle}>
        <TouchableOpacity onPress={onPress}>
          <Text style={selected ? styles.disableText : styles.text}>{label}</Text>
        </TouchableOpacity>
      </Animated.View>
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
    width: 220, // Horizontal padding
    paddingVertical: 5,
    borderRadius: 30, // Adjust the border radius to match your design
    borderColor: "#ddd", // Set border color
    alignItems: "center", // Center the text inside the button
    justifyContent: "center", // Center the text inside the button
    marginTop: 15,
  },
  selectedButton: {
    flexDirection: "row", // Arrange text and icon in a row
    backgroundColor: "#727171", // Use the appropriate background color
    width: 60,
    borderRadius: 30,
    borderColor: "#ddd", // Set border color
    alignItems: "center", // Center the text inside the button
    justifyContent: "center", // Center the text inside the button
    marginHorizontal: 15,
  },
  text: {
    color: "#7a797a", // Text color
    fontWeight: "400", // Font weight
    fontSize: 18, // Font size
    letterSpacing: 1, // Adjust the letter spacing
  },
  disableText: {
    color: "#fdfdfe", // Text color
    fontWeight: "400", // Font weight
    fontSize: 18, // Font size
    letterSpacing: 1,
  },
  icon: {
    transform: [{ rotate: "-90deg" }],
  },
});

export default SizeButton;
