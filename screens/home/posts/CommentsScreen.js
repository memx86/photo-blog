import { useContext, useState } from "react";
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

import { getUser } from "../../../redux/auth";

import Comment from "../../../components/Comment";

import useHideParentBottomBar from "../../../assets/hooks/useHideParentBottomBar";
import useIsKeyboardShown from "../../../assets/hooks/useIsKeyboardShown";

const CommentsScreen = ({ parentNavigation }) => {
  const { width } = useWindowDimensions();
  const route = useRoute();
  const post = route.params.post;
  const { imageURL, comments: initialComments, owner } = post;
  const user = useSelector(getUser);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(initialComments);

  const isKeyboardShown = useIsKeyboardShown(false);

  useHideParentBottomBar({
    route,
    navigation: parentNavigation,
    name: "Comments",
  });

  const onAddComment = () => {
    const newComment = {
      id: Date.now(),
      owner: user.id,
      text: comment,
      time: Date.now(),
    };
    setComments([...comments, newComment]);
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
              placeholderTextColor="#BDBDBD"
              onChangeText={setComment}
              value={comment}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={s.icon}
              onPress={onAddComment}
            >
              <Feather name="arrow-up" size={14} color="#ffffff" />
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
    backgroundColor: "#ffffff",
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
    borderColor: "#E8E8E8",
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  icon: {
    position: "absolute",
    top: 12,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommentsScreen;
