import { useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";

import AuthContext from "../../assets/context/AuthContext";
import Post from "../../components/Post";
import UserCard from "../../components/UserCard";

function PostsScreen() {
  const { user } = useContext(AuthContext);
  // test posts
  const posts = [
    {
      id: "1",
      imageURL: "https://img.pravda.com/images/doc/3/0/3051553-2.jpg",
      title: "Test 1",
      comments: [{}, {}],
      location: "Test region 1, test country 1",
    },
    {
      id: "2",
      imageURL: "https://i.redd.it/mzxawfyo6gk81.png",
      title: "Test 2",
      comments: [],
      location: "Test region 2, test country 2",
    },
  ];
  return (
    <ScrollView style={s.container}>
      <UserCard user={user} style={s.userCard} />
      {posts?.map((post) => (
        <Post post={post} key={post.id} style={{ marginBottom: 32 }} />
      ))}
    </ScrollView>
  );
}

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
