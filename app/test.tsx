import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

interface CarouselDataItem {
  title: string;
  // Add additional properties for your carousel items here
}

interface CarouselItemProps {
  item: CarouselDataItem;
  index: number;
}

const { width: viewportWidth } = Dimensions.get('window');

const CarouselItem: React.FC<CarouselItemProps> = ({ item }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      {/* You can add an image or any content you want to display here */}
    </View>
  );
};

const carouselItems: CarouselDataItem[] = [
  { title: 'Item 1' },
  { title: 'Item 2' },
  { title: 'Item 3' },
  // Add other items here
];

const MyCarousel: React.FC = () => {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const renderCarouselItem = ({ item, index }: { item: CarouselDataItem; index: number }) => (
    <CarouselItem item={item} index={index} />
  );

  return (
    <View>
      <Carousel
        data={carouselItems}
        renderItem={renderCarouselItem}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth * 0.75}
        onSnapToItem={(index) => setActiveSlide(index)}
        vertical={false}
      />
      <Pagination
        dotsLength={carouselItems.length}
        activeDotIndex={activeSlide}
        // Style the pagination here
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: viewportWidth * 0.75,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // Add shadow or other styling as needed
  },
  title: {
    // Style for the title or content within the carousel item
  },
  // Add other styles as needed
});

export default MyCarousel;
