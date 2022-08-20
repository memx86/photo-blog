import { useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";

import AuthContext from "../../assets/context/AuthContext";
import UserCard from "../../components/UserCard";
import PostsList from "../../components/PostsList";

const PostsScreen = () => {
  const { user } = useContext(AuthContext);
  // test posts
  const posts = [
    {
      id: "1",
      imageURL:
        "https://s4.reutersmedia.net/resources/r/?m=02&d=20220420&t=2&i=1597571287&w=780&fh=&fw=&ll=&pl=&sq=&r=2022-04-20T202111Z_18429_MRPRC21RT9JN1RJ_RTRMADP_0_UKRAINE-CRISIS",
      title: "Test 1",
      comments: [{}, {}],
      location: "Test region 1, test country 1",
    },
    {
      id: "2",
      imageURL:
        "https://s2.reutersmedia.net/resources/r/?m=02&d=20220420&t=2&i=1597571295&w=780&fh=&fw=&ll=&pl=&sq=&r=2022-04-20T202111Z_18429_MRPRC2C6T9OLXEP_RTRMADP_0_UKRAINE-CRISIS-KYIV-DEFENCE",
      title: "Test 2",
      comments: [],
      location: "Test region 2, test country 2",
    },
    {
      id: "3",
      imageURL:
        "https://s3.reutersmedia.net/resources/r/?m=02&d=20220420&t=2&i=1597571288&w=780&fh=&fw=&ll=&pl=&sq=&r=2022-04-20T202111Z_18429_MRPRC22BT93OGNO_RTRMADP_0_UKRAINE-CRISIS-KYIV-REGION",
      title: "Test 3",
      comments: [{}, {}, {}, {}],
      location: "Test region 3, test country 3",
    },
  ];
  return (
    <ScrollView style={s.container}>
      <UserCard user={user} style={s.userCard} />
      <PostsList posts={posts} />
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
