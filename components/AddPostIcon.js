import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

function AddPostIcon() {
  return (
    <View style={s.container}>
      <Feather name="plus" size={13} color="#ffffff" />
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#FF6C00",
  },
});

export default AddPostIcon;
