import { useState } from "react";
import { View, Text, Dimensions, StyleSheet, Pressable } from "react-native";
import globalStyles from "../../styles/styles";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

interface DateSelectorProps {
  date: number;
  weekday: string;
  Selected? : boolean;
  onPress?: () => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ date, weekday, Selected = false, onPress=()=>{} }: DateSelectorProps) => {
  return (
    <Pressable onPress={() => {onPress()}} style={[styles.container, Selected && styles.selectedContainer]}>
      <View style={[styles.content, Selected && styles.selectedContent]}>
        <Text style={[styles.dateText, Selected && styles.selectedText]}>{date}</Text>
      </View>
      <View style={styles.content}>
        <Text style={[styles.weekdayText, globalStyles.medium, Selected && styles.selectedText]}>{weekday}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 14,
    width: (viewportWidth - 120) / 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedContainer: {
    borderWidth: 0,
    backgroundColor: 'rgb(177, 215, 191)', // Example selected background color
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    width: '100%',
    aspectRatio: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  selectedContent: {
    backgroundColor: 'rgb(97, 188, 139)', 
    borderRadius: 14,
  },
  dateText: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 16,
    marginTop: 5,
    fontWeight: '500',
  },
  weekdayText: {
    marginTop: -10,
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 11,
    fontWeight: '600',
  },
  selectedText: {
    color: '#FFFFFF', // Example selected text color
  },
});

export default DateSelector;


