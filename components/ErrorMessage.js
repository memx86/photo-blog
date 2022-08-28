import { StyleSheet, View, Text } from "react-native";
import COLORS from "../assets/constants/COLORS";

const ErrorMessage = ({ style = {}, message }) => {
  return (
    <View style={{ ...s.container, ...style }}>
      <Text style={s.message}>{message}</Text>
    </View>
  );
};

const s = StyleSheet.create({
  container: {},
  message: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: COLORS.ERROR,
    textAlign: "center",
  },
});

export default ErrorMessage;
