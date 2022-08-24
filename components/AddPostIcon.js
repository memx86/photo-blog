import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import COLORS from "../assets/constants/COLORS";

const AddPostIcon = () => {
  return (
    <View style={s.container}>
      <Feather name="plus" size={13} color={COLORS.MAIN_LIGHT} />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: COLORS.ACCENT,
  },
});

export default AddPostIcon;
