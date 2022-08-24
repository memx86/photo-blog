import { useFonts } from "expo-font";
import { Provider } from "react-redux";

import { store } from "./redux/store";

import Loader from "./components/Loader";
import Main from "./Main";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) return <Loader text="Loading Fonts" />;

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
