import { StyleSheet, View, Image, Text } from "react-native";

const UserCard = ({ user, style }) => {
  const { avatarURL, name, email } = user;
  return (
    <View style={{ ...s.container, ...style }}>
      <Image source={{ uri: avatarURL }} style={s.image} />
      <View style={s.wrapper}>
        <Text style={s.name}>{name}</Text>
        <Text style={s.email}>{email}</Text>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 16,
  },
  wrapper: {},
  name: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  email: {
    fontFamily: "Roboto",
    fontSize: 11,
    lineHeight: 13,
    color: "#212121CC",
  },
});

export default UserCard;
