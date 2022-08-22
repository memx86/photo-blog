import { View } from "react-native";
import Post, { TYPES } from "./Post";

const PostsList = ({ posts, style = {}, type = TYPES.POSTS, navigation }) => {
  return (
    <View style={style}>
      {posts?.map((post) => (
        <Post
          style={{ marginBottom: 32 }}
          key={post.id}
          post={post}
          type={type}
          navigation={navigation}
        />
      ))}
    </View>
  );
};
export default PostsList;
