import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import {
  useRoute,
  useNavigation,
  useNavigationState,
} from "@react-navigation/native";

import AuthContext from "../../../assets/context/AuthContext";
import UserCard from "../../../components/UserCard";
import PostsList from "../../../components/PostsList";

// test posts
const mockPosts = [
  {
    id: "1",
    imageURL:
      "https://s4.reutersmedia.net/resources/r/?m=02&d=20220420&t=2&i=1597571287&w=780&fh=&fw=&ll=&pl=&sq=&r=2022-04-20T202111Z_18429_MRPRC21RT9JN1RJ_RTRMADP_0_UKRAINE-CRISIS",
    title: "Test 1",
    comments: [{}, {}],
    locationName: "Test region 1, test country 1",
    location: {
      latitude: 47.8159234,
      longitude: 35.0428751,
    },
    owner: "UserId 1",
  },
  {
    id: "2",
    imageURL:
      "https://s2.reutersmedia.net/resources/r/?m=02&d=20220420&t=2&i=1597571295&w=780&fh=&fw=&ll=&pl=&sq=&r=2022-04-20T202111Z_18429_MRPRC2C6T9OLXEP_RTRMADP_0_UKRAINE-CRISIS-KYIV-DEFENCE",
    title: "Test 2",
    comments: [],
    locationName: "Test region 2, test country 2",
    location: {
      latitude: 47.8159234,
      longitude: 35.0428751,
    },
    owner: "UserId 2",
  },
  {
    id: "3",
    imageURL:
      "https://s3.reutersmedia.net/resources/r/?m=02&d=20220420&t=2&i=1597571288&w=780&fh=&fw=&ll=&pl=&sq=&r=2022-04-20T202111Z_18429_MRPRC22BT93OGNO_RTRMADP_0_UKRAINE-CRISIS-KYIV-REGION",
    title: "Test 3",
    comments: [{}, {}, {}, {}],
    locationName: "Test region 3, test country 3",
    location: {
      latitude: 47.8159234,
      longitude: 35.0428751,
    },
    owner: "UserId 2",
  },
];

const PostsScreen = ({ parentNavigation }) => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState(mockPosts);
  const route = useRoute();
  const navigation = useNavigation();
  const routes = useNavigationState((state) => state.routes);

  useLayoutEffect(() => {
    parentNavigation.setOptions({
      tabBarStyle: { display: "flex" },
    });
  }, [routes]);

  useEffect(() => {
    const post = route?.params?.post;
    if (!post) return;
    setPosts([...posts, post]);
  }, [route.params]);

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
