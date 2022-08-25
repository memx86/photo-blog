import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Loader";
import db from "./firebase";

import {
  changeUser,
  resetAuth,
  authorized,
  getIsLoading,
  getLoadingMessage,
} from "./redux/auth";

import Navigator from "./screens/Navigator";

const Main = () => {
  const navigationRef = useNavigationContainerRef();
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const message = useSelector(getLoadingMessage);

  const onChangeUser = (user) => {
    if (!user) {
      dispatch(resetAuth());
      return;
    }

    const { uid, displayName, email, photoURL } = user;
    const changedUser = {
      id: uid,
      name: displayName,
      email,
      avatarURL: photoURL,
    };

    dispatch(changeUser(changedUser));
    dispatch(authorized());
  };

  useEffect(() => {
    db.auth().onAuthStateChanged((user) => onChangeUser(user));
  }, []);

  if (isLoading) return <Loader text={message} />;

  return (
    <NavigationContainer ref={navigationRef}>
      <Navigator navigationRef={navigationRef} />
    </NavigationContainer>
  );
};
export default Main;
