import { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  ImageBackground,
  Image,
  Text,
  useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";

import db from "../../firebase";

import { getUser, logoutUser } from "../../redux/auth";

import IconButton from "../../components/IconButton";
import PostsList from "../../components/PostsList";
import { TYPES } from "../../components/Post";

import DB_KEYS from "../../assets/constants/DB_KEYS";

const ProfileScreen = ({ navigation }) => {
  const user = useSelector(getUser);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const { avatarURL, name } = user;

  useEffect(() => {
    const postsSubscription = db
      .firestore()
      .collection(DB_KEYS.POSTS)
      .where("owner", "==", user.id)
      .onSnapshot(
        (data) =>
          setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
        () => postsSubscription()
      );

    return () => postsSubscription();
  }, []);

  const onLogout = () => dispatch(logoutUser());

  return (
    <ScrollView style={s.container}>
      <ImageBackground
        source={require("../../assets/images/PhotoBG.jpg")}
        style={s.image}
      >
        <View style={s.wrapper}>
          <Image
            source={{ uri: avatarURL }}
            style={{ ...s.avatar, left: width / 2 - 60 }}
          />
          <IconButton onPress={onLogout} style={s.btn}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </IconButton>
          <Text style={s.name}>{name}</Text>
          <PostsList
            posts={posts}
            type={TYPES.PROFILE}
            navigation={navigation}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapper: {
    position: "relative",
    marginTop: 147,
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
  },
  avatar: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  btn: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  name: {
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.3,
    textAlign: "center",
  },
});

export default ProfileScreen;
