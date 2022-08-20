import {
  StyleSheet,
  View,
  Image,
  Text,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const Post = ({ post, style }) => {
  const { imageURL, title, comments, location } = post;
  const { width } = useWindowDimensions();

  return (
    <View style={{ ...s.container, ...style }}>
      <View style={s.imageWrapper}>
        <Image
          source={{ uri: imageURL }}
          style={{
            ...s.image,
            width: width - 16 * 2,
            height: (width - 16 * 2) / 1.43,
          }}
        />
      </View>
      <Text style={title}>{title}</Text>
      <View style={s.wrapper}>
        <View style={s.comments}>
          <Feather name="message-circle" size={24} color="#BDBDBD" />
          <Text style={s.commentsNumber}>{comments.length}</Text>
        </View>
        <View style={s.map}>
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <Text style={s.location}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {},
  imageWrapper: {
    marginBottom: 8,
    alignItems: "center",
  },
  image: {
    borderRadius: 8,
  },
  title: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  comments: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentsNumber: {
    marginLeft: 6,
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  map: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    marginLeft: 4,
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
});

export default Post;
