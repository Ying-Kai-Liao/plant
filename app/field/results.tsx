import { StyleSheet, ImageBackground, Dimensions, Image, ImageSourcePropType } from "react-native"; // origin
import Lottie from "lottie-react-native"; // additional
import { useLocalSearchParams, router } from "expo-router";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import SubmitButton from "../../components/ui/SubmitButton";

import homeBg from "../../assets/images/home/home_bg.png";
import lottie from "../../assets/lotties/work.json";

import plant1 from "../../assets/images/field_results/rgb/_吊蘭.png"
import plant2 from "../../assets/images/field_results/rgb/_常春藤.png"
import plant3 from "../../assets/images/field_results/rgb/_心葉蔓綠絨.png"
import plant4 from "../../assets/images/field_results/rgb/_橡皮樹.png"
import plant5 from "../../assets/images/field_results/rgb/_白鶴芋.png"
import plant6 from "../../assets/images/field_results/rgb/_蘆薈.png"
import plant7 from "../../assets/images/field_results/rgb/_虎尾蘭.png"
import plant8 from "../../assets/images/field_results/rgb/_袖珍椰子.png"
import plant9 from "../../assets/images/field_results/rgb/_銀葉虎斑木.png"
import plant10 from "../../assets/images/field_results/rgb/_鐵線蕨.png"
import plant11 from "../../assets/images/field_results/rgb/_黃椰子.png"
import plant12 from "../../assets/images/field_results/rgb/_黃金葛.png"
import plant13 from "../../assets/images/field_results/rgb/_龍血樹.png"
import plant14 from "../../assets/images/field_results/rgb/_龜背芋.png"


const { width, height } = Dimensions.get("window");

interface SearchResultParams {
  style?: string;
  location?: string;
  size?: string;
  time?: string;
}

type ResultsType = {
  [key: string]: string;
};

type Data = {
  [key: string]: ImageSourcePropType;
}

const resultsTable: ResultsType = {
  livingroom_large_long_fashion: "白鶴芋",
  livingroom_large_long_neat: "橡皮樹",
  livingroom_large_long_elegent: "龍血樹",
  livingroom_large_short_fashion: "心葉蔓綠絨",
  livingroom_large_short_neat: "吊籃",
  livingroom_large_short_elegent: "虎尾蘭",
  livingroom_medium_long_fashion: "袖珍椰子",
  livingroom_medium_long_neat: "黃金葛",
  livingroom_medium_long_elegent: "銀葉虎斑木",
  livingroom_medium_short_fashion: "黃椰子",
  livingroom_medium_short_neat: "鐵線蕨",
  livingroom_medium_short_elegent: "蘆薈",
  livingroom_small_long_fashion: "虎尾蘭",
  livingroom_small_long_neat: "心葉蔓綠絨",
  livingroom_small_long_elegent: "吊籃",
  livingroom_small_short_fashion: "龜背芋",
  livingroom_small_short_neat: "常春藤",
  livingroom_small_short_elegent: "袖珍椰子",

  bedroom_large_long_fashion: "蘆薈",
  bedroom_large_long_neat: "鐵線蕨",
  bedroom_large_long_elegent: "虎尾蘭",
  bedroom_large_short_fashion: "黃椰子",
  bedroom_large_short_neat: "常春藤",
  bedroom_large_short_elegent: "袖珍椰子",
  bedroom_medium_long_fashion: "龜背芋",
  bedroom_medium_long_neat: "心葉蔓綠絨",
  bedroom_medium_long_elegent: "銀葉虎斑木",
  bedroom_medium_short_fashion: "虎尾蘭",
  bedroom_medium_short_neat: "吊籃",
  bedroom_medium_short_elegent: "龍血樹",
  bedroom_small_long_fashion: "心葉蔓綠絨",
  bedroom_small_long_neat: "吊籃",
  bedroom_small_long_elegent: "袖珍椰子",
  bedroom_small_short_fashion: "鐵線蕨",
  bedroom_small_short_neat: "常春藤",
  bedroom_small_short_elegent: "虎尾蘭",

  classroom_large_long_fashion: "心葉蔓綠絨",
  classroom_large_long_neat: "吊籃",
  classroom_large_long_elegent: "虎尾蘭",
  classroom_large_short_fashion: "黃椰子",
  classroom_large_short_neat: "鐵線蕨",
  classroom_large_short_elegent: "蘆薈",
  classroom_medium_long_fashion: "虎尾蘭",
  classroom_medium_long_neat: "心葉蔓綠絨",
  classroom_medium_long_elegent: "銀葉虎斑木",
  classroom_medium_short_fashion: "虎尾蘭",
  classroom_medium_short_neat: "心葉蔓綠絨",
  classroom_medium_short_elegent: "袖珍椰子",
  classroom_small_long_fashion: "虎尾蘭",
  classroom_small_long_neat: "心葉蔓綠絨",
  classroom_small_long_elegent: "吊籃",
  classroom_small_short_fashion: "龜背芋",
  classroom_small_short_neat: "常春藤",
  classroom_small_short_elegent: "袖珍椰子",

  restaurant_large_long_fashion: "橡皮樹",
  restaurant_large_long_neat: "龍血樹",
  restaurant_large_long_elegent: "虎尾蘭",
  restaurant_large_short_fashion: "橡皮樹",
  restaurant_large_short_neat: "龍血樹",
  restaurant_large_short_elegent: "黃椰子",
  restaurant_medium_long_fashion: "橡皮樹",
  restaurant_medium_long_neat: "龍血樹",
  restaurant_medium_long_elegent: "心葉蔓綠絨",
  restaurant_medium_short_fashion: "橡皮樹",
  restaurant_medium_short_neat: "龍血樹",
  restaurant_medium_short_elegent: "吊籃",
  restaurant_small_long_fashion: "橡皮樹",
  restaurant_small_long_neat: "龍血樹",
  restaurant_small_long_elegent: "心葉蔓綠絨",
  restaurant_small_short_fashion: "橡皮樹",
  restaurant_small_short_neat: "龍血樹",
  restaurant_small_short_elegent: "袖珍椰子",

  office_large_long_fashion: "橡皮樹",
  office_large_long_neat: "龍血樹",
  office_large_long_elegent: "虎尾蘭",
  office_large_short_fashion: "橡皮樹",
  office_large_short_neat: "龍血樹",
  office_large_short_elegent: "吊籃",
  office_medium_long_fashion: "心葉蔓綠絨",
  office_medium_long_neat: "龍血樹",
  office_medium_long_elegent: "虎尾蘭",
  office_medium_short_fashion: "橡皮樹",
  office_medium_short_neat: "龍血樹",
  office_medium_short_elegent: "吊籃",
  office_small_long_fashion: "心葉蔓綠絨",
  office_small_long_neat: "龍血樹",
  office_small_long_elegent: "心葉蔓綠絨",
  office_small_short_fashion: "橡皮樹",
  office_small_short_neat: "龍血樹",
  office_small_short_elegent: "袖珍椰子",
};

const resultsData: Data = {
  吊籃: plant1,
  常春藤: plant2,
  心葉蔓綠絨: plant3,
  橡皮樹: plant4,
  白鶴芋: plant5,
  蘆薈: plant6,
  虎尾蘭: plant7,
  袖珍椰子: plant8,
  銀葉虎斑木: plant9,
  鐵線蕨: plant10,
  黃椰子: plant11,
  黃金葛: plant12,
  龍血樹: plant13,
  龜背芋: plant14,
};

const getResult = ({
  style,
  location,
  size,
  time,
}: SearchResultParams): string => {
  const key = `${location}_${size}_${time}_${style}`;
  console.log(key)
  console.log(resultsTable[key])
  return resultsTable[key] || "袖珍椰子"; // Fallback to a default result if no match is found
};

export default function ResultScreen() {
  const { style, location, size, time } = useLocalSearchParams<{
    style?: string;
    location?: string;
    size?: string;
    time?: string;
  }>();

  const result = getResult({style, size, location, time})
  return (
      <View style={styles.container}>
        {/* <Text>Style: {style}</Text>
        <Text>Location: {location}</Text>
        <Text>Time: {time}</Text>
        <Text>Size: {size}</Text>
        <Text>Result: {getResult({style, size, location, time})}</Text> */}
        <Image source={resultsData[result]} resizeMode="contain" style={{width: width, height: width* 1.8}} />
        <SubmitButton label="回主頁" onPress={() => router.push('/')}></SubmitButton>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    width: width * 0.5,
    height: width * 0.5,
  },
});
