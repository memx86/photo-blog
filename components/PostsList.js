import { View, FlatList } from "react-native";
import Post, { TYPES } from "./Post";

const PostsList = ({ posts, style = {}, type = TYPES.POSTS, navigation }) => {
  return (
    <View style={{ ...style, paddingBottom: 50 }}>
      <FlatList
        data={posts}
        keyExtractor={(post) => post.id}
        renderItem={({ item }) => (
          <Post
            style={{ marginBottom: 32 }}
            post={item}
            type={type}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
};
export default PostsList;
