import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

import BackIcon from "../../assets/images/icon/back.svg";

import DateSelector from "./DateSelector";

import globalStyles from "../../styles/styles";

type WeekDate = {
  dateNum: number; // Assuming you want to store just the date number (e.g., 1-31)
  date: string; // The full date (e.g., "2024-01-22")
  weekDayShort: string; // The weekday name (e.g., "Mon")
  monthYear: string; // The full weekday name (e.g., "Monday")
};

interface WeekViewCalendarProps {
  dateString?: string; // The date string to start the week from (e.g., "2024-01-22")
  selectedDate: string;
  onDateSelected: (date: string) => void;
}

const WeekViewCalendar: React.FC<WeekViewCalendarProps> = ({
  dateString = "",
  selectedDate = "",
  onDateSelected,
}: WeekViewCalendarProps) => {
  const [weekDates, setWeekDates] = useState<WeekDate[]>([]);
  const dateNow = new Date().toISOString().split("T")[0];

  if (dateString === "") {
    dateString = dateNow;
  }

  useEffect(() => {
    const processDate = new Date(dateString.replace(/\//g, "-")); // Ensure correct date format
    // Correct for time zone offset to avoid date shifting
    const offset = processDate.getTimezoneOffset();
    processDate.setMinutes(processDate.getMinutes() - offset);
    // Adjust to the previous Sunday
    processDate.setDate(processDate.getDate() - processDate.getDay());
    const dates = Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(processDate);
      date.setDate(processDate.getDate() + i);
      // console.log(date.toLocaleDateString("en-US", {month:'long', year: "numeric" }).split(",")[0]);
      return {
        date: date.toISOString().split("T")[0], // Format as YYYY-MM-DD
        dateNum: Number(date.getDate()),
        weekDayShort: date.toLocaleDateString("en-US", { weekday: "short" }).split(",")[0],
        monthYear: date.toLocaleDateString("en-US", {month:'long', year: "numeric" }).split(",")[0].replace(" ", " | "),
      };
    }, []);

    setWeekDates(dates);
  }, [dateString]);

  // useEffect(() => {
  //   console.log("Selected date:", selectedDate);
  //   // console.log("Week dates:", weekDates)
  // }, [selectedDate]);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginRight: 40,
        }}
      >
        <Text
          style={[
            {
              fontSize: 17,
              fontWeight: "600",
              color: "rgb(255, 255, 255)",
              marginLeft: 40,
            },
            { color: "rgba(0, 0, 0, 0.7)", fontSize: 19 },
            globalStyles.medium,
          ]}
        >
          我的植物日誌
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={[
              {
                color: "rgba(0, 0, 0, 0.7)",
                fontSize: 13,
                letterSpacing: 1.4,
              },
              globalStyles.medium,
            ]}
          >
            {weekDates[0] && weekDates[0].monthYear}
          </Text>
          <BackIcon
            fill={"rgba(0, 0, 0, 0.7)"}
            style={{
              width: 15,
              height: 15,
              transform: [{ rotate: "270deg" }],
            }}
          />
        </View>
      </View>
      <View style={{ marginVertical: 20 }}>
        <View style={styles.weekContainer}>
          {weekDates.map((dateInfo, index) => (
            <View key={index} style={styles.dateSelectorContainer}>
              <DateSelector
                date={dateInfo.dateNum}
                weekday={dateInfo.weekDayShort}
                Selected={selectedDate === dateInfo.date}
                onPress={() => onDateSelected(dateInfo.date)}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weekContainer: {
    flexDirection: "row", // Align children in a row
    justifyContent: "space-between", // Space out children evenly
    alignItems: "center", // Center children vertically
    marginHorizontal: 35,
  },
  dateSelectorContainer: {
    // Add some margin around each DateSelector for spacing
    // Additional styling can go here (e.g., padding, backgroundColor)
  },
});

export default WeekViewCalendar;
