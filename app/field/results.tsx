import { StyleSheet, ImageBackground, Dimensions, Image } from "react-native"; // origin
import Lottie from "lottie-react-native"; // additional
import { useLocalSearchParams, router } from "expo-router";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import SubmitButton from "../../components/ui/SubmitButton";

import homeBg from "../../assets/images/home/home_bg.png";
import lottie from "../../assets/lotties/work.json";

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

const resultsTable: ResultsType = {
  livingroom_large_long_fashion: "白鶴芋",
  livingroom_large_long_neat: "橡皮樹",
  livingroom_large_long_elegent: "龍血樹",
  livingroom_large_short_fashion: "心葉蔓綠絨",
  livingroom_large_short_neat: "吊籃",
  livingroom_large_short_elegent: "佛手虎尾蘭",
  livingroom_medium_long_fashion: "袖珍椰子",
  livingroom_medium_long_neat: "黃金葛",
  livingroom_medium_long_elegent: "銀葉虎斑木",
  livingroom_medium_short_fashion: "黃椰子",
  livingroom_medium_short_neat: "鐵線蕨",
  livingroom_medium_short_elegent: "蘆薈",
  livingroom_small_long_fashion: "黃金虎尾蘭",
  livingroom_small_long_neat: "心葉蔓綠絨",
  livingroom_small_long_elegent: "吊籃",
  livingroom_small_short_fashion: "龜背芋",
  livingroom_small_short_neat: "常春藤",
  livingroom_small_short_elegent: "袖珍椰子",

  bedroom_large_long_fashion: "蘆薈",
  bedroom_large_long_neat: "鐵線蕨",
  bedroom_large_long_elegent: "佛手虎尾蘭",
  bedroom_large_short_fashion: "黃椰子",
  bedroom_large_short_neat: "常春藤",
  bedroom_large_short_elegent: "袖珍椰子",
  bedroom_medium_long_fashion: "龜背芋",
  bedroom_medium_long_neat: "心葉蔓綠絨",
  bedroom_medium_long_elegent: "銀葉虎斑木",
  bedroom_medium_short_fashion: "黃金虎尾蘭",
  bedroom_medium_short_neat: "吊籃",
  bedroom_medium_short_elegent: "龍血樹",
  bedroom_small_long_fashion: "心葉蔓綠絨",
  bedroom_small_long_neat: "吊籃",
  bedroom_small_long_elegent: "袖珍椰子",
  bedroom_small_short_fashion: "鐵線蕨",
  bedroom_small_short_neat: "常春藤",
  bedroom_small_short_elegent: "佛手虎尾蘭",

  classroom_large_long_fashion: "心葉蔓綠絨",
  classroom_large_long_neat: "吊籃",
  classroom_large_long_elegent: "佛手虎尾蘭",
  classroom_large_short_fashion: "黃椰子",
  classroom_large_short_neat: "鐵線蕨",
  classroom_large_short_elegent: "蘆薈",
  classroom_medium_long_fashion: "黃金虎尾蘭",
  classroom_medium_long_neat: "心葉蔓綠絨",
  classroom_medium_long_elegent: "銀葉虎斑木",
  classroom_medium_short_fashion: "黃金虎尾蘭",
  classroom_medium_short_neat: "心葉蔓綠絨",
  classroom_medium_short_elegent: "袖珍椰子",
  classroom_small_long_fashion: "黃金虎尾蘭",
  classroom_small_long_neat: "心葉蔓綠絨",
  classroom_small_long_elegent: "吊籃",
  classroom_small_short_fashion: "龜背芋",
  classroom_small_short_neat: "常春藤",
  classroom_small_short_elegent: "袖珍椰子",

  restaurant_large_long_fashion: "橡皮樹",
  restaurant_large_long_neat: "龍血樹",
  restaurant_large_long_elegent: "佛手虎尾蘭",
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
  office_large_long_elegent: "佛手虎尾蘭",
  office_large_short_fashion: "橡皮樹",
  office_large_short_neat: "龍血樹",
  office_large_short_elegent: "吊籃",
  office_medium_long_fashion: "心葉蔓綠絨",
  office_medium_long_neat: "龍血樹",
  office_medium_long_elegent: "佛手虎尾蘭",
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

const resultsImage: ResultsType = {
  吊籃: "https://cdn.discordapp.com/attachments/1191771159168028695/1194046917227851892/f62d22a27ded6fde.jpg?ex=65aeedd9&is=659c78d9&hm=c056bc4db89213c242e0c6b3d8634d5f31fdf2c40698beb3f0c84038d2c47d1a&",
  常春藤:
    "https://cdn.discordapp.com/attachments/1191771159168028695/1194046917714387074/f240ad595775396f.jpg?ex=65aeedd9&is=659c78d9&hm=9b0a90bc7480641310d2dc33b5079d3d543c58d37730d7aada46b37159f90c9e&",
  心葉蔓綠絨:
    "https://cdn.discordapp.com/attachments/1191771159168028695/1194046918192541776/cd3523c0cb44250c.jpg?ex=65aeedd9&is=659c78d9&hm=dc98ac0da13a95a2f683cf643013b46dbf6a480b824b1c947f0ebe9fb58819be&",
  橡皮樹:
    "https://cdn.discordapp.com/attachments/1191771159168028695/1194046918721020045/5d8acc2622c9dc7e.jpg?ex=65aeedd9&is=659c78d9&hm=ca9fd740fb67ee51c5c93047dfbdd4ecc30a0b9cd0d237d41a6634b3fb211faf&",
  白鶴芋:
    "https://cdn.discordapp.com/attachments/1191771159168028695/1194046919413084301/210ada5342cf19e0.jpg?ex=65aeedd9&is=659c78d9&hm=4d63ec476310a5b821252cc62b3670872cec6eb7387d7c88d2ec637c2fc249a7&",
  蘆薈: "https://cdn.discordapp.com/attachments/1191771159168028695/1194046919908007946/17a81eebddb94100.jpg?ex=65aeedda&is=659c78da&hm=273af516e0b7d0a2c0d5c0b75d150568790d10010c2cf6cc75591ed5858bc262&",
  虎尾蘭:
    "https://cdn.discordapp.com/attachments/1191771159168028695/1194046920562327613/2ff460f7c7141bc5.jpg?ex=65aeedda&is=659c78da&hm=38b5e2c628a14d3e4bed55238a8161fa804b1819a8ae370aa44315bbf02fab53&",
  袖珍椰子:
    "https://cdn.discordapp.com/attachments/1191771159168028695/1194046921011110030/a5d8944763f0688e.jpg?ex=65aeedda&is=659c78da&hm=87f618f92c964753b7e426c3ae41257ef4e64cf4ee0b42d28e0623bb179ef89e&",
  銀葉虎斑木:
    "https://cdn.discordapp.com/attachments/1191771159168028695/1194046921468297326/3e18c22549ffb5c0.jpg?ex=65aeedda&is=659c78da&hm=8f9a02e3b1f7ef52be00d7c9cb75d3f700296cc6c999aac3cd82e764989555ef&",
  鐵線蕨:
    "https://cdn.discordapp.com/attachments/1191771159168028695/1194046922017747054/ba6a30d9eb33a6ae.jpg?ex=65aeedda&is=659c78da&hm=e67f38553064f7955db567b90d78626ba0c8b65a62dd523bee7fb79cd441c105&",
  黃椰子:
    "https://cdn.discordapp.com/attachments/1191771159168028695/1194046929512976394/759dc2638a9aede4.jpg?ex=65aeeddc&is=659c78dc&hm=27fc35119152f03e567cfaf8708d29bb04b3ff3759b0de3a4b2b0ee384251d16&",
  黃金葛:
    "https://cdn.discordapp.com/attachments/1191771159168028695/1194046929898844210/69eebb41297c42b3.jpg?ex=65aeeddc&is=659c78dc&hm=f4974d1b27b1a21ed147b3716e34d6a11947a942433274f43f3afabb9a228632&",
  龍血樹:
    "https://cdn.discordapp.com/attachments/1191771159168028695/1194046930385379439/7aae40eb577cb0a4.jpg?ex=65aeeddc&is=659c78dc&hm=c3fb57cc6196afd5efb147a2612b20c1f409480f1f9c783168b2c5f17de90ce5&",
  龜背芋:
    "https://cdn.discordapp.com/attachments/1191771159168028695/1194046930876125314/6d7b03ad0c4b99af.jpg?ex=65aeeddc&is=659c78dc&hm=dde9b334339898d2d0c688187539a0bae55f7756ac2785861c21a72aedf7c24c&",
};

const getResult = ({
  style,
  location,
  size,
  time,
}: SearchResultParams): string => {
  const key = `${style}_${location}_${size}_${time}`;
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
        <Image source={{uri: resultsImage[result]}} resizeMode="contain" style={{width: width, height: width* 1.8}} />
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
