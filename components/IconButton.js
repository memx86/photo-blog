import { TouchableOpacity, StyleSheet } from "react-native";

const IconButton = ({ children, style = {}, onPress }) => {
  return (
    <TouchableOpacity
      style={{ ...s.container, ...style }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconButton;
