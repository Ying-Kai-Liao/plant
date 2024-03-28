import {
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  ImageSourcePropType,
} from "react-native";

import { Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";

import { ImageUriPersonal } from "../../constants/ImageUri";
import PointIcon from "../../assets/images/icon/point.svg";
import DairyIcon from "../../assets/images/icon/dairy.svg";
import MoreIcon from "../../assets/images/home/more.svg";
import BackIcon from "../../assets/images/icon/back.svg";
import Emoji1 from "../../assets/images/personal/emoji1.svg"
import Emoji2 from "../../assets/images/personal/emoji2.svg"
import Emoji3 from "../../assets/images/personal/emoji3.svg"
import Emoji4 from "../../assets/images/personal/emoji4.svg"


import storeImage from "../../assets/images/personal/storeImage.png";
import camera from "../../assets/images/personal/camera.png";
import avatar from "../../assets/images/personal/avatar.png";
import item1 from "../../assets/images/personal/item1.png";
import item2 from "../../assets/images/personal/item2.png";
import item3 from "../../assets/images/personal/item3.png";
import item4 from "../../assets/images/personal/item4.png";
import item5 from "../../assets/images/personal/item5.png";
import emoji1 from "../../assets/images/personal/emoji1.png";
import emoji2 from "../../assets/images/personal/emoji2.png";
import emoji3 from "../../assets/images/personal/emoji3.png";
import emoji4 from "../../assets/images/personal/emoji4.png";
import demo1 from "../../assets/images/personal/demo1.png";
import demo2 from "../../assets/images/personal/demo2.png";
import demo3 from "../../assets/images/personal/demo3.png";
import demo4 from "../../assets/images/personal/demo4.png";
import { SvgProps } from "react-native-svg";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

type PostData = {
  id: number;
  date: string;
  uri: ImageSourcePropType;
  emoji: React.FC<SvgProps>;
  content: string;
};

type StoreData = {
  id: number;
  name: string;
  context: string;
  price: number;
  uri: ImageSourcePropType;
};

const storeData: StoreData[] = [
  {
    id: 1,
    name: "負離子陶瓷球",
    context: "美化盆景，防止土壤濺出 \n透氣性佳，幫助土壤保持濕度",
    price: 180,
    uri: item1,
  },
  {
    id: 2,
    name: "玉米石",
    context:
      "覆蓋盆土美化、裝飾、花盆底部鋪底 \n鋪面可減緩水分散失、減少雜草生長 ",
    price: 190,
    uri: item2,
  },
  {
    id: 3,
    name: "玫瑰石",
    context:
      "覆蓋盆土美化、裝飾、花盆底部鋪底 \n鋪面可減緩水分散失、減少雜草生長",
    price: 160,
    uri: item3,
  },
  {
    id: 4,
    name: "霓虹石",
    context:
      "覆蓋盆土美化、裝飾、花盆底部鋪底 \n鋪面可減緩水分散失、減少雜草生長",
    price: 250,
    uri: item4,
  },
  {
    id: 5,
    name: "益生源肥",
    context: "能给作物提供必需的營養元素外 \n還能吸附土壤中重金屬、致病物質",
    price: 290,
    uri: item5,
  },
];

export default function Personal() {
  const [openDiary, setopenDiary] = useState(false);
  const [openPoint, setopenPoint] = useState(false);
  const [deleteModal, setDeletemodal] = useState(false);
  const [deleteData, setDeleteData] = useState(0);
  const [data, setData] = useState<PostData[]>([]);

  useEffect(() => {
    setData([
      {
        id: 1,
        date: "2023/11/06",
        uri: demo1,
        emoji: Emoji1,
        content: "something content",
      },
      {
        id: 2,
        date: "2023/11/08",
        uri: demo2,
        emoji: Emoji2,
        content: "something content",
      },
      {
        id: 3,
        date: "2023/11/09",
        uri: demo3,
        emoji: Emoji3,
        content: "something content",
      },
      {
        id: 4,
        date: "2023/11/10",
        uri: demo4,
        emoji: Emoji4,
        content: "something content",
      },
      {
        id: 5,
        date: "2023/12/06",
        uri: demo1,
        emoji: Emoji2,
        content: "something content",
      },
      {
        id: 5,
        date: "2023/12/06",
        uri: demo2,
        emoji: Emoji1,
        content: "something content",
      },
    ]);
  }, []);

  const deletePost = (postId: number) => {
    const newData = data.filter((item) => item.id !== postId);
    setData(newData);
  };

  if (openDiary) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgb(0, 0, 0)",
        }}
      >
        <Text style={styles.title}>Diary</Text>
        <Pressable onPress={() => setopenDiary(!openDiary)}>
          <Text style={styles.title}>Go Back</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* Modal of delete Post */}
      <Modal animationType="fade" transparent visible={deleteModal}>
        <View style={styles.deletemodalContainer}>
          <View style={styles.modalView}>
            <Text>確定刪除？ 刪除就真的沒了喔</Text>
            <View
              style={{ flexDirection: "row", position: "absolute", bottom: 10 }}
            >
              <Pressable
                onPress={() => {
                  deletePost(deleteData);
                  setDeletemodal(!deleteModal);
                }}
                style={{ marginRight: 30 }}
              >
                <Text style={{ fontSize: 12 }}>刪吧</Text>
              </Pressable>
              <Pressable onPress={() => setDeletemodal(!deleteModal)}>
                <Text style={{ fontSize: 12, color: "rgba(0, 0, 0, 0.6)" }}>
                  再想想...
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal for store */}
      <Modal animationType="slide" transparent visible={openPoint}>
        <View style={styles.storeModalContainer}>
          <View style={styles.storeModalHeader}>
            <Pressable
              onPress={() => setopenPoint(!openPoint)}
              style={{ marginLeft: 30 }}
            >
              <BackIcon
                fill={"rgb(255, 255, 255)"}
                style={{ width: 30, height: 30 }}
              />
            </Pressable>
            <Text style={{ fontSize: 16, fontWeight: "400", color: "white" }}>
              我的點數
            </Text>
          </View>
          <View style={styles.storeModalBody}>
            <View
              style={{
                marginVertical: 24,
                paddingLeft: 20,
                height: viewportHeight * 0.2,
                width: viewportWidth - 60,
                borderRadius: 40,
                backgroundColor: "#ffffff",
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "600", marginTop: 15 }}>
                PEI_067
              </Text>
              <Text style={{ marginTop: 10 }}>你目前一共有</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <PointIcon fill={"#e2c672"} style={{ width: 30, height: 30 }} />
                <Text
                  style={{ marginLeft: 10, fontSize: 30, fontWeight: "600" }}
                >
                  40
                </Text>
              </View>
              <Image
                source={storeImage}
                resizeMode="contain"
                style={{
                  position: "absolute",
                  bottom: -14,
                  right: -30,
                  width: 180,
                  height: 180,
                }}
              />
            </View>
            <View style={styles.storeModalHeader2}>
              <Text style={{ fontSize: 20, fontWeight: "500",letterSpacing: 5 }}>兌換獎勵</Text>
            </View>
            <View style={styles.storeModalListView}>
              <ScrollView>
                {storeData.map((data, i) => (
                  <View key={i} style={styles.storeModalListItem}>
                    <Image
                      source={data.uri}
                      resizeMode="contain"
                      style={{
                        width: (viewportWidth * 0.9 - 72) / 2,
                        height: (viewportWidth * 0.9 - 72) / 2,
                      }} // Define 'styles.imageStyle' in your stylesheet
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ fontSize: 15, fontWeight: "500" }}>
                        {data.name}
                      </Text>
                      <Text
                        style={{ fontSize: 10, marginTop: 8, lineHeight: 18 }}
                      >
                        {data.context}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 10,
                        }}
                      >
                        <PointIcon
                          fill={"#e2c672"}
                          style={{ width: 25, height: 25 }}
                        />
                        <Text
                          style={{
                            marginLeft: 10,
                            fontSize: 18,
                            fontWeight: "600",
                          }}
                        >
                          {data.price}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal for Diary */}
      <Modal visible={false}></Modal>
      <View style={styles.header}>
        <Text style={styles.title}>PEI_067</Text>
      </View>
      <View style={styles.body}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            marginTop: 25,
            marginBottom: 25,
          }}
        >
          <View style={{ height: 90 }}>
            <Image
              source={avatar}
              resizeMode="contain"
              style={{ width: 90, height: 90 }}
            />
            <Image
              source={camera}
              resizeMode="contain"
              style={{
                position: "absolute",
                width: 30,
                height: 30,
                bottom: 0,
                right: 0,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => setopenDiary(!openDiary)}
          >
            <View style={{
                width: 85,
                height: 120,
                marginLeft: 25,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000", // Shadow color
                shadowOffset: {
                  width: 1, // Horizontal shadow offset
                  height: 1, // Vertical shadow offset
                },
                shadowOpacity: 0.25, // Shadow opacity
                shadowRadius: 2, // Shadow blur radius
                elevation: 5, // Elevation for Android
              }}>

            <DairyIcon fill={"rgba(0, 0, 0, 0.8)"} style={{ width: 40, height: 40 }} />
            <Text style={{ fontSize: 12, color: "rgba(0, 0, 0, 0.8)", marginTop: 9 }}>
              植物日誌
            </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setopenPoint(!openPoint)}
          >
            <View
              style={{
                width: 85,
                height: 120,
                marginLeft: 15,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#000", // Shadow color
                shadowOffset: {
                  width: 1, // Horizontal shadow offset
                  height: 1, // Vertical shadow offset
                },
                shadowOpacity: 0.25, // Shadow opacity
                shadowRadius: 2, // Shadow blur radius
                elevation: 5, // Elevation for Android
              }}
            >
              <PointIcon
                fill={"rgb(252, 200, 14)"}
                style={{ width: 32, height: 32 }}
              />
              <Text style={{ fontSize: 12, marginTop: 14 }}>我的點數</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.dairyHeader}>
          <Text style={styles.dairyTitle}>日誌總覽</Text>
        </View>
        <View style={{ height: viewportHeight * 0.9 - 300 }}>
          <ScrollView>
            <View style={styles.dairyBody}>
              {data.map((value, i) => {
                const Emoji = value.emoji
                return (
                  <View key={i}>
                    <TouchableOpacity
                      onPress={() => {
                        // setPostData(data[i]);
                        // setPostView(true);
                      }}
                    >
                      <Image
                        source={value.uri}
                        resizeMode="cover"
                        style={{
                          width: (viewportWidth - 72) / 2,
                          height: (viewportWidth - 72) / 2,
                          margin: 12,
                          borderRadius: 25
                        }}
                      />
                    </TouchableOpacity>
                    <Emoji style={{
                        width: 50,
                        height: 50,
                        position: "absolute",
                        top: 0,
                        left: -55,
                      }}/>
                    <TouchableOpacity
                      style={{ position: "absolute", top: 18, right: 24 }}
                      onPress={() => {
                        setDeletemodal(!deleteModal);
                        setDeleteData(value.id);
                      }}
                    >
                      <MoreIcon
                        fill={"#fff"}
                        style={{
                          width: 30,
                          height: 30,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "rgb(97, 188, 139)",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "rgb(255, 255, 255)",
    marginLeft: 40,
  },
  header: {
    marginTop: viewportHeight * 0.08,
    height: 50,
    width: viewportWidth,
    backgroundColor: "rgb(97, 188, 139)",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  body: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  dairyHeader: {
    height: 50,
    width: viewportWidth,
    backgroundColor: "rgb(240, 248, 237)",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  dairyTitle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "600",
    color: "rgb(0,0,0)",
  },
  dairyBody: {
    alignItems: "center",
    justifyContent: "flex-start", // Align items to the start of the container
    flexDirection: "row", // Set direction of items to row
    flexWrap: "wrap", // Enable wrapping of items
    padding: 12,
  },
  deletemodalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    paddingHorizontal: 40,
    paddingVertical: 35,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
  },
  storeModalContainer: {
    flex: 1,
    backgroundColor: "rgb(97, 188, 139)",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  storeModalHeader: {
    marginTop: viewportHeight * 0.08,
    height: 60,
    width: viewportWidth,
    flexDirection: "row",
    backgroundColor: "rgb(97, 188, 139)",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  storeModalBody: {
    backgroundColor: "rgba(239, 238, 236)",
    alignItems: "center",
    justifyContent: "flex-start",
    width: viewportWidth,
  },
  storeModalHeader2: {
    height: 60,
    width: viewportWidth,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  storeModalListView: {
    paddingTop: 10,
    paddingBottom: 20, 
    backgroundColor: "rgb(240, 248, 237)",
    height: viewportHeight * 0.72 - 170,
  },
  storeModalListItem: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: viewportWidth - 24,
    padding: 0,
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
});
