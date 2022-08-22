import { useContext } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  ImageBackground,
  Image,
  Text,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import AuthContext from "../../assets/context/AuthContext";
import IconButton from "../../components/IconButton";
import PostsList from "../../components/PostsList";
import { TYPES } from "../../components/Post";

const ProfileScreen = ({ navigation }) => {
  const { setIsAuth, user } = useContext(AuthContext);
  const { width } = useWindowDimensions();
  const { avatarURL, name } = user;

  const onLogout = () => setIsAuth(false);

  // test posts
  const posts = [
    {
      id: "2",
      imageURL:
        "https://s2.reutersmedia.net/resources/r/?m=02&d=20220420&t=2&i=1597571295&w=780&fh=&fw=&ll=&pl=&sq=&r=2022-04-20T202111Z_18429_MRPRC2C6T9OLXEP_RTRMADP_0_UKRAINE-CRISIS-KYIV-DEFENCE",
      title: "Test 2",
      comments: [],
      location: "Test region 2, test country 2",
      likes: 10,
    },
    {
      id: "3",
      imageURL:
        "https://s3.reutersmedia.net/resources/r/?m=02&d=20220420&t=2&i=1597571288&w=780&fh=&fw=&ll=&pl=&sq=&r=2022-04-20T202111Z_18429_MRPRC22BT93OGNO_RTRMADP_0_UKRAINE-CRISIS-KYIV-REGION",
      title: "Test 3",
      comments: [{}, {}, {}, {}],
      location: "Test region 3, test country 3",
      likes: 123,
    },
  ];

  return (
    <ScrollView style={s.container}>
      <ImageBackground
        source={require("../../assets/images/PhotoBG.jpg")}
        style={s.image}
      >
        <View style={s.wrapper}>
          <Image
            source={{ uri: avatarURL }}
            style={{ ...s.avatar, left: width / 2 - 60 }}
          />
          <IconButton onPress={onLogout} style={s.btn}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </IconButton>
          <Text style={s.name}>{name}</Text>
          <PostsList
            posts={posts}
            type={TYPES.PROFILE}
            navigation={navigation}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapper: {
    position: "relative",
    marginTop: 147,
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#ffffff",
  },
  avatar: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  btn: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  name: {
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.3,
    textAlign: "center",
  },
});

export default ProfileScreen;
