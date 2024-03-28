import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { StyleSheet } from "react-native";
import { View } from "../../components/Themed";

import FieldSelectionIcon from "../../assets/images/icon/field_selection.svg";
import FieldSelectionIcon_s from "../../assets/images/icon/field_selection_black.svg";
import HandbookIcon from "../../assets/images/icon/handbook.svg"; // replace with the path to your custom icon
import HandbookIcon_s from "../../assets/images/icon/handbook_black.svg";
import HomeIcon from "../../assets/images/icon/home.svg";
import HomeIcon_s from "../../assets/images/icon/home_black.svg";
import PersonalIcon from "../../assets/images/icon/personal.svg";
import PersonalIcon_s from "../../assets/images/icon/personal_black.svg";
import SettingIcon from "../../assets/images/icon/settings.svg";
import SettingIcon_s from "../../assets/images/icon/settings_black.svg";

import Colors from "../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -10 }} {...props} />;
}

const createTabIcon = (FocusedIcon: React.ComponentType<any>, UnfocusedIcon: React.ComponentType<any>) => {
  return ({ color, focused }: { color: string; focused: boolean }) => (
    <View style={focused ? styles.focusedTab : {}}>
      {focused ? (
        <FocusedIcon fill={color} width={28} height={28} />
      ) : (
        <UnfocusedIcon fill={color} width={28} height={28} style={{ marginBottom: -10 }} />
      )}
    </View>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tint,
        tabBarStyle: styles.tabBarBase,
        tabBarItemStyle: {
          flexDirection: 'column', // Align icon and text vertically
        },
        tabBarLabelStyle: {
          display: 'none', // Space between icon and label
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="field_selection"
        options={{
          title: "場域選擇",
          tabBarAccessibilityLabel: '場域選擇',
          tabBarIcon: createTabIcon(FieldSelectionIcon_s, FieldSelectionIcon),
        }}
      />
      <Tabs.Screen
        name="handbook"
        options={{
          title: "圖鑑",
          tabBarAccessibilityLabel: '圖鑑',
          tabBarIcon: createTabIcon(HandbookIcon_s, HandbookIcon),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "主頁",
          tabBarAccessibilityLabel: '主頁',
          // headerShown: true,
          tabBarIcon: createTabIcon(HomeIcon_s, HomeIcon),
          headerRight: () => (
            <Link href="/field/results" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="personal"
        options={{
          title: "個人頁面",
          tabBarAccessibilityLabel: '個人頁面',
          tabBarIcon: createTabIcon(PersonalIcon_s, PersonalIcon),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "設定",
          tabBarAccessibilityLabel: '設定',
          tabBarIcon: createTabIcon(SettingIcon_s, SettingIcon),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  focusedTab: {
    backgroundColor: 'rgba(232, 243, 226, 1)', // Example background color
    borderRadius: 20, // You can adjust this as needed
    paddingHorizontal: 15, // Horizontal padding
    paddingVertical: 10, // Vertical padding
    marginBottom: -10,
  },
  tabBarBase: {
    backgroundColor: '#fff', // Your desired background color
    borderTopLeftRadius: 40, // Adjust to match your design
    borderTopRightRadius: 40, // Adjust to match your design
    position: 'absolute', // Positioning if necessary
    bottom: 0, // Positioning if necessary
    padding: 10, // Inner padding
    height: 90, // Adjust based on your design
    shadowColor: '#000', // Shadow color
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  // ... other styles
});