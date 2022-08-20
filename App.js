import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";

import AuthContext from "./assets/context/AuthContext";
import Navigator from "./screens/Navigator";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });
  const navigationRef = useNavigationContainerRef();

  if (!fontsLoaded)
    return (
      <View style={s.loader}>
        <Text>Loading Fonts...</Text>
      </View>
    );

  // Test user
  const user = {
    avatarURL: "https://reactjs.org/logo-og.png",
    name: "Yevhen Malyshko",
    email: "test@mail.com",
  };

  return (
    <AuthContext.Provider value={{ setIsAuth, user }}>
      <NavigationContainer ref={navigationRef}>
        <Navigator
          isAuth={isAuth}
          navigationRef={navigationRef}
          setIsAuth={setIsAuth}
        />
      </NavigationContainer>
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
