import { useEffect, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { ImageBackground, Image } from "react-native";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "expo-router";
import axios from "axios";
import Lottie from "lottie-react-native";

import { Text, View } from "../../components/Themed";
import CustomCarousel, { carouselItems } from "../../components/ui/Carousel";
import SelectionButton from "../../components/ui/SelectionButton";
import SubmitButton from "../../components/ui/SubmitButton";
import SizeButton from "../../components/ui/SizeButton";
import StyleButton from "../../components/ui/StyleButton";

import ImageUri from "../../constants/ImageUri";
import BackIcon from "../../assets/images/icon/back.svg";
import field_bg from "../../assets/images/field_selection_bg.png";
import sizePlantLarge from "../../assets/images/field_items/plant_large.png";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");
// console.log(viewportWidth, viewportHeight);

enum STEPS {
  LOCATION = 0,
  SIZE = 1,
  TIME = 2,
  STYLE = 3,
}

type sizeSelection = {
  large?: boolean;
  medium?: boolean;
  small?: boolean;
};

type timeSelection = {
  long?: boolean;
  short?: boolean;
};

type styleSelection = {
  fashion?: boolean;
  neat?: boolean;
  elegent?: boolean;
};

export default function TabTwoScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(STEPS.LOCATION);
  const [sizeSelect, setSizeSelect] = useState<sizeSelection>({
    large: false,
    medium: false,
    small: false,
  });
  const [timeSelect, setTimeSelect] = useState<timeSelection>({
    long: false,
    short: false,
  });
  const [styleSelect, setStyleSelect] = useState<styleSelection>({
    fashion: false,
    neat: false,
    elegent: false,
  });

  useEffect(() => {
    const imagesToPrefetch = Object.values(ImageUri);
    imagesToPrefetch.forEach((image) => {
      Image.prefetch(image);
    });
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      location: "",
      size: "",
      time: "",
      style: "",
    },
  });

  const location = watch("location");
  const size = watch("size");
  const time = watch("time");
  const style = watch("style");

  const queryString = `style=${encodeURIComponent(
    style
  )}&location=${encodeURIComponent(location)}&time=${encodeURIComponent(
    time
  )}&size=${encodeURIComponent(size)}`;

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleSizeSelect = (value: string, Unpress = false) => {
    if (Unpress) {
      setSizeSelect({ large: false, medium: false, small: false });
      setCustomValue("size", "");
      return;
    }
    setSizeSelect((prevState) => ({
      large: value === "large",
      medium: value === "medium",
      small: value === "small",
    }));
    setCustomValue("size", value);
  };

  const handleTimeSelect = (value: string, Unpress = false) => {
    if (Unpress) {
      setTimeSelect({ long: false, short: false });
      setCustomValue("time", "");
      return;
    }
    setTimeSelect((prevState) => ({
      long: value === "long",
      short: value === "short",
    }));
    setCustomValue("time", value);
  };

  const handleStyleSelect = (value: string, Unpress = false) => {
    if (Unpress) {
      setStyleSelect({ fashion: false, neat: false, elegent: false });
      setCustomValue("style", "");
      return;
    }
    setStyleSelect((prevState) => ({
      fashion: value === "fashion",
      neat: value === "neat",
      elegent: value === "elegent",
    }));
    setCustomValue("style", value);
  };

  const onSlideChange = (location: string, index: number) => {
    setCustomValue("location", location);
    setIndex(index);
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step == STEPS.SIZE && location == "") {
      setCustomValue("location", 'livingroom');
    }
    if (step !== STEPS.STYLE) {
      return onNext();
    }

    setIsLoading(true);
    // mock loading
    const intervalId = setInterval(() => {
      // Stop the interval after a certain time
      clearInterval(intervalId);
      reset();

      // Turn off the loading state
      setIsLoading(false);
    }, 3000);

    // axios.post('/api/listings', data)
    // .then(() => {
    //   reset();
    //   setStep(STEPS.LOCATION)
    // })
    // .catch(() => {
    // })
    // .finally(() => {
    //   setIsLoading(false);
    // })
  };

  const bodyContent = useMemo(() => {
    switch (step) {
      case STEPS.LOCATION:
        return (
          // JSX for LOCATION step
          <>
            <View style={styles.header}>
              <Image
                source={{ uri: ImageUri.q1 }}
                resizeMode="contain"
                style={{
                  width: 130,
                  height: 130,
                  marginTop: 50,
                }}
              />
            </View>
            {/* <StartButton onPress={() => {}} /> */}
            <View style={styles.selection_box}>
              <CustomCarousel onSlideChange={onSlideChange} />
              <SelectionButton label="選擇想要的種植空間" />
              <SubmitButton
                label="下一頁"
                style={styles.submitButton1}
                onPress={handleSubmit(onSubmit)}
                disable={isLoading}
              />
            </View>
          </>
        );
      case STEPS.SIZE:
        return (
          <>
            <View style={styles.header}>
              <Image
                source={{ uri: ImageUri.q2 }}
                resizeMode="contain"
                style={{
                  width: 130,
                  height: 130,
                  marginTop: 50,
                }}
              />
            </View>
            {/* <StartButton onPress={() => {}} /> */}
            <View style={styles.selection_box}>
              <Image
                source={carouselItems[index].src}
                resizeMode="contain"
                style={{
                  width: 360,
                  height: 360,
                  marginTop: 0,
                  marginBottom: -20,
                }}
              />
              {sizeSelect.large && (
                <Image
                  source={sizePlantLarge}
                  resizeMode="contain"
                  style={{
                    position: "absolute",
                    width: 100,
                    height: 100,
                    top: 166,
                    left: 26,
                  }}
                />
              )}
              <SelectionButton label="選擇想要的種植大小" />
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  marginTop: 32,
                }}
              >
                <SizeButton
                  label="大型"
                  onPress={() => handleSizeSelect("large")}
                  selected={sizeSelect.large}
                />
                <SizeButton
                  label="中型"
                  onPress={() => handleSizeSelect("medium")}
                  selected={sizeSelect.medium}
                />
                <SizeButton
                  label="小型"
                  onPress={() => handleSizeSelect("small")}
                  selected={sizeSelect.small}
                />
              </View>
              <SubmitButton
                label="下一頁"
                style={styles.submitButton1}
                onPress={handleSubmit(onSubmit)}
                disable={isLoading}
              />
            </View>
          </>
        );
      case STEPS.TIME:
        return (
          <>
            <View style={styles.header}>
              <Image
                source={{ uri: ImageUri.q3 }}
                resizeMode="contain"
                style={{
                  width: 130,
                  height: 130,
                  marginTop: 50,
                }}
              />
            </View>
            {/* <StartButton onPress={() => {}} /> */}
            <View style={styles.selection_box}>
              <Image
                source={carouselItems[index].src}
                resizeMode="contain"
                style={{
                  width: 360,
                  height: 360,
                  marginTop: 0,
                  marginBottom: -20,
                }}
              />
              {sizeSelect.large && (
                <Image
                  source={sizePlantLarge}
                  resizeMode="contain"
                  style={{
                    position: "absolute",
                    width: 100,
                    height: 100,
                    top: 166,
                    left: 26,
                  }}
                />
              )}
              {timeSelect.long && (
                <Image
                  source={{ uri: ImageUri.timeLong }}
                  resizeMode="contain"
                  style={{
                    position: "absolute",
                    width: 80,
                    height: 80,
                    top: 40,
                    right: 26,
                  }}
                />
              )}
              {timeSelect.short && (
                <Image
                  source={{ uri: ImageUri.timeShort }}
                  resizeMode="contain"
                  style={{
                    position: "absolute",
                    width: 80,
                    height: 80,
                    top: 40,
                    right: 26,
                  }}
                />
              )}
              <SelectionButton label="選擇照顧時間長短" />
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  marginTop: 32,
                }}
              >
                <SizeButton
                  label="長"
                  onPress={() => handleTimeSelect("long")}
                  selected={timeSelect.long}
                />
                <SizeButton
                  label="短"
                  onPress={() => handleTimeSelect("short")}
                  selected={timeSelect.short}
                />
              </View>
              <SubmitButton
                label="下一頁"
                style={styles.submitButton1}
                onPress={handleSubmit(onSubmit)}
                disable={isLoading}
              />
            </View>
          </>
        );
      // Q4
      case STEPS.STYLE:
        return (
          <>
            <View style={styles.header}>
              <Image
                source={{ uri: ImageUri.q4 }}
                resizeMode="contain"
                style={{
                  width: 130,
                  height: 130,
                  marginTop: 50,
                }}
              />
            </View>
            {/* <StartButton onPress={() => {}} /> */}
            <View style={styles.selection_box}>
              <Image
                source={carouselItems[index].src}
                resizeMode="contain"
                style={{
                  width: 360,
                  height: 360,
                  marginTop: 0,
                  marginBottom: -40,
                }}
              />
              {sizeSelect.large && (
                <Image
                  source={sizePlantLarge}
                  resizeMode="contain"
                  style={{
                    position: "absolute",
                    width: 100,
                    height: 100,
                    top: 166,
                    left: 26,
                  }}
                />
              )}
              {timeSelect.long && (
                <Image
                  source={{ uri: ImageUri.timeLong }}
                  resizeMode="contain"
                  style={{
                    position: "absolute",
                    width: 80,
                    height: 80,
                    top: 40,
                    right: 26,
                  }}
                />
              )}
              {timeSelect.short && (
                <Image
                  source={{ uri: ImageUri.timeShort }}
                  resizeMode="contain"
                  style={{
                    position: "absolute",
                    width: 80,
                    height: 80,
                    top: 40,
                    right: 26,
                  }}
                />
              )}
              <SelectionButton label="選擇照顧時間長短" />
              <View
                style={{
                  flexDirection: "column",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  marginTop: 10,
                }}
              >
                <StyleButton
                  label="簡約時尚"
                  onPress={() => handleStyleSelect("fashion")}
                  selected={styleSelect.fashion}
                />
                <StyleButton
                  label="帥氣俐落"
                  onPress={() => handleStyleSelect("neat")}
                  selected={styleSelect.neat}
                />
                <StyleButton
                  label="優雅有氣質"
                  onPress={() => handleStyleSelect("elegent")}
                  selected={styleSelect.elegent}
                />
              </View>
              <SubmitButton
                label="送出"
                style={styles.submitButton2}
                // onPress={handleSubmit(onSubmit)}
                disable={isLoading}
                query={queryString}
              />
            </View>
          </>
        );
      default:
        return (
          // Default JSX or null
          <Text>Default Content</Text>
        );
    }
  }, [step, isLoading, sizeSelect, timeSelect, styleSelect]);

  return (
    <View style={styles.container}>
      {bodyContent}
      <Link href={"/field_selection"} style={styles.backButton} asChild>
        <TouchableOpacity>
          <BackIcon width={40} height={40} />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgba(240,241,247,255)",
  },
  selection_box: {
    flex: 0.75,
    alignItems: "center",
    width: viewportWidth * 0.9,
    backgroundColor: "#fff",
    borderRadius: 40,
  },
  header: {
    flex: 0.2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    transform: [{ scaleY: 0.8 }],
  },
  separator: {
    marginTop: -5,
    height: 2,
    width: 50,
    marginVertical: 5,
    backgroundColor: "black",
  },
  context: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 5,
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 80, // Distance from the top, adjust according to your status bar/Notch
    left: 30, // Distance from the left
    alignItems: "center", // Vertically center
    backgroundColor: "transparent", // No background color
    zIndex: 10, // Ensure it's above other components
  },
  submitButton1: {
    position: "absolute",
    bottom: 70,
    alignItems: "center", // Vertically center
    zIndex: 10, // Ensure it's above other components
  },
  submitButton2: {
    position: "absolute",
    bottom: 40,
    alignItems: "center", // Vertically center
    zIndex: 10, // Ensure it's above other components
  },
});
