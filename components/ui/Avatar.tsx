import { Image, StyleProp, ImageStyle } from "react-native";
import { ImageUriPersonal } from "../../constants/ImageUri";
type AvatarProp = {
  imageUri?: string;
  style?: StyleProp<ImageStyle>;
};
export default function Avatar({ imageUri, style }: AvatarProp) {
  return (
    <Image
      source={{ uri: imageUri ? imageUri : ImageUriPersonal.avatarDemo }}
      resizeMode="contain"
      style={[{ width: 90, height: 90 }, style]}
    />
  );
}
