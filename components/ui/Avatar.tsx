import { Image, StyleProp, ImageStyle } from "react-native";
import { ImageUriPersonal } from "../../constants/ImageUri";

import avatar from "../../assets/images/personal/avatar.png"
type AvatarProp = {
  imageUri?: string;
  style?: StyleProp<ImageStyle>;
};
export default function Avatar({ imageUri, style }: AvatarProp) {
  return (
    <Image
      source={avatar}
      resizeMode="contain"
      style={[{ width: 90, height: 90 }, style]}
    />
  );
}
