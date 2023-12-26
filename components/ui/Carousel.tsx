import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ImageSourcePropType } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

import classroom_png from "../../assets/images/field_scene/classroom.png";
import bedroom_png from "../../assets/images/field_scene/bedroom.png";
import livingroom_png from "../../assets/images/field_scene/livingroom.png";
import office_png from "../../assets/images/field_scene/office.png";
import restaurant_png from "../../assets/images/field_scene/restaurant.png";

interface CarouselDataItem {
  title: string;
  src: ImageSourcePropType;
}

interface CarouselItemProps {
  item: CarouselDataItem;
  index: number;
}

interface renderDot {
  active: boolean, 
  index: number;
}

const { width: viewportWidth } = Dimensions.get("window");

const CarouselItem: React.FC<CarouselItemProps> = ({ item }) => {
  return (
    <View style={styles.item}>
      <Image source={item.src} resizeMode="contain" style={{ width: 260, height: 260 }}/>
    </View>
  );
};

const DotProp = ({ active, index }: renderDot) => {
  return (
    <View >

      {/* custom dot*/}
    </View>
  )
}

const carouselItems: CarouselDataItem[] = [
  { title: "classroom", src: classroom_png },
  { title: "bedroom", src: bedroom_png },
  { title: "livingroom", src: livingroom_png },
  { title: "office", src: office_png },
  { title: "restaurant", src: restaurant_png },
];

const CustomCarousel: React.FC = () => {
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
        itemWidth={viewportWidth * 0.75}
        onSnapToItem={(index) => setActiveSlide(index)}
        vertical={undefined}
      />
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeSlide}
        dotColor="#a4b5d2"
        inactiveDotColor="#e1e2e2"
      />
      <Text>{carouselItems[activeSlide].title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: 260,
    height: 260,
    backgroundColor: "#fefefe",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgb(30 64 175)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 22,
    elevation: 5, // Elevation for Android (applies uniform shadow)
    marginTop: 50,
    marginLeft: 20,
  },
  title: {
    // Style for the title or content within the carousel item
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
  container: {
    flex: 0.7,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  panagation: {
    backgroundColor: "transparent",
  },
});

export default CustomCarousel;
