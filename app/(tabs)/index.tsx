import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { ImageBackground, Image, Switch } from "react-native";
import { useEffect, useState } from "react";
import { Link } from "expo-router";

import { Text, View } from "../../components/Themed";
import PlantButton from "../../components/ui_home/PlantButton";

import BackIcon from "../../assets/images/icon/back.svg";
import MoreIcon from "../../assets/images/home/more.svg";
import WaterIcon from "../../assets/images/icon/water.svg";
import FertilizeIcon from "../../assets/images/icon/fertilize.svg";
import DateIcon from "../../assets/images/icon/date.svg";
import TimeIcon from "../../assets/images/icon/time.svg";
import homeBg from "../../assets/images/home/home_bg.png";
import detailBg from "../../assets/images/home/detail_bg.png";
import addImage from "../../assets/images/home/add.png";
import { ImageUriHome } from "../../constants/ImageUri";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

type PlantData = {
  type: number;
  date: string;
  name: string;
};

export default function Home() {
  const [openMyPlant, setOpenMyPlant] = useState(false);
  const [detailData, setDetailData] = useState<PlantData>(); // detail page data
  const [detailView, setDetailView] = useState(false); // detail page open
  const [tool, setTool] = useState(false);
  const [data, setData] = useState<PlantData[]>([]); // data format still need modify
  const [isEnabled, setIsEnabled] = useState(false);
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
      { type: 1, date: "2023/11/02", name: "欣欣" },
      { type: 4, date: "2023/11/03", name: "欣欣" },
      { type: 3, date: "2023/11/04", name: "欣欣" },
    ]);
  }, []);

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
                心業蔓綠絨
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
                source={{
                  uri: ImageUriHome[
                    detailData.type as keyof typeof ImageUriHome
                  ],
                }}
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
                  ImageUriHome[value.type as keyof typeof ImageUriHome]; // type assertions
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
                        2023/11/02{/* data.time */}
                      </Text>
                      <Image
                        source={{ uri }}
                        resizeMode="contain"
                        style={{
                          width: (viewportWidth * 80) / 393,
                          height: (viewportWidth * 80) / 393,
                        }}
                      />
                      <Text style={{ fontSize: 12, marginTop: 5 }}>
                        佛手虎尾蘭{/* data.name */}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
            {/* Add Button , still need implement function (Modal component) */}
            <Image
              source={addImage}
              resizeMode="contain"
              style={{
                position: "absolute",
                width: 120,
                height: 120,
                right: viewportWidth * 0.01,
                bottom: viewportHeight * 0.03
              }}
            />
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
            <BackIcon width={40} height={40} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <ImageBackground source={homeBg} style={styles.container_outer}>
      <PlantButton
        onPress={() => {
          setOpenMyPlant(!openMyPlant);
        }}
        style={styles.start_button}
      />
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
    backgroundColor: "rgb(242, 241, 248)",
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
  backButton: {
    position: "absolute",
    top: 80, // Distance from the top, adjust according to your status bar/Notch
    left: viewportWidth * 0.05, // Distance from the left
    alignItems: "center", // Vertically center
    backgroundColor: "transparent", // No background color
    zIndex: 10, // Ensure it's above other components
  },
});
