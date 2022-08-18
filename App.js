import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

import RegistrationScreen from "./screens/RegistrationScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded)
    return (
      <View style={s.loader}>
        <Text>Loading Fonts...</Text>
      </View>
    );

  return <RegistrationScreen />;
}

const s = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  loaderText: {
    color: "#000000",
  },
});
