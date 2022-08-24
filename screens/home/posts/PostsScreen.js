import { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import {
  useRoute,
  useNavigation,
  useNavigationState,
} from "@react-navigation/native";

import db from "../../../firebase";

import { getUser } from "../../../redux/auth";

import UserCard from "../../../components/UserCard";
import PostsList from "../../../components/PostsList";
import DB_KEYS from "../../../assets/constants/DB_KEYS";

const PostsScreen = ({ parentNavigation }) => {
  const user = useSelector(getUser);
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const routes = useNavigationState((state) => state.routes);

  useLayoutEffect(() => {
    parentNavigation.setOptions({
      tabBarStyle: { display: "flex" },
    });
  }, [routes]);

  useEffect(() => {
    const postsListener = db
      .firestore()
      .collection(DB_KEYS.POSTS)
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
    () => postsListener();
  }, []);

  return (
    <ScrollView style={s.container}>
      <UserCard user={user} style={s.userCard} />
      <PostsList posts={posts} navigation={navigation} />
    </ScrollView>
  );
};

const s = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    backgroundColor: "#ffffff",
  },
  userCard: {
    marginBottom: 32,
  },
});

export default PostsScreen;
