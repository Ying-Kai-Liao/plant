import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Lottie, { AnimationObject } from "lottie-react-native";

import classroom_png from "../../assets/images/field_scene/classroom.png";
import bedroom_png from "../../assets/images/field_scene/bedroom.png";
import livingroom_png from "../../assets/images/field_scene/livingroom.png";
import office_png from "../../assets/images/field_scene/office.png";
import restaurant_png from "../../assets/images/field_scene/restaurant.png";

import classroomLottie from "../../assets/lotties/scene/classroom.json";
import livingroomLottie from "../../assets/lotties/scene/場域動畫客廳.json";
import bedroomLottie from "../../assets/lotties/scene/bedroom.json";
import officeLottie from "../../assets/lotties/scene/office.json";
import restaurantLottie from "../../assets/lotties/scene/restaurant.json";

interface CarouselDataItem {
  title: string;
  name: string;
  src: ImageSourcePropType;
  lottieSrc: AnimationObject;
  large?: boolean;
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
    <View style={styles.item}>
      <View style={item.large? [styles.lottie, {width: 260}] : styles.lottie}>
        <Lottie source={item.lottieSrc} autoPlay loop />
      </View>
    </View>
  );
};

export const carouselItems: CarouselDataItem[] = [
  // { title: "客廳",name: 'livingroom',src: livingroom_png, lottieSrc: livingroomLottie },
  { title: "臥室",name: 'bedroom', src: bedroom_png, lottieSrc: bedroomLottie },
  { title: "教室",name: 'classroom', src: classroom_png, lottieSrc: classroomLottie, large: true },
  { title: "餐廳",name: 'restaurant', src: restaurant_png, lottieSrc: restaurantLottie, large: true },
  { title: "辦公室",name: 'office', src: office_png, lottieSrc: officeLottie, large: true },
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
        <Carousel
          data={carouselItems}
          renderItem={renderCarouselItem}
          sliderWidth={viewportWidth}
          itemWidth={260}
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
        <Text style={styles.title}>{carouselItems[activeSlide].title}</Text>
        <Pagination
          dotsLength={carouselItems.length}
          activeDotIndex={activeSlide}
          containerStyle={{
            backgroundColor: "rgba(0, 0, 0, 0)",
            top: 330,
            position: "absolute",
          }}
          dotStyle={{
            width: 23,
            height: 8,
            borderRadius: 5,
            marginHorizontal: -15,
            zIndex: 10,
          }}
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
    );
  }
);

const styles = StyleSheet.create({
  item: {
    height: 260,
    backgroundColor: "#fefefe", //可以省略
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgb(30 64 175)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 22,
    elevation: 5, // Elevation for Android (applies uniform shadow)
    marginTop: 40,
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
    flex: 0.73,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -30,
  },
  panagation: {
    backgroundColor: "transparent",
  },
  lottie: {
    width: viewportWidth * 1.5,
    height: viewportWidth * 1.5,
    backgroundColor: "transparent",
  },
});

export default CustomCarousel;
