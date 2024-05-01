import React, { ReactElement, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
  Modal,
} from "react-native";
import { SvgProps } from "react-native-svg";
import { useUserContext } from "../../providers/UserProvider";

import globalStyles from "../../styles/styles";

import Edit from "../../assets/images/personal/edit.svg";

import search from "../../assets/images/personal/shareModalSearch.png";
import joy from "../../assets/images/personal/joy.png";
import lily from "../../assets/images/personal/lily.png";
import meg from "../../assets/images/personal/meg.png";
import fb from "../../assets/images/personal/fb.png";
import ig from "../../assets/images/personal/ig.png";
import earnPoint from "../../assets/images/personal/earnPoint.png";
import earnPointClose from "../../assets/images/personal/earnPointClose.png";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

type PostData = {
  id: number;
  date: string;
  time: string;
  uri?: ImageSourcePropType;
  emoji?: React.FC<SvgProps>;
  title?: string;
  content?: string;
};

interface PostContentProps {
  postData?: PostData;
  empty?: boolean;
}

const PostContent: React.FC<PostContentProps> = ({ postData, empty }) => {
  const [openShare, setOpenShare] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openEarnPoints, setOpenEarnPoints] = useState(false);
  const imageSource =
    postData?.uri || require("../../assets/images/personal/demo1.png");
  const Emoji = postData?.emoji || (() => <></>);
  const {point,setPoint} = useUserContext()

  const shareModalOnPress = () => {
    setOpenShare(false);
    setOpenEarnPoints(true);
    setPoint(point + 1);
  };

  if (empty) {
    return (
      <View
        style={[styles.contentContainer, { marginTop: viewportHeight * 0.2 }]}
      >
        <Text>這天沒有日記喔！</Text>
      </View>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.scrollView}
    >
      <View style={styles.innerContainer}>
        <Text style={[styles.dateText, globalStyles.regular]}>
          {postData?.time || "15:30"}
        </Text>
        <View style={styles.contentViewWrapper}>
          <View style={styles.contentView}>
            <Image
              source={imageSource}
              resizeMode="cover"
              style={styles.image}
            />
            <View style={{ flex: 1 }}>
              <View style={styles.emojiWrapper}>
                <Emoji style={[styles.emoji]} />
              </View>
              <Text style={[styles.titleText, globalStyles.medium]}>
                {postData?.title || "標題"}
              </Text>
              <Text style={[styles.contentText, globalStyles.regular]}>
                {postData?.content || "內容"}
              </Text>
              <Pressable
                onPress={() => setOpenShare(true)}
                style={styles.shareButton}
              >
                <View style={styles.shareButtonInner}>
                  <Text style={[styles.shareButtonText, globalStyles.regular]}>
                    分享給我的朋友們
                  </Text>
                </View>
              </Pressable>
              <Pressable onPress={() => setOpenEdit(true)}>
                <Edit
                  style={{
                    width: 70,
                    height: 70,
                    position: "absolute",
                    right: -30,
                    top: -65,
                  }}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      {/* share modal */}
      <Modal
        visible={openShare}
        presentationStyle="overFullScreen"
        transparent
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <View
            style={{
              flex: 3,
              width: "80%",
            }}
          >
            <View
              style={[
                styles.contentViewWrapper,
                { transform: [{ scale: 0.6 }] },
              ]}
            >
              <View style={[styles.contentView, { height: "100%" }]}>
                <Image
                  source={imageSource}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    flex: 1,
                    borderRadius: 30,
                  }}
                />
                <View style={{ flex: 1 }}>
                  <View style={styles.emojiWrapper}>
                    <Emoji style={[styles.emoji]} />
                  </View>
                  <Text style={[styles.titleText, globalStyles.medium]}>
                    {postData?.title || "標題"}
                  </Text>
                  <Text style={[styles.contentText, globalStyles.regular]}>
                    {postData?.content || "內容"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Pressable
            onPress={shareModalOnPress}
            style={{
              flex: 2,
              width: viewportWidth,
              backgroundColor: "rgb(255, 255, 255)",
              borderRadius: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View>
              <Image
                source={search}
                resizeMode="contain"
                style={{
                  width: viewportWidth * 0.75,
                  height: 50,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: "white",
                  position: "absolute",
                  top: 17,
                  left: 32,
                }}
              >
                搜尋
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                width: viewportWidth,
                marginTop: 15,
              }}
            >
              <View>
                <Image
                  source={joy}
                  resizeMode="contain"
                  style={{
                    width: viewportWidth * 0.25,
                    height: viewportWidth * 0.25,
                  }}
                />
                <Text
                  style={[
                    {
                      fontSize: 13,
                      color: "black",
                      textAlign: "center",
                      letterSpacing: 2,
                    },
                    globalStyles.medium,
                  ]}
                >
                  JOY_012
                </Text>
              </View>
              <View>
                <Image
                  source={meg}
                  resizeMode="contain"
                  style={{
                    width: viewportWidth * 0.25,
                    height: viewportWidth * 0.25,
                  }}
                />
                <Text
                  style={[
                    {
                      fontSize: 13,
                      color: "black",
                      textAlign: "center",
                      letterSpacing: 2,
                    },
                    globalStyles.medium,
                  ]}
                >
                  MEG_463
                </Text>
              </View>
              <View>
                <Image
                  source={lily}
                  resizeMode="contain"
                  style={{
                    width: viewportWidth * 0.25,
                    height: viewportWidth * 0.25,
                  }}
                />
                <Text
                  style={[
                    {
                      fontSize: 13,
                      color: "black",
                      textAlign: "center",
                      letterSpacing: 2,
                    },
                    globalStyles.medium,
                  ]}
                >
                  LILY_795
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                width: viewportWidth * 0.85,
                marginTop: 20,
                marginBottom: 40,
              }}
            >
              <Image
                source={ig}
                resizeMode="contain"
                style={{
                  width: viewportWidth * 0.15,
                  height: viewportWidth * 0.15,
                  marginRight: 20,
                }}
              />
              <Image
                source={fb}
                resizeMode="contain"
                style={{
                  width: viewportWidth * 0.15,
                  height: viewportWidth * 0.15,
                }}
              />
            </View>
          </Pressable>
        </View>
      </Modal>
      <Modal visible={openEdit}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>編輯區</Text>
          <Pressable onPress={() => setOpenEdit(false)}>
            <Text>close</Text>
          </Pressable>
        </View>
      </Modal>
      {/* 獲得點數 */}
      <Modal
        visible={openEarnPoints}
        presentationStyle="overFullScreen"
        transparent
        animationType="slide"
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
        >
          <Image
            source={earnPoint}
            resizeMode="contain"
            style={{
              width: viewportWidth * 0.4,
              height: viewportHeight * 0.4,
              marginBottom: 20,
            }}
          />
          <Text
            style={[
              {
                color: "white",
                fontSize: 25,
                letterSpacing: 3,
                marginTop: -viewportHeight * 0.12,
              },
              globalStyles.medium,
            ]}
          >
            已完成每日分享任務
          </Text>
          <View
            style={{
              backgroundColor: "white",
              paddingVertical: 10,
              paddingHorizontal: 35,
              marginTop: 20,
              marginBottom: viewportHeight * 0.1,
              borderRadius: 15,
            }}
          >
            <Text
              style={[{ fontSize: 20, letterSpacing: 3 }, globalStyles.medium]}
            >
              你獲得一點!
            </Text>
          </View>
          <Pressable
          onPress={() => setOpenEarnPoints(false)}
            style={{
              position: "absolute",
              right: viewportWidth * 0.1,
              bottom: "50%",
            }}
          >
            <Image
              source={earnPointClose}
              resizeMode="contain"
              style={{
                width: viewportWidth * 0.17,
                height: viewportHeight * 0.17,
              }}
            />
          </Pressable>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: viewportWidth,
    height: viewportHeight * 0.7,
  },
  scrollView: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  innerContainer: {
    width: "80%",
    alignItems: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0)",
    marginTop: "12%",
  },
  contentViewWrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  contentView: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    height: "70%",
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  image: {
    width: "100%",
    flex: 1,
    borderRadius: 30,
  },
  emojiWrapper: {
    width: 50,
    height: 50,
    marginLeft: "4%",
    marginTop: "3%",
  },
  emoji: {
    width: 50,
    height: 50,
  },
  dateText: { color: "black", marginBottom: "5%", letterSpacing: 1 },
  titleText: { marginLeft: "7%", marginVertical: "3%", fontSize: 13 },
  contentText: {
    marginLeft: "7%",
    fontSize: 11,
    color: "rgba(0, 0, 0, 0.7)",
  },
  shareButton: {
    marginTop: "20%",
    width: viewportWidth * 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  shareButtonInner: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  shareButtonText: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 1)",
  },
});

export default PostContent;
