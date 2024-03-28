import { Dimensions, StyleSheet } from "react-native";
import { SvgProps } from "react-native-svg";

import Avatar from "../../components/ui/Avatar";
import { Text, View } from "../../components/Themed";

import settingIcon from "../../assets/images/icon/settings.svg";
import infoIcon from "../../assets/images/icon/personalInfo.svg";
import contactUsIcon from "../../assets/images/icon/contactUs.svg";
import signOutIcon from "../../assets/images/icon/signOut.svg";
import languageIcon from "../../assets/images/icon/language.svg";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

type SettingData = {
  icon: React.FC<SvgProps>;
  title: string;
};

const settingData: SettingData[] = [
  { icon: infoIcon, title: "更改個人資料" },
  { icon: settingIcon, title: "帳號設定" },
  { icon: languageIcon, title: "設定語言" },
  { icon: contactUsIcon, title: "聯絡我們" },
  { icon: signOutIcon, title: "登出" },
];

export default function Settings() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>設定</Text>
      </View>
      <Avatar style={{ marginTop: 30 }} />
      <Text style={{ marginTop: 12, fontSize: 17, fontWeight: "600" }}>
        PEI_067
      </Text>
      <View style={{marginTop: 20}}>
        {settingData.map((data, i) => (
          <View key={i} style={[styles.itemBox, { marginTop: 10 }]}>
            <data.icon style={{width: 20, height: 20, marginLeft: 20, marginRight: 10}}/>
            <Text style={{color: '#4d4d4d'}}>{data.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "rgb(255, 255, 255)",
    marginLeft: 40,
    marginTop: viewportHeight * 0.08
  },
  header: {
    height: viewportHeight * 0.08 + 50,
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
  },
  itemBox: {
    backgroundColor: "#e6e6e6",
    width: viewportWidth * 0.9,
    height: viewportWidth * 0.18,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: "flex-start",
    flexDirection: "row",
  },
});
