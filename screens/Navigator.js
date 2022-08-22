import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./auth/LoginScreen";
import RegistrationScreen from "./auth/RegistrationScreen";
import HomeNavigator from "./HomeNavigator";

const Auth = createNativeStackNavigator();

const Navigator = ({ isAuth, navigationRef, setIsAuth }) => {
  const onLogout = () => setIsAuth(false);
  const onGoBack = () => navigationRef.goBack();

  if (!isAuth)
    return (
      <Auth.Navigator screenOptions={{ headerShown: false }}>
        <Auth.Screen name="Login" component={LoginScreen} />
        <Auth.Screen name="Registration" component={RegistrationScreen} />
      </Auth.Navigator>
    );
  return <HomeNavigator onLogout={onLogout} onGoBack={onGoBack} />;
};

export default Navigator;
