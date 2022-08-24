import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { useContext } from "react";
import { useSelector } from "react-redux";

import { getIsAuth } from "./redux/auth";
import AuthContext from "./assets/context/AuthContext";

import Navigator from "./screens/Navigator";

const Main = () => {
  const navigationRef = useNavigationContainerRef();
  const isAuth = useSelector(getIsAuth);
  const { setIsAuth } = useContext(AuthContext);

  return (
    <NavigationContainer ref={navigationRef}>
      <Navigator
        isAuth={isAuth}
        navigationRef={navigationRef}
        setIsAuth={setIsAuth}
      />
    </NavigationContainer>
  );
};
export default Main;
