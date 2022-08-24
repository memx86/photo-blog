import { StyleSheet, View, Image } from "react-native";

import COLORS from "../assets/constants/COLORS";

const CameraIcon = () => {
  return (
    <View style={s.cameraImageWrapper}>
      <Image
        source={require("../assets/images/camera.png")}
        style={s.cameraImage}
      />
    </View>
  );
};

const s = StyleSheet.create({
  cameraImageWrapper: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: COLORS.MAIN_LIGHT,
  },
  cameraImage: {
    width: 24,
    height: 24,
  },
});

export default CameraIcon;
