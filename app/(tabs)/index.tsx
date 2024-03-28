import {
  Dimensions,
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ImageBackground, Image, Switch } from "react-native";
import { useEffect, useState } from "react";
import Lottie, { AnimationObject } from "lottie-react-native";

import { Text, View } from "../../components/Themed";
import PlantButton from "../../components/ui_home/PlantButton";
import CustomCarousel from "../../components/ui/CharacterCarousel";

import BackIcon from "../../assets/images/icon/back.svg";
import MoreIcon from "../../assets/images/home/more.svg";
import WaterIcon from "../../assets/images/icon/water.svg";
import FertilizeIcon from "../../assets/images/icon/fertilize.svg";
import DateIcon from "../../assets/images/icon/date.svg";
import TimeIcon from "../../assets/images/icon/time.svg";
import AddIcon from "../../assets/images/home/add.svg"

import homeBg from "../../assets/images/home/home_bg.png";
import detailBg from "../../assets/images/home/detail_bg.png";
import addImage from "../../assets/images/home/add.png";
// import lottie from "../../assets/lotties/characters/1/joy.json";

import { plantImage, plantType } from "../../constants/ImageUri";

// Character 1
import joy1 from "../../assets/lotties/characters/1/joy.json";
import mad1 from "../../assets/lotties/characters/1/mad.json";
import normal1 from "../../assets/lotties/characters/1/normal.json";
import sad1 from "../../assets/lotties/characters/1/sad.json";
import unwater1 from "../../assets/lotties/characters/1/unwater.json";
import watered1 from "../../assets/lotties/characters/1/watered.json";

// Character 2
import joy2 from "../../assets/lotties/characters/2/joy.json";
import mad2 from "../../assets/lotties/characters/2/mad.json";
import normal2 from "../../assets/lotties/characters/2/normal.json";
import sad2 from "../../assets/lotties/characters/2/sad.json";
import unwater2 from "../../assets/lotties/characters/2/unwater.json";
import watered2 from "../../assets/lotties/characters/2/watered.json";

// Character 3
import joy3 from "../../assets/lotties/characters/3/joy.json";
import mad3 from "../../assets/lotties/characters/3/mad.json";
import normal3 from "../../assets/lotties/characters/3/normal.json";
import sad3 from "../../assets/lotties/characters/3/sad.json";
import unwater3 from "../../assets/lotties/characters/3/unwater.json";
import watered3 from "../../assets/lotties/characters/3/watered.json";

// Character 4
import joy4 from "../../assets/lotties/characters/4/joy.json";
import mad4 from "../../assets/lotties/characters/4/mad.json";
import normal4 from "../../assets/lotties/characters/4/normal.json";
import sad4 from "../../assets/lotties/characters/4/sad.json";
import unwater4 from "../../assets/lotties/characters/4/unwater.json";
import watered4 from "../../assets/lotties/characters/4/watered.json";

// Character 5
import joy5 from "../../assets/lotties/characters/5/joy.json";
import mad5 from "../../assets/lotties/characters/5/mad.json";
import normal5 from "../../assets/lotties/characters/5/normal.json";
import sad5 from "../../assets/lotties/characters/5/sad.json";
import unwater5 from "../../assets/lotties/characters/5/unwater.json";
import watered5 from "../../assets/lotties/characters/5/watered.json";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

type PlantData = {
  type: number;
  date: string;
  name: string;
};

type LottieAnimation = {
  [key: string]: any; // A generic object to represent the Lottie JSON
};

type LottieExpressions = {
  joy: LottieAnimation;
  mad: LottieAnimation;
  normal: LottieAnimation;
  sad: LottieAnimation;
  unwater: LottieAnimation;
  watered: LottieAnimation;
};

export default function Home() {
  const [chooseCharacter, setChooseCharacter] = useState<boolean>();
  const [openMyPlant, setOpenMyPlant] = useState(false);
  const [detailData, setDetailData] = useState<Plant>(); // detail page data
  const [detailView, setDetailView] = useState(false); // detail page open
  const [tool, setTool] = useState(false);
  const [data, setData] = useState<Plant[]>([]); // data format still need modify
  const [isEnabled, setIsEnabled] = useState(false);
  const [character, setCharacter] = useState(0);
  const [currentExpression, setCurrentExpression] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [lottie, setLottie] = useState<LottieAnimation>();
  const [lotties, setLotties] = useState<LottieExpressions>();

  const onSlideChange = (location: string, index: number) => {
    console.log(index)
    setCharacter(index+1);
  };

  function getCharacterLotties(characterId: number): LottieExpressions {
    switch (characterId) {
      case 1:
        return {
          joy: joy1,
          mad: mad1,
          normal: normal1,
          sad: sad1,
          unwater: unwater1,
          watered: watered1,
        };
      case 5:
        return {
          joy: joy2,
          mad: mad2,
          normal: normal2,
          sad: sad2,
          unwater: unwater2,
          watered: watered2,
        };
      case 2:
        return {
          joy: joy3,
          mad: mad3,
          normal: normal3,
          sad: sad3,
          unwater: unwater3,
          watered: watered3,
        };
      case 3:
        return {
          joy: joy4,
          mad: mad4,
          normal: normal5,
          sad: sad4,
          unwater: unwater4,
          watered: watered4,
        };
      case 4:
        return {
          joy: joy5,
          mad: mad5,
          normal: normal5,
          sad: sad5,
          unwater: unwater5,
          watered: watered5,
        };
      default:
        return {
          joy: joy1,
          mad: mad1,
          normal: normal1,
          sad: sad1,
          unwater: unwater1,
          watered: watered1,
        }; // or some default set of animations
    }
  }

  const getRandomExpression = (): string | undefined => {
    if (lotties) {
      const excludedKeys: (keyof LottieExpressions)[] = [
        "watered",
        "unwater",
        "normal",
        currentExpression as keyof LottieExpressions,
      ];
      const filteredKeys = Object.keys(lotties).filter(
        (key) => !excludedKeys.includes(key as keyof LottieExpressions)
      ) as Array<keyof LottieExpressions>;

      if (filteredKeys.length === 0) {
        return "normal"; // or some default animation if you prefer
      }

      const randomKey =
        filteredKeys[Math.floor(Math.random() * filteredKeys.length)];
      return randomKey;
    }
  };

  const handleAnimationFinish = () => {
    if (currentExpression !== "normal" && !trigger) {
      setLottie(lotties?.normal);
      setCurrentExpression("normal");
    }
  };

  // useEffect(() => {
  //   // prefetch images
  //   const imagesToPrefetch = Object.values(ImageUriHome);
  //   imagesToPrefetch.forEach((image) => {
  //     Image.prefetch(image);
  //   });
  // }, []);

  useEffect(() => {
    // get user data

    setData([
      { type: 1, date: "2023/11/02", name: "欣欣", isWater: true, isFertilize: true },
      { type: 4, date: "2023/11/03", name: "綠綠", isWater: false, isFertilize: true  },
      { type: 3, date: "2023/11/04", name: "花花", isWater: true, isFertilize: false  },
    ]);

    setChooseCharacter(true);
  }, []);

  useEffect(() => {
    const characterLotties = getCharacterLotties(character);
    setLotties(characterLotties);
  }, [character]);

  useEffect(() => {
    setCurrentExpression("normal");
    setLottie(lotties?.normal);
  }, [lotties]);

  useEffect(() => {
    console.log(`Modal visibility changed: ${chooseCharacter}`);
  }, [chooseCharacter]);

  if (openMyPlant) {
    return (
      <View style={styles.container_inner}>
        {detailView && detailData ? (
          <ImageBackground source={detailBg} style={styles.container_detail}>
            <View
              style={{
                flex: 0.7,
                backgroundColor: "transparent",
                alignItems: "center",
                justifyContent: "flex-end",
                width: viewportWidth,
                height: viewportHeight,
              }}
            >
              <Text
                style={{
                  position: "absolute",
                  top: 90,
                  fontSize: 20,
                  fontWeight: "500",
                  left: viewportWidth * 0.05 + 45,
                }}
              >
                {detailData.name}
              </Text>
              <Text
                style={{
                  position: "absolute",
                  fontSize: 15,
                  fontWeight: "400",
                  color: "#4d4d4d",
                  top: 118,
                  left: viewportWidth * 0.05 + 45,
                }}
              >
                {plantType[detailData.type as keyof typeof plantType] as string}
              </Text>
              <Switch
                trackColor={{ false: "#727171", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() =>
                  setIsEnabled((previousState) => !previousState)
                }
                value={isEnabled}
                style={{
                  position: "absolute",
                  top: 80,
                  right: viewportWidth * 0.05,
                }}
              />
              <Image
                source={plantImage[detailData.type as keyof typeof plantImage] as unknown as ImageSourcePropType}
                resizeMode="contain"
                style={{
                  width: viewportWidth * 0.4,
                  height: viewportHeight * 0.4,
                }}
              />
              <Text style={{ fontSize: 18 }}>{detailData.date}</Text>
            </View>
            <View style={styles.selection_box_detail}>
              <View style={styles.itemBox_detail}>
                <View style={{ flexDirection: "row", marginLeft: -12 }}>
                  <WaterIcon
                    fill={"rgb(165, 182, 211)"}
                    width={45}
                    height={45}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 10.5,
                    fontWeight: "600",
                    color: "#625952",
                    marginLeft: 2,
                    marginVertical: 5,
                  }}
                >
                  Next Time
                </Text>
                <View>
                  <DateIcon fill={"#625952"} width={20} height={20} />
                </View>
                <View>
                  <TimeIcon fill={"#625952"} width={22} height={22} />
                </View>
              </View>
              <View style={styles.itemBox_detail}>
                <View style={{ flexDirection: "row", marginLeft: -12 }}>
                  <FertilizeIcon
                    fill={"rgb(148, 172, 142)"}
                    width={45}
                    height={45}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 10.5,
                    fontWeight: "600",
                    color: "#625952",
                    marginLeft: 2,
                    marginVertical: 5,
                  }}
                >
                  Next Time
                </Text>
                <View>
                  <DateIcon fill={"#625952"} width={20} height={20} />
                </View>
                <View>
                  <TimeIcon fill={"#625952"} width={22} height={22} />
                </View>
              </View>
            </View>
          </ImageBackground>
        ) : (
          // 我的植物總覽
          <View style={styles.selection_box}>
            {/* Header */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.title}>我的植物</Text>
              <TouchableOpacity
                style={styles.moreButton}
                onPress={() => setTool(!tool)}
              >
                <MoreIcon width={50} height={50} fill="#595656" />
              </TouchableOpacity>
              {tool && (
                <View style={styles.toolBox}>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "600",
                        color: "#000000",
                        margin: 5,
                      }}
                    >
                      編輯
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "600",
                        color: "#000000",
                        margin: 5,
                      }}
                    >
                      取消
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {/* Body */}
            <View style={styles.selection_box_body}>
              {data.map((value, i) => {
                const uri =
                  plantImage[value.type as keyof typeof plantImage]; // type assertions
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      setDetailData(data[i]);
                      setDetailView(true);
                    }}
                  >
                    <View style={styles.itemBox}>
                      <Text style={{ fontSize: 12, marginBottom: 5 }}>
                        {value.date}
                      </Text>
                      <Image
                        source={uri}
                        resizeMode="contain"
                        style={{
                          width: (viewportWidth * 80) / 393,
                          height: (viewportWidth * 80) / 393,
                        }}
                      />
                      <Text style={{ fontSize: 12, marginTop: 5 }}>
                        {value.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            {/* Add Button , still need implement function (Modal component) */}
            <AddIcon fill="rgb(90 195 217)"/>
          </View>
        )}
        <View style={styles.backButton}>
          <TouchableOpacity
            onPress={
              detailView
                ? () => setDetailView(!detailView)
                : () => setOpenMyPlant(!openMyPlant)
            }
          >
            <BackIcon width={40} height={40} fill="#5b5d5c"/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <ImageBackground source={homeBg} style={styles.container_outer}>
      {/* 選擇植物 */}
      <Modal animationType="fade" visible={chooseCharacter} >
        <View style={styles.deletemodalContainer}>
          <View
            style={{
              paddingHorizontal: 40,
              paddingVertical: 8,
              borderRadius: 20,
              marginTop: viewportHeight * 0.1,
              backgroundColor: "rgb(240, 248, 237)"
            }}
          >
            <Text style={{ fontSize: 18 }}>選擇你專屬的小精靈</Text>
          </View>
          <CustomCarousel onSlideChange={onSlideChange} />

          <View style={styles.modalView}>
            <Pressable
              onPress={() => {
                setChooseCharacter(false);
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600" }}>就是你了!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <PlantButton
        onPress={() => {
          setOpenMyPlant(!openMyPlant);
        }}
        style={styles.start_button}
      />
      {/* 選擇植物的案紐 */}
      {/* <PlantButton
        onPress={() => {
          setChooseCharacter(!chooseCharacter);
        }}
        style={styles.start_button2}
      /> */}
      <Pressable
        onPress={() => {
          if (!(currentExpression === ("normal" || "watered" || "unwater"))) {
            setTrigger(true);
          }
          const random = getRandomExpression() as keyof LottieExpressions;
          if (lotties) {
            setLottie(lotties[random]);
            setCurrentExpression(random);
          }
          console.log(random);
        }}
        style={styles.lottie}
      >
        {currentExpression === ("normal" || "watered" || "unwater") ? (
          <>
            <Lottie
              source={lottie as AnimationObject}
              autoPlay
              loop={currentExpression === ("normal" || "watered" || "unwater")}
            />
            {/* <Text>loop</Text> */}
          </>
        ) : (
          <Lottie
            source={lottie as AnimationObject}
            autoPlay
            loop={false}
            onAnimationFinish={
              trigger ? () => setTrigger(false) : handleAnimationFinish
            }
          />
        )}
      </Pressable>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container_outer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container_inner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(240, 248, 237)",
  },
  container_detail: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: viewportWidth,
    height: viewportHeight,
  },
  selection_box: {
    flex: 0.75,
    alignItems: "center",
    width: viewportWidth * 0.9,
    backgroundColor: "#fff",
    borderRadius: 40,
    marginTop: 20,
    marginBottom: -50,
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  selection_box_body: {
    alignItems: "center",
    justifyContent: "flex-start", // Align items to the start of the container
    flexDirection: "row", // Set direction of items to row
    flexWrap: "wrap", // Enable wrapping of items
    padding: 12,
  },
  selection_box_detail: {
    flex: 0.45,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    width: viewportWidth * 0.9,
    backgroundColor: "#fff",
    borderRadius: 30,
    marginTop: 20,
    marginBottom: -50,
    shadowColor: "#664d0d", // Shadow color
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 32,
  },
  moreButton: { position: "absolute", right: -120 },
  toolBox: {
    position: "absolute",
    right: -120,
    top: -20,
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 5,
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  itemBox: {
    alignItems: "center",
    justifyContent: "center",
    width: (viewportWidth * 0.9 - 72) / 2,
    height: (viewportWidth * 0.9 - 72) / 2,
    margin: 12,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 2, // Shadow to the left
      height: 3, // Shadow to the bottom
    },
    shadowOpacity: 0.1, // Opacity of shadow
    shadowRadius: 4, // Radius of shadow
    elevation: 5, // Elevation for Android (applies uniform shadow)
  },
  itemBox_detail: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: (viewportWidth * 0.9 - 72) / 2,
    height: viewportHeight * 0.3 - 96,
    marginHorizontal: 12,
    marginTop: 24,
    padding: 16,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 2, // Shadow to the left
      height: 3, // Shadow to the bottom
    },
    shadowOpacity: 0.1, // Opacity of shadow
    shadowRadius: 4, // Radius of shadow
    elevation: 5, // Elevation for Android (applies uniform shadow)
  },
  start_button: {
    position: "absolute",
    right: 50,
    bottom: 200,
  },
  start_button2: {
    position: "absolute",
    right: 50,
    bottom: 150,
  },
  backButton: {
    position: "absolute",
    top: 80, // Distance from the top, adjust according to your status bar/Notch
    left: viewportWidth * 0.05, // Distance from the left
    alignItems: "center", // Vertically center
    backgroundColor: "transparent", // No background color
    zIndex: 10, // Ensure it's above other components
  },
  lottie: {
    position: "absolute",
    zIndex: 1000,
    top: 200,
    width: viewportWidth * 0.9,
    height: viewportWidth,
    backgroundColor: "transparent",
  },
  deletemodalContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 1)",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  modalView: {
    position: "absolute",
    bottom: 100,
    zIndex: 20,
    paddingHorizontal: 22,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 2, // Shadow to the left
      height: 3, // Shadow to the bottom
    },
    shadowOpacity: 0.2, // Opacity of shadow
    shadowRadius: 4, // Radius of shadow
    elevation: 5, // Elevation for Android (applies uniform shadow)
  },
  modalTitle: {
    paddingHorizontal: 40,
    paddingVertical: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
  },
});
