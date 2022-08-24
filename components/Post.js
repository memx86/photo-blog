import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import db from "../firebase";
import DB_KEYS from "../assets/constants/DB_KEYS";

export const TYPES = {
  PROFILE: "PROFILE",
  POSTS: "POSTS",
};

const Post = ({ post, style = {}, type, navigation }) => {
  const { id: postId, imageURL, title, locationName, location, likes } = post;
  const { width } = useWindowDimensions();
  const isPosts = type === TYPES.POSTS;

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const commentsSubscription = db
      .firestore()
      .collection(DB_KEYS.POSTS)
      .doc(postId)
      .collection(DB_KEYS.COMMENTS)
      .onSnapshot(
        (data) =>
          setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))),
        () => commentsSubscription()
      );
    return () => commentsSubscription();
  }, []);

  const onCommentsPress = () => navigation.navigate("Comments", { post });
  const onMapPress = () =>
    navigation.navigate("Map", { location, locationName });

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
      <Text style={s.title}>{title}</Text>
      <View style={s.wrapper}>
        <View style={s.commentsWrapper}>
          <TouchableOpacity activeOpacity={0.7} onPress={onCommentsPress}>
            <View style={s.comments}>
              {isPosts ? (
                <Feather
                  name="message-circle"
                  size={24}
                  color="#BDBDBD"
                  style={{ transform: [{ rotateY: "180deg" }] }}
                />
              ) : (
                <Image
                  source={require("../assets/images/message-circle.png")}
                  style={{ width: 24, height: 24 }}
                />
              )}
              <Text
                style={{
                  ...s.commentsNumber,
                  color: isPosts ? "#BDBDBD" : "#212121",
                }}
              >
                {comments?.length ? comments?.length : 0}
              </Text>
            </View>
          </TouchableOpacity>
          {!isPosts && (
            <View style={{ ...s.comments, marginLeft: 24 }}>
              <Feather name="thumbs-up" size={24} color="#FF6C00" />
              <Text
                style={{
                  ...s.commentsNumber,
                  color: "#212121",
                }}
              >
                {likes}
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={onMapPress}>
          <View style={s.map}>
            <Feather name="map-pin" size={24} color="#BDBDBD" />
            <Text style={s.location}>{locationName}</Text>
          </View>
        </TouchableOpacity>
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
  commentsWrapper: {
    flexDirection: "row",
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
