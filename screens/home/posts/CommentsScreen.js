import { useEffect, useReducer, useState } from "react";
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
import Loader from "../../../components/Loader";

const ACTION_TYPES = {
  SET_COMMENT: "SET_COMMENT",
  SET_COMMENTS: "SET_COMMENTS",
  SET_USERS: "SET_USERS",
  SET_IS_LOADING: "SET_IS_LOADING",
};

const initialState = {
  comment: "",
  comments: [],
  users: [],
  isLoading: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.SET_COMMENT:
      return { ...state, comment: payload };
    case ACTION_TYPES.SET_COMMENTS:
      return { ...state, comments: payload };
    case ACTION_TYPES.SET_USERS:
      return { ...state, users: payload };
    case ACTION_TYPES.SET_IS_LOADING:
      return { ...state, isLoading: payload };
    default:
      return state;
  }
};

const CommentsScreen = ({ parentNavigation }) => {
  const { width } = useWindowDimensions();
  const route = useRoute();
  const post = route.params.post;
  const { id: postId, owner, imageURL } = post;
  const user = useSelector(getUser);

  const [state, dispatch] = useReducer(reducer, initialState);
  const isKeyboardShown = useIsKeyboardShown(false);

  const { comment, comments, users, isLoading } = state;

  const setComment = (comment) =>
    dispatch({ type: ACTION_TYPES.SET_COMMENT, payload: comment });
  const setComments = (comments) =>
    dispatch({ type: ACTION_TYPES.SET_COMMENTS, payload: comments });
  const setUsers = (users) =>
    dispatch({ type: ACTION_TYPES.SET_USERS, payload: users });
  const setIsLoading = (isLoading) =>
    dispatch({ type: ACTION_TYPES.SET_IS_LOADING, payload: isLoading });

  useEffect(() => {
    const commentsSubscription = db
      .firestore()
      .collection(DB_KEYS.COMMENTS)
      .onSnapshot(
        (data) =>
          setComments(
            data.docs
              .filter((doc) => doc.data()?.postId === postId)
              .map((doc) => ({ ...doc.data(), id: doc.id }))
          ),
        () => commentsSubscription()
      );
    return () => commentsSubscription();
  }, []);

  useEffect(() => {
    const usersSubscription = db
      .firestore()
      .collection(DB_KEYS.USERS)
      .onSnapshot((data) => setUsers(data.docs.map((doc) => doc.data())));

    return () => usersSubscription();
  }, []);

  useHideParentBottomBar({
    route,
    navigation: parentNavigation,
    name: "Comments",
  });

  const onAddComment = async () => {
    const newComment = {
      owner: user.id,
      postId,
      text: comment,
      time: Date.now(),
    };
    setIsLoading(true);
    const createdComment = await db
      .firestore()
      .collection(DB_KEYS.COMMENTS)
      .add(newComment);
    await db
      .firestore()
      .collection(DB_KEYS.POSTS)
      .doc(postId)
      .update({
        comments: [...comments.map((comment) => comment.id), createdComment.id],
      });
    setComment("");
    setIsLoading(false);
    Keyboard.dismiss();
  };

  const getAvatar = (uid) => users.find((user) => user?.uid === uid)?.avatarURL;

  if (isLoading) return <Loader text="Sending comment" />;

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
                  avatarURL={getAvatar(item.owner)}
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
