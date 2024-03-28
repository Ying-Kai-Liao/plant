import { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StyleProp,
  ImageStyle,
  ImageSourcePropType,
} from "react-native";
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

import BackIcon from "../../assets/images/icon/back.svg";

import sizePlantLarge from "../../assets/images/field_items/plant_large.png";
import sizePlantMedium from "../../assets/images/field_items/plant_medium.png";
import sizePlantMedium2 from "../../assets/images/field_items/plant_medium2.png";
import sizePlantSmall from "../../assets/images/field_items/plant_small.png";
import timeLong from "../../assets/images/field_items/time_long.png"
import timeShort from "../../assets/images/field_items/time_short.png"
import q1 from "../../assets/images/field_items/q1.png"
import q2 from "../../assets/images/field_items/q2.png"
import q3 from "../../assets/images/field_items/q3.png"
import q4 from "../../assets/images/field_items/q4.png"

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");
// console.log(viewportWidth, viewportHeight);

enum STEPS {
  LOCATION = 0,
  SIZE = 1,
  TIME = 2,
  STYLE = 3,
}

type SizeSelection = {
  large?: boolean;
  medium?: boolean;
  small?: boolean;
};

type TimeSelection = {
  long?: boolean;
  short?: boolean;
};

type StyleSelection = {
  fashion?: boolean;
  neat?: boolean;
  elegent?: boolean;
};

export default function TabTwoScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(STEPS.LOCATION);
  const [data, setData] = useState({});
  const [sizeSelect, setSizeSelect] = useState<SizeSelection>({
    large: false,
    medium: false,
    small: false,
  });
  const [timeSelect, setTimeSelect] = useState<TimeSelection>({
    long: false,
    short: false,
  });
  const [styleSelect, setStyleSelect] = useState<StyleSelection>({
    fashion: false,
    neat: false,
    elegent: false,
  });


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

  const isAnySizeSelected = (selection: SizeSelection): boolean => {
    return Object.values(selection).some((value) => value === true);
  };

  const getImageStyle = () => {
    
    return {
      ...styleConfig[size as Size][location as Location],
      position: "absolute",
    }; // Type assertion
  };

  const getCurrentImageSource = () => {
    if (sizeSelect.small) return sizePlantSmall;
    if (
      sizeSelect.medium &&
      (location == "bedroom" || location == "livingroom")
    )
      return sizePlantMedium;
    if (
      sizeSelect.medium &&
      (location == "classroom" ||
        location == "restaurant" ||
        location == "office")
    )
      return sizePlantMedium2;
    if (sizeSelect.large) return sizePlantLarge;
    
    console.log('no image')

    console.log(sizeSelect)
    console.log(location)
    return ; // No selection
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

  useEffect(() => {
    console.log("Updated location:", location);
    setData(location)
  }, [location]);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step == STEPS.LOCATION && data.location == "") {
      console.log('setted')
      setCustomValue("location", "livingroom");
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
                source={q1}
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
                source={q2}
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
              {isAnySizeSelected(sizeSelect) && (
                <Image
                  source={getCurrentImageSource()
                      ? getCurrentImageSource()
                      : undefined
                  }
                  resizeMode="contain"
                  style={getImageStyle() as StyleProp<ImageStyle>}
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
                source={q3}
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
              {isAnySizeSelected(sizeSelect) && (
                <Image
                  source={getCurrentImageSource()
                      ? getCurrentImageSource()
                      : undefined
                  }
                  resizeMode="contain"
                  style={getImageStyle() as StyleProp<ImageStyle>}
                />
              )}
              {timeSelect.long && (
                <Image
                  source={timeLong}
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
                  source={timeShort}
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
                source={q4}
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
              {isAnySizeSelected(sizeSelect) && (
                <Image
                  source={getCurrentImageSource()
                      ? getCurrentImageSource()
                      : undefined
                  }
                  resizeMode="contain"
                  style={getImageStyle() as StyleProp<ImageStyle>}
                />
              )}
              {timeSelect.long && (
                <Image
                  source={timeLong}
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
                  source={timeShort}
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

interface Style {
  width: number;
  height: number;
  top: number;
  left: number;
}

interface LocationStyles {
  [key: string]: Style; // Index signature
}

interface SizeStyles {
  small: LocationStyles;
  medium: LocationStyles;
  large: LocationStyles;
}

const styleConfig: SizeStyles = {
  small: {
    livingroom: { width: 34, height: 34, top: 116, left: 242 },
    bedroom: { width: 34, height: 34, top: 120, left: 236 },
    classroom: { width: 34, height: 34, top: 180, left: 166 },
    restaurant: { width: 34, height: 34, top: 183, left: 163 },
    office: { width: 34, height: 34, top: 110, left: 240 },
  },
  medium: {
    livingroom: { width: 85, height: 85, top: 166, left: 26 },
    bedroom: { width: 85, height: 85, top: 176, left: 31 },
    classroom: { width: 120, height: 120, top: 196, left: 220 },
    restaurant: { width: 90, height: 90, top: 210, left: 136 },
    office: { width: 85, height: 85, top: 166, left: 26 },
  },
  large: {
    livingroom: { width: 110, height: 110, top: 156, left: 26 },
    bedroom: { width: 110, height: 110, top: 188, left: 200 },
    classroom: { width: 130, height: 130, top: 176, left: 26 },
    restaurant: { width: 120, height: 120, top: 186, left: 118 },
    office: { width: 110, height: 110, top: 156, left: 26 },
  },
};

type Size = "small" | "medium" | "large";
type Location =
  | "livingroom"
  | "bedroom"
  | "classroom"
  | "restaurant"
  | "office";
