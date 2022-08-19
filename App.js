import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";

import useNavigator from "./navigator";
import AuthContext from "./assets/context/AuthContext";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
  const navigationRef = useNavigationContainerRef();
  const navigator = useNavigator({ isAuth, navigationRef, setIsAuth });

  if (!fontsLoaded)
    return (
      <View style={s.loader}>
        <Text>Loading Fonts...</Text>
      </View>
    );

  return (
    <AuthContext.Provider value={{ setIsAuth }}>
      <NavigationContainer ref={navigationRef}>{navigator}</NavigationContainer>
    </AuthContext.Provider>
  );
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
