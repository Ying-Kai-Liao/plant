import { format, addDays, startOfWeek } from "date-fns";
import { ImageSourcePropType } from "react-native";
import { SvgProps } from "react-native-svg";

import EmojiOut1 from "../assets/images/personal/emoji_outlined1.svg";
import EmojiOut2 from "../assets/images/personal/emoji_outlined2.svg";
import EmojiOut3 from "../assets/images/personal/emoji_outlined3.svg";
import EmojiOut4 from "../assets/images/personal/emoji_outlined4.svg";
import EmojiOut5 from "../assets/images/personal/emoji_outlined5.svg";
import EmojiOut6 from "../assets/images/personal/emoji_outlined6.svg";
import EmojiOut7 from "../assets/images/personal/emoji_outlined7.svg";
import EmojiOut8 from "../assets/images/personal/emoji_outlined8.svg";
import EmojiOut9 from "../assets/images/personal/emoji_outlined9.svg";
import EmojiOut10 from "../assets/images/personal/emoji_outlined10.svg";
import EmojiOut11 from "../assets/images/personal/emoji_outlined11.svg";
import EmojiOut12 from "../assets/images/personal/emoji_outlined12.svg";

import Emoji1 from "../assets/images/personal/emoji1.svg";
import Emoji2 from "../assets/images/personal/emoji2.svg";
import Emoji3 from "../assets/images/personal/emoji3.svg";
import Emoji4 from "../assets/images/personal/emoji4.svg";

import demo1 from "../assets/images/personal/demo1.png";
import demo2 from "../assets/images/personal/demo2.png";
import demo3 from "../assets/images/personal/demo3.png";
import demo4 from "../assets/images/personal/demo4.png";

type PostData = {
    id: number;
    date: string;
    time: string;
    uri: ImageSourcePropType;
    emoji: React.FC<SvgProps>;
    title?: string;
    content: string;
  };

const generateTime = (): string => {
  const hours = Math.floor(Math.random() * 24)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor(Math.random() * 60)
    .toString()
    .padStart(2, "0");
  return `${hours}:${minutes}`;
};

const generateRandomData = (): PostData[] => {
  const today = new Date();
  const nextSunday = startOfWeek(addDays(today, 0), { weekStartsOn: 0 });
  const uris = [demo1, demo2, demo3, demo4];
  const emojis = [
    Emoji1, Emoji2, Emoji3, Emoji4,
  ];
  const titles = [
    "花園日記",
    "我的植物日志",
    "綠手指的冒險",
    "植物筆記",
    "園藝發生的事",
    "植物雜誌",
    "都市叢林日誌",
  ];
  const contents = [
    "澆水並修剪了植物的過度生長。",
    "在草藥園中注意到了新的枝芽。",
    "收穫了完美的番茄！",
    "重新種了蕨類植物，它最近生長得很好。",
    "多肉植物看起来很茂盛，又添加了一些新的。",
    "做了一些園藝美化，花園看起来很棒。",
    "種下了新的種子，期待他們成长。",
    // "very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page very very long data set that would trying to influence the layout of the page",
  ];

  return Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(nextSunday, index);
    return {
      id: index + 1,
      date: format(date, "yyyy-MM-dd"),
      time: generateTime(),
      uri: uris[Math.floor(Math.random() * uris.length)],
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      title: titles[Math.floor(Math.random() * titles.length)],
      content: contents[Math.floor(Math.random() * contents.length)],
    };
  });
};
export default generateRandomData;
