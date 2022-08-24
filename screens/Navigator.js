import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { getIsAuth } from "../redux/auth";

import LoginScreen from "./auth/LoginScreen";
import RegistrationScreen from "./auth/RegistrationScreen";
import HomeNavigator from "./HomeNavigator";

const Auth = createNativeStackNavigator();

const Navigator = ({ navigationRef }) => {
  const isAuth = useSelector(getIsAuth);
  const onGoBack = () => navigationRef.goBack();

  if (!isAuth)
    return (
      <Auth.Navigator screenOptions={{ headerShown: false }}>
        <Auth.Screen name="Login" component={LoginScreen} />
        <Auth.Screen name="Registration" component={RegistrationScreen} />
      </Auth.Navigator>
    );
  return <HomeNavigator onGoBack={onGoBack} />;
};

export default Navigator;
