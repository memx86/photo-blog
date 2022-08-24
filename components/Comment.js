import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import dayjs from "dayjs";

const Comment = ({ style = {}, comment, isLeft }) => {
  const { width } = useWindowDimensions();
  const { text, time, avatarURL } = comment;

  return (
    <View
      style={{
        ...s.container,
        ...style,
        flexDirection: isLeft ? "row" : "row-reverse",
      }}
    >
      <Image
        style={{
          ...s.image,
          marginRight: isLeft ? 16 : 0,
          marginLeft: !isLeft ? 16 : 0,
        }}
        source={{ uri: avatarURL }}
      />
      <View
        style={{
          ...s.textWrapper,
          borderTopLeftRadius: isLeft ? 0 : 6,
          borderTopRightRadius: !isLeft ? 0 : 6,
          width: width - 16 * 2 - 28 - 16,
        }}
      >
        <Text style={s.text}>{text}</Text>
        <Text style={s.time}>
          {dayjs(time).format("DD.MMMM, YYYY | HH:mm")}
        </Text>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {},
  image: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  textWrapper: {
    padding: 16,
    backgroundColor: "#00000011",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  time: {
    marginTop: 8,
    fontFamily: "Roboto",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
    textAlign: "right",
  },
});

export default Comment;
