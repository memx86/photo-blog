import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";

import db from "../../../firebase";

import { getUser } from "../../../redux/auth";

import Comment from "../../../components/Comment";

import useHideParentBottomBar from "../../../assets/hooks/useHideParentBottomBar";
import useIsKeyboardShown from "../../../assets/hooks/useIsKeyboardShown";
import DB_KEYS from "../../../assets/constants/DB_KEYS";
import COLORS from "../../../assets/constants/COLORS";

const CommentsScreen = ({ parentNavigation }) => {
  const { width } = useWindowDimensions();
  const route = useRoute();
  const post = route.params.post;
  const { imageURL, owner, id: postId } = post;
  const user = useSelector(getUser);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const isKeyboardShown = useIsKeyboardShown(false);

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

  useHideParentBottomBar({
    route,
    navigation: parentNavigation,
    name: "Comments",
  });

  const onAddComment = async () => {
    const newComment = {
      owner: user.id,
      text: comment,
      time: Date.now(),
      avatarURL: user.avatarURL,
    };

    await db
      .firestore()
      .collection(DB_KEYS.POSTS)
      .doc(postId)
      .collection(DB_KEYS.COMMENTS)
      .add(newComment);
    setComment("");
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ android: "height", ios: "padding" })}
    >
      <View style={s.container}>
        <View
          style={{
            flex: 1,
            marginBottom: isKeyboardShown ? 120 : 0,
          }}
        >
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
          <FlatList
            style={s.list}
            data={comments}
            renderItem={({ item }) => {
              const isLeft = item.owner !== owner;
              return (
                <Comment
                  comment={item}
                  style={s.item}
                  ownerId={owner}
                  isLeft={isLeft}
                />
              );
            }}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => <View></View>}
          />
          <View style={{ ...s.inputWrapper, width: width - 16 * 2 }}>
            <TextInput
              style={s.input}
              placeholder="Комментировать"
              placeholderTextColor={COLORS.GREY}
              onChangeText={setComment}
              value={comment}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={s.icon}
              onPress={onAddComment}
            >
              <Feather name="arrow-up" size={14} color={COLORS.MAIN_LIGHT} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const s = StyleSheet.create({
  container: {
    paddingTop: 32,
    position: "relative",
    flex: 1,
    backgroundColor: COLORS.MAIN_LIGHT,
  },
  imageWrapper: {
    marginBottom: 32,
    alignItems: "center",
  },
  image: {
    borderRadius: 8,
  },
  list: {
    marginHorizontal: 16,
  },
  item: {
    marginBottom: 24,
  },
  inputWrapper: {
    position: "relative",
    marginHorizontal: 16,
  },
  input: {
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.THIRD_GREY,
    borderRadius: 100,
    backgroundColor: COLORS.SECONDARY_GREY,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: COLORS.MAIN_DARK,
  },
  icon: {
    position: "absolute",
    top: 12,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.ACCENT,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommentsScreen;
