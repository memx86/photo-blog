import { Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

import RegistrationScreen from "./screens/RegistrationScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) return <Text style={s.loader}>Loading Fonts...</Text>;

  return <RegistrationScreen />;
}

const s = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    color: "#000000",
  },
});
