import {
  Dimensions,
  TextInput,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ImageSourcePropType,
  Modal,
  Button,
} from "react-native";
import { Image } from "react-native";
import { ImageProps, SvgProps } from "react-native-svg";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Svg, { G, Path } from "react-native-svg";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import React, { ReactElement, useEffect, useState } from "react";
import hb_main from "../../assets/images/handbook/hb_main.png";
import Lottie from "lottie-react-native";
import lottie from "../../assets/lotties/work.json";

import BackIcon from "../../assets/images/icon/back.svg";
import DecoSVG from "../../assets/images/handbook/deco.svg";
import Fertilize from "../../assets/images/icon/fertilize.svg";
import Water from "../../assets/images/icon/watering.svg";
import Sun from "../../assets/images/icon/sun.svg";
import Trim from "../../assets/images/icon/trim.svg";
import Pest from "../../assets/images/icon/pest.svg";
import Temp from "../../assets/images/icon/temp.svg";
import Moist from "../../assets/images/icon/moist.svg";
import Star from "../../assets/images/icon/star.svg";
import Location from "../../assets/images/icon/location.svg";
import Soil from "../../assets/images/icon/soil.svg";
import Caution from "../../assets/images/icon/caution.svg";
import StarRate from "../../assets/images/icon/star_rate.svg";

import data from "../../constants/HandBook.json";

import plant1 from "../../assets/images/handbook/佛手虎尾蘭.png";
import plant2 from "../../assets/images/handbook/吊蘭.png";
import plant3 from "../../assets/images/handbook/常春藤.png";
import plant4 from "../../assets/images/handbook/心葉蔓綠絨.png";
import plant5 from "../../assets/images/handbook/橡皮樹.png";
import plant6 from "../../assets/images/handbook/白金葛.png";
import plant7 from "../../assets/images/handbook/白鶴芋.png";
import plant8 from "../../assets/images/handbook/蘆薈.png";
import plant9 from "../../assets/images/handbook/袖珍椰子.png";
import plant10 from "../../assets/images/handbook/銀葉虎斑木.png";
import plant11 from "../../assets/images/handbook/鐵線蕨.png";
import plant12 from "../../assets/images/handbook/黃椰子.png";
import plant13 from "../../assets/images/handbook/黃金虎尾蘭.png";
import plant14 from "../../assets/images/handbook/龍血樹.png";
import plant15 from "../../assets/images/handbook/龜背芋.png";
import modal_bg from "../../assets/images/handbook/modal_bg.png";
import basicInfo from "../../assets/images/handbook/basicInfo.png";
import basicInfo_card from "../../assets/images/handbook/basicInfo_card.png";
import care from "../../assets/images/handbook/care.png";
import growCondition from "../../assets/images/handbook/growCondition.png";
import option_deco1 from "../../assets/images/handbook/select_option.png";
import option_deco2 from "../../assets/images/handbook/select_arrow.png";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

// Add image data one by one to the data structure
const dataImage = data.map((item: any, index: number) => {
  switch (index) {
    case 0:
      return { ...item, image: plant4 };
    case 1:
      return { ...item, image: plant13 };
    case 2:
      return { ...item, image: plant1 };
    case 3:
      return { ...item, image: plant5 };
    case 4:
      return { ...item, image: plant8 };
    default:
      return { ...item, image: plant9 };
  }
});
// console.log(dataImage)

export default function HandBook() {
  const [visible, setVisible] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  const renderItem = ({ item }: any) => (
    <Card
      id={item.key}
      name={item.name}
      uri={item.image}
      onPress={() => {
        setId(item.key);
        setVisible(true);
      }}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.head_container}>
        <Image source={hb_main} resizeMode="contain" style={{ width: "70%" }} />
        <Text
          style={{
            position: "relative",
            color: "white",
            top: -80,
            fontSize: 25,
            fontWeight: "600",
          }}
        >
          植物圖鑑
        </Text>
      </View>
      <SafeAreaView style={styles.card_box}>
        <Text style={styles.title}>推薦植物</Text>
        <FlatList
          data={dataImage.map((plant: any, index: number) => ({
            ...plant,
            key: `${index}`,
          }))}
          renderItem={renderItem}
          numColumns={2} // Display two columns
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.cardContainer}
          showsVerticalScrollIndicator={false}
        />
        <InfoModal visible={visible} setVisible={setVisible} id={id} />
      </SafeAreaView>
      <SearchBox />
      {/* <View style={styles.lottie}>
        <Lottie source={lottie} autoPlay loop />
      </View> */}
    </View>
  );
}

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleSearch = (text: any) => {
    setSearchQuery(text);
    // Add additional search handling logic if necessary
  };

  return (
    <View style={styles.searchBoxContainer}>
      <TextInput
        style={clicked ? styles.input_clicked : styles.input_unclicked}
        placeholder="🔍搜尋植物"
        placeholderTextColor="#fff"
        value={searchQuery}
        onChangeText={handleSearch}
        onFocus={() => {
          setClicked(true);
        }}
        onBlur={() => {
          setClicked(false);
        }}
        // Optional: Add an onSubmitEditing prop if you want to handle submission events
      />
      {clicked && (
        <View style={styles.dropdown}>
          <Text style={{ color: "white" }}>dropdown</Text>
        </View>
      )}
    </View>
  );
};

interface CardProps {
  uri?: ImageSourcePropType;
  name?: string;
  id?: number;
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({ uri, name, id, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card_touchable}>
      <View style={styles.card}>
        {uri && <Image source={uri} resizeMode="contain" style={{ flex: 1 }} />}
        {name && (
          <Text
            style={{
              marginTop: 8,
              fontWeight: "600",
              fontSize: 13,
              color: "rgb(98, 89, 82)",
            }}
          >
            {name}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

interface InfoModalProps {
  id: number;
  visible?: boolean;
  setVisible: (value: boolean) => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ id, visible, setVisible }) => {
  const options = ["基本資訊", "照護方式", "生長條件"];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const closeModal = () => {
    setVisible(false);
  };
  const optionPress = (id: number) => {
    setSelectedOption(options[id]);
  };

  return (
    <Modal animationType="slide" visible={visible}>
      <View style={styles.modal_head_container}>
        <View style={styles.modal_head_container2}>
          <View
            style={{
              position: "absolute",
              backgroundColor: "transparent",
              width: "90%",
              aspectRatio: 1,
              right: 10,
            }}
          >
            <Image source={modal_bg} resizeMode="contain" style={{ flex: 1 }} />
          </View>
          <View
            style={{
              position: "absolute",
              alignItems: "center",
              backgroundColor: "transparent",
              width: "40%",
              aspectRatio: 1,
              right: -viewportWidth * 0.05,
            }}
          >
            <Image
              source={dataImage[id].image}
              resizeMode="contain"
              style={{ flex: 1 }}
            />
          </View>
          {/* still need modify here */}
          <TouchableOpacity
            onPress={closeModal}
            style={{ backgroundColor: "white", padding: 8, borderRadius: 20 }}
          >
            <Text
              style={{
                fontWeight: "500",
                letterSpacing: 2,
              }}
            >
              ・加入我的植物{" "}
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.modal_textStyle1,
              {
                fontWeight: "600",
                fontSize: 26,
                letterSpacing: 2,
                marginTop: 30,
              },
            ]}
          >
            {dataImage[id].name}
          </Text>
          <Text
            style={[
              styles.modal_textStyle1,
              { fontWeight: "300", fontSize: 10, marginBottom: 13 },
            ]}
          >
            {dataImage[id].latinName}
          </Text>
          <Text
            style={[
              styles.modal_textStyle1,
              {
                fontWeight: "600",
                fontSize: 18,
                letterSpacing: 1,
                marginBottom: 10,
              },
            ]}
          >
            {dataImage[id].family}
          </Text>
          <Text
            style={[
              styles.modal_textStyle1,
              {
                fontWeight: "600",
                fontSize: 18,
                letterSpacing: 1,
                marginBottom: 10,
              },
            ]}
          >
            {dataImage[id].type}
          </Text>
          <Text
            style={[
              styles.modal_textStyle1,
              {
                fontWeight: "600",
                fontSize: 18,
                letterSpacing: 1,
                marginBottom: 2,
              },
            ]}
          >
            別名
          </Text>
          <Text
            style={[
              styles.modal_textStyle1,
              { fontWeight: "600", fontSize: 13, letterSpacing: 0.5 },
            ]}
          >
            {dataImage[id].aliases.join("、")}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.modal_main_container,
          selectedOption == "基本資訊" && { backgroundColor: "white" },
        ]}
      >
        {/* <TouchableOpacity onPress={closeModal}>
          <Text>{selectedOption}</Text>
        </TouchableOpacity> */}
        <MainContent id={id} selectedOption={selectedOption} />
      </View>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={closeModal}>
          <BackIcon width={30} height={30} fill="rgb(242, 241, 248)" />
        </TouchableOpacity>
      </View>
      {/* Selection Area */}
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          justifyContent: "space-around",
          bottom: viewportHeight * 0.52,
          left: (viewportWidth / 72) * 10,
          backgroundColor: "transparent",
          width: "100%",
          zIndex: 20,
        }}
      >
        <Option
          id={0}
          label="基本資訊"
          isSelected={selectedOption == "基本資訊"}
          onPress={optionPress}
          imageSource={basicInfo}
        />
        <Option
          id={1}
          label="照護方式"
          isSelected={selectedOption == "照護方式"}
          onPress={optionPress}
          imageSource={care}
        />
        <Option
          id={2}
          label="生長條件"
          isSelected={selectedOption == "生長條件"}
          onPress={optionPress}
          imageSource={growCondition}
        />
      </View>
    </Modal>
  );
};

interface OptionProps {
  id: number;
  label: string;
  isSelected: boolean;
  onPress: (id: number) => void;
  imageSource: { uri: string } | number; // For remote images use { uri: string }, for local images use require (number)
}

const Option = ({
  id,
  label,
  isSelected,
  onPress,
  imageSource,
}: OptionProps) => {
  return (
    <>
      <TouchableOpacity onPress={() => onPress(id)}>
        <View
          style={[
            styles.modal_option_touchable,
            !isSelected && { opacity: 0.5 },
          ]}
        >
          <Image
            source={imageSource}
            resizeMode="contain"
            style={{ width: 50, height: 50 }}
          />
          <Text style={[styles.modal_textStyle1, styles.modal_option_text]}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={[styles.decoration, !isSelected && { opacity: 0 }]}>
        <DecoSVG
          width={viewportWidth / 3}
          height={70}
          fill="rgb(97, 188, 139)"
        />
        <Image
          source={option_deco2}
          resizeMode="contain"
          style={{ position: "absolute", width: viewportWidth / 20, top: 4 }}
        />
      </View>
    </>
  );
};

interface MainContentProps {
  id: number;
  selectedOption?: string;
}

const MainContent = ({ id, selectedOption }: MainContentProps) => {
  const data =
    selectedOption == "基本資訊"
      ? "basicInfo"
      : selectedOption == "照護方式"
      ? "care"
      : "condition";
  return (
    <>
      <ScrollView
        contentContainerStyle={[
          data == "basicInfo" && {
            backgroundColor: "white",
          },
          (data == "care" || data == "condition") && {
            backgroundColor: "rgb(242, 241, 248)",
          },
          styles.mainContentContainter,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {data == "basicInfo" && (
          <>
            <View
              style={[
                {
                  flexDirection: "column",
                  marginTop: 36,
                  width: viewportWidth,
                  alignItems: "center",
                },
              ]}
            >
              <View style={{ width: "80%" }}>
                <Text
                  style={{ fontWeight: "500", fontSize: 15, paddingBottom: 5 }}
                >
                  特色
                </Text>
                <Text style={styles.mainContentCardText}>
                  {dataImage[id][data].description}
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.mainContentCardContainer}>
                <View style={styles.mainContentCard1}>
                  <Text style={{ fontWeight: "500", fontSize: 15 }}>
                    外觀與尺寸
                  </Text>
                </View>
                <View style={styles.mainContentCardDeco}></View>
              </View>
              <View style={styles.mainContentCard2}>
                <Text style={styles.mainContentCardText}>
                  {dataImage[id][data].size}
                </Text>
                <Text style={styles.mainContentCardText}>
                  {dataImage[id][data].appearance}
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.mainContentCardContainer}>
                <View style={styles.mainContentCard1}>
                  <Text style={{ fontWeight: "500", fontSize: 15 }}>
                    淨化空氣效果
                  </Text>
                </View>
                <View style={styles.mainContentCardDeco}></View>
              </View>
              <View
                style={[
                  styles.mainContentCard2,
                  { marginBottom: viewportHeight / 20 },
                ]}
              >
                <Text style={styles.mainContentCardText}>
                  {dataImage[id][data].purifyAir}
                </Text>
              </View>
            </View>
          </>
        )}
        {data == "care" && (
          <>
            <View
              style={{
                marginTop: 40,
                marginBottom: 80,
                backgroundColor: "transparent",
                width: viewportWidth,
                alignItems: "center",
              }}
            >
              <ModalCard
                content={dataImage[id][data].pest.join("、")}
                Icon={Pest}
                subtitle="病害與害蟲"
              />
              <ModalCard
                content={dataImage[id][data].fertilize}
                Icon={Fertilize}
                subtitle="施肥"
              />
              <ModalCard
                content={dataImage[id][data].light}
                Icon={Sun}
                subtitle="光照"
              />
              <ModalCard
                content={dataImage[id][data].trim}
                Icon={Trim}
                subtitle="修剪"
              />
              <ModalCard
                content={dataImage[id][data].water}
                Icon={Water}
                subtitle="澆水"
              />
            </View>
          </>
        )}
        {data == "condition" && (
          <>
            <View
              style={{
                marginTop: 40,
                marginBottom: 80,
                backgroundColor: "transparent",
                width: viewportWidth,
                alignItems: "center",
              }}
            >
              <ModalCard
                content={dataImage[id][data].temp}
                Icon={Temp}
                subtitle="適合溫度"
                larger
              />
              <ModalCard
                content={dataImage[id][data].moist}
                Icon={Moist}
                subtitle="適合濕度"
              />
              <ModalCard
                content={dataImage[id][data].star}
                Icon={Star}
                subtitle="種植難度"
                star
              />
              <ModalCard
                content={dataImage[id][data].location}
                Icon={Location}
                subtitle="適合地點"
              />
              <ModalCard
                content={dataImage[id][data].soil}
                Icon={Soil}
                subtitle="適合土壤"
              />
              <ModalCard
                content={dataImage[id][data].others}
                Icon={Caution}
                subtitle="其他注意事項"
              />
            </View>
          </>
        )}
        {/* <Text>{JSON.stringify(dataImage[id][data])}</Text> */}
      </ScrollView>
    </>
  );
};

interface ModalCardProps {
  content: string;
  subtitle?: string;
  Icon: React.ComponentType<any>;
  larger?: boolean;
  star?: boolean;
}

const ModalCard = ({
  content,
  subtitle,
  Icon,
  larger,
  star,
}: ModalCardProps) => {
  return (
    <View style={styles.modalCard}>
      <Icon width={40} height={40} fill="rgb(90, 195, 217)" />
      <View style={[{ flex: 1, marginLeft: 15 }, star && { marginTop: 20 }]}>
        {star && (
          <View style={{ flexDirection: "row" }}>
            {[...Array(parseInt(content))].map((_, index) => (
              <StarRate
                key={index}
                width={20}
                height={20}
                fill="rgb(245, 210, 118)"
                style={{ marginRight: 4 }}
              />
            ))}
            {[...Array(5 - parseInt(content))].map((_, index) => (
              <StarRate
                key={index}
                width={20}
                height={20}
                fill="rgba(0, 0, 0, 0.2)"
                style={{ marginRight: 4 }}
              />
            ))}
          </View>
        )}
        {!star && (
          <Text style={[styles.modalCardText, larger && { fontSize: 17 }]}>
            {content}
          </Text>
        )}
        <View style={{ flexDirection: "row" }}>
          <View style={styles.modalLabelContainer}>
            <Text style={styles.modalLabelText}>{subtitle}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text></Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(148, 172, 142)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
  },
  head_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    alignSelf: "stretch",
    overflow: "visible",
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "600",
  },
  main: {
    flex: 0.5,
    alignContent: "center",
    justifyContent: "flex-start",
  },
  lottie: {
    position: "absolute",
    zIndex: 10,
    top: 200,
    width: viewportWidth * 0.9,
    height: viewportWidth,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  card_touchable: {
    margin: 12,
    alignItems: "center",
    justifyContent: "center",
    height: (viewportWidth * 0.72) / 2,
    // width: "40%",
    aspectRatio: 1,
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    // width: "80%",
    // height: (viewportWidth - 72) / 2,
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 2, // Shadow to the left
      height: 3, // Shadow to the bottom
    },
    aspectRatio: 1,
    shadowOpacity: 0.1, // Opacity of shadow
    shadowRadius: 4, // Radius of shadow
    elevation: 5,
  },
  card_box: {
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    // alignSelf: "stretch",
    width: "100%",
    backgroundColor: "rgb(242, 241, 248)",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cardContainer: {
    padding: 0,
    // paddingLeft: "5%",
    // alignSelf: "stretch",
    width: "80%",
    backgroundColor: "transparent", // Space out children evenly
  },
  modal_head_container: {
    flex: 1,
    backgroundColor: "#0000",
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
    shadowColor: "#000",
    shadowOffset: {
      width: 0, // Shadow to the left
      height: 10, // Shadow to the bottom
    },
    shadowOpacity: 0.25, // Opacity of shadow
    shadowRadius: 20, // Radius of shadow
    elevation: 5,
    zIndex: 2,
  },
  modal_head_container2: {
    flex: 1,
    width: "100%",
    paddingLeft: viewportWidth * 0.12,
    backgroundColor: "rgb(97, 188, 139)",
    alignItems: "flex-start",
    justifyContent: "center",
    overflow: "visible",
  },
  modal_main_container: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgb(242, 241, 248)",
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "visible",
  },
  modal_textStyle1: {
    color: "rgb(242, 241, 248)",
  },
  modal_option_touchable: {
    backgroundColor: "transparent",
    alignItems: "center",
  },
  modal_option_text: { fontWeight: "600", fontSize: 10, letterSpacing: 0.5 },
  decoration: {
    position: "relative",
    bottom: -52, // Adjust this value as needed to move the decoration
    // top: 0,
    left: -viewportWidth / 6,
    width: (viewportWidth * 1) / 3,
    aspectRatio: 2,
    backgroundColor: "transparent", // Just an example; adjust as needed
    zIndex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  mainContentContainter: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  mainContentCardContainer: {
    marginTop: 20,
    width: "80%",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  mainContentCard1: {
    justifyContent: "flex-end",
    backgroundColor: "rgb(242, 241, 248)",
    paddingHorizontal: 20,
    paddingTop: 10,
    // marginBottom: -2,
    width: "45%",
    borderTopLeftRadius: 15,
  },
  mainContentCard2: {
    backgroundColor: "rgb(242, 241, 248)",
    paddingHorizontal: 20,
    width: "80%",
    paddingVertical: 8,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
  },
  mainContentCardDeco: {
    backgroundColor: "rgb(242, 241, 248)",
    borderRightWidth: 20,
    borderRightColor: "white",
    borderBottomWidth: 30,
    borderBottomColor: "rgb(242, 241, 248)",
  },
  mainContentCardText: {
    fontWeight: "600",
    fontSize: 11,
    letterSpacing: 1,
    lineHeight: 20,
  },
  modalCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 30,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    width: "80%",
    marginTop: 10,
    overflow: "visible",
    shadowColor: "#000",
    shadowOffset: {
      width: 0, // Shadow to the left
      height: 1, // Shadow to the bottom
    },
    shadowOpacity: 0.15, // Opacity of shadow
    shadowRadius: 3, // Radius of shadow
    elevation: 5,
  },
  modalCardText: {
    fontWeight: "600",
    fontSize: 13,
    letterSpacing: 0.8,
    lineHeight: 20,
  },
  modalLabelContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    paddingVertical: 3,
    paddingHorizontal: 15,
    marginTop: 10,
    borderRadius: 10,
  },
  modalLabelText: {
    fontWeight: "600",
    fontSize: 10,
    color: "rgba(0, 0, 0, 0.7)",
  },
  searchBoxContainer: {
    // Center the search box in the middle of the screen (optional)
    backgroundColor: "transparent",
    position: "absolute",
    top: "41%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "80%",
  },
  input_unclicked: {
    height: 35,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10, // Rounded corners
    borderColor: "#ddd", // Light gray border color for the input box
    backgroundColor: "rgba(213,219,207,255)",
    width: "60%", // Width of the search box relative to its container
  },
  input_clicked: {
    zIndex: 1,
    height: 35,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10, // Rounded corners
    borderColor: "#ddd", // Light gray border color for the input box
    backgroundColor: "rgba(255, 255, 255 ,255)",
    width: "60%", // Width of the search box relative to its container
  },
  dropdown: {
    position: "relative",
    top: -10,
    height: 40,
    margin: 0,
    marginTop: -12,
    padding: 10,
    borderBottomLeftRadius: 10, // Rounded corners
    borderBottomRightRadius: 10,
    backgroundColor: "rgba(181, 181, 181, 0.8)",
    width: "60%", // Width of the search box relative to its container
  },
  backButton: {
    position: "absolute",
    top: viewportHeight * 0.06, // Distance from the top, adjust according to your status bar/Notch
    left: viewportWidth * 0.06, // Distance from the left
    alignItems: "center", // Vertically center
    backgroundColor: "transparent", // No background color
    zIndex: 10, // Ensure it's above other components
    color: "rgb(242, 241, 248)",
  },
});
