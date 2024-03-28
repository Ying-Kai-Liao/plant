import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Lottie, { AnimationObject } from "lottie-react-native";

import classroom_png from "../../assets/images/bg3.png";
import bedroom_png from "../../assets/images/bg2.png";
import livingroom_png from "../../assets/images/bg1.png";
import office_png from "../../assets/images/bg5.png";
import restaurant_png from "../../assets/images/bg4.png";

import classroomLottie from "../../assets/lotties/scene/classroom.json";
import livingroomLottie from "../../assets/lotties/scene/livingroom.json";
import bedroomLottie from "../../assets/lotties/scene/bedroom.json";
import officeLottie from "../../assets/lotties/scene/office.json";
import restaurantLottie from "../../assets/lotties/scene/restaurant.json";

import normal1 from "../../assets/lotties/characters/1/normal.json";
import normal2 from "../../assets/lotties/characters/2/normal.json";
import normal3 from "../../assets/lotties/characters/3/normal.json";
import normal4 from "../../assets/lotties/characters/4/normal.json";
import normal5 from "../../assets/lotties/characters/5/normal.json";

interface CarouselDataItem {
  title: string;
  name: string;
  src: ImageSourcePropType;
  lottieSrc: AnimationObject;
  large?: boolean;
  content1?: string;
  content2?: string;
}

interface CarouselItemProps {
  item: CarouselDataItem;
  index: number;
}

interface DotProp {
  active: boolean;
  index: number;
}

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

const CarouselItem: React.FC<CarouselItemProps> = ({ item }) => {
  return (
    <ImageBackground source={item.src} style={styles.item}>
      <View
        style={item.large ? [styles.lottie, { width: 400 }] : styles.lottie}
      >
        <Lottie source={item.lottieSrc} autoPlay loop />
      </View>
    </ImageBackground>
  );
};

export const carouselItems: CarouselDataItem[] = [
  {
    title: "百變小精靈",
    name: "虎尾蘭",
    src: livingroom_png,
    lottieSrc: normal1,
    content1: "增加種植室內植物時的變化性 \n多變的型態豐富你的每一天",
    content2:
      "討厭一成不變的你\n可愛、簡約氣質的風格都難不倒你\n讓多種樣貌的虎尾蘭豐富你的室內空間!",
  },
  {
    title: "俏皮小精靈",
    name: "蘆薈",
    src: bedroom_png,
    lottieSrc: normal3,
    content1: "幫助你在種植室內植物時提升趣味 \n帶來朝氣和有精神的氛圍",
    content2:
      "活力源源不絕的你\n擁有頑強的生命力\n讓你的室內空間充滿活力",
  },
  {
    title: "活力小精靈",
    name: "龍血樹 ",
    src: classroom_png,
    lottieSrc: normal2,
    large: true,
    content1: "姿態優雅富有時尚感 \n獨特大方的造型為室內空間增添美感",
    content2:
      "擁有自己獨特創意的你\n生命力頑強且長壽，造型特別\n且富有提升運氣的含意",
  },
  {
    title: "療癒小精靈",
    name: "龜背芋",
    src: restaurant_png,
    lottieSrc: normal5,
    large: true,
    content1: "具有引領潮流的吸引力 \n讓空間更加活潑和充滿熱帶氣息",
    content2:
      "室內植物愛好者必備\n圓潤又討喜的造型療癒你的每一天\n生命力強，新手也能輕鬆上手",
  },
  {
    title: "幸運小精靈",
    name: "銀葉虎斑木",
    src: office_png,
    lottieSrc: normal2,
    large: true,
    content1: "一年四季都保持活力的生機 \n提升風水的秘密武器",
    content2:
      "想要擁有好運氣的你\n在風水學上能帶來吉祥與富貴\n有節節高升的寓意",
  },
];

interface CustomCarouselProps {
  onSlideChange?: (location: string, index: number) => void;
}

const CustomCarousel: React.FC<CustomCarouselProps> = React.memo(
  ({ onSlideChange }) => {
    const [activeSlide, setActiveSlide] = React.useState(0);
    const renderCarouselItem = ({
      item,
      index,
    }: {
      item: CarouselDataItem;
      index: number;
    }) => <CarouselItem item={item} index={index} />;

    return (
      <View style={styles.container}>
        <View
          style={{
            marginTop: 20,
            backgroundColor: "transparent",
            transform: [{ translateX: -40 }],
            marginBottom: -30
          }}
        >
          <Text style={{ fontSize: 28, fontWeight: "600" }}>
            {carouselItems[activeSlide].title}
          </Text>
          <Text style={{ fontSize: 18, color: "#4d4d4d", marginTop: 10 }}>
            {carouselItems[activeSlide].name}
          </Text>
        </View>
        <Carousel
          data={carouselItems}
          renderItem={renderCarouselItem}
          sliderWidth={viewportWidth}
          itemWidth={350}
          onSnapToItem={(index) => {
            setActiveSlide(index);
            // passing selected location to parent
            if (onSlideChange) {
              onSlideChange(carouselItems[index].name, index);
            }
          }}
          vertical={undefined}
          inactiveSlideScale={0.8}
        />
        <View style={{ marginVertical: 10, backgroundColor: "transparent" }}>
          <Text style={{ fontWeight: "700", textAlign: 'center', lineHeight: 22 }}>
            {carouselItems[activeSlide].content1}
          </Text>
        </View>
        <View style={{ marginVertical: 10, backgroundColor: "transparent", marginBottom: 30 }}>
          <Text style={{ fontWeight: "400" , textAlign: 'center', lineHeight: 25}}>
            {carouselItems[activeSlide].content2}
          </Text>
        </View>
        <View
          style={{ position: "absolute", bottom: 80, width: 140, height: 200 }}
        >
          <Pagination
            dotsLength={carouselItems.length}
            activeDotIndex={activeSlide}
            containerStyle={{
              backgroundColor: "rgba(0, 0, 0, 0)",
              top: 330,
              position: "absolute",
            }}
            dotStyle={{}}
            dotColor="#a4b5d2"
            inactiveDotStyle={{
              borderWidth: 0,
              zIndex: 0,
            }}
            inactiveDotColor="#e1e2e2"
            inactiveDotScale={1}
            inactiveDotOpacity={1}
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  item: {
    height: 320,
    backgroundColor: "transparent", //可以省略
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    position: "absolute",
    top: 330,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
  container: {
    flex: 0.8,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  panagation: {
    backgroundColor: "transparent",
  },
  lottie: {
    width: viewportWidth * 0.7,
    height: viewportWidth * 0.7,
    backgroundColor: "transparent",
  },
});

export default CustomCarousel;
