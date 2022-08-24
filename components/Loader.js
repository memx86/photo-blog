import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

import COLORS from "../assets/constants/COLORS";

const Loader = ({ style = {}, text = "", icon = true }) => {
  return (
    <View style={{ ...s.loader, ...style }}>
      {icon && <ActivityIndicator size="large" color={COLORS.ACCENT} />}
      <Text style={{ ...s.loaderText, marginTop: icon ? 16 : 0 }}>{text}</Text>
    </View>
  );
};

const s = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.MAIN_LIGHT,
  },
  loaderText: {
    color: COLORS.MAIN_DARK,
  },
});

export default Loader;
