import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";

import COLORS from "../assets/constants/COLORS";

const AvatarPicker = ({ style, image, setImage }) => {
  const addImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: false,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const removeImage = async () => {
    setImage(null);
  };

  return (
    <View style={style}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={!image ? addImage : removeImage}
      >
        <View style={s.container}>
          {image && <Image source={{ uri: image }} style={s.image} />}
          <View style={s.iconWrapper}>
            {!image && (
              <Feather name="plus-circle" size={25} color={COLORS.ACCENT} />
            )}
            {image && (
              <Feather name="x-circle" size={25} color={COLORS.THIRD_GREY} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    position: "relative",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: COLORS.SECONDARY_GREY,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  iconWrapper: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
  },
});

export default AvatarPicker;
