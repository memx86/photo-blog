import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import db from "./firebase";

import { changeUser, resetAuth, authorized } from "./redux/auth";

import Navigator from "./screens/Navigator";

const Main = () => {
  const navigationRef = useNavigationContainerRef();
  const dispatch = useDispatch();

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

  return (
    <NavigationContainer ref={navigationRef}>
      <Navigator navigationRef={navigationRef} />
    </NavigationContainer>
  );
};
export default Main;
