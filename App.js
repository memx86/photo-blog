import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";

import useNavigator from "./navigator";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const navigator = useNavigator(false);

  if (!fontsLoaded)
    return (
      <View style={s.loader}>
        <Text>Loading Fonts...</Text>
      </View>
    );

  return <NavigationContainer>{navigator}</NavigationContainer>;
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
