import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";

import { logoutUser } from "../../redux/auth";

import PostsScreen from "./posts/PostsScreen";
import CommentsScreen from "./posts/CommentsScreen";
import MapScreen from "./posts/MapScreen";
import IconButton from "../../components/IconButton";

import useHeaderStyle from "../../assets/hooks/useHeaderStyle";
import COLORS from "../../assets/constants/COLORS";

const PostsStack = createNativeStackNavigator();

const PostsNavigator = ({ onGoBack }) => {
  const headerStyle = useHeaderStyle();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onLogout = () => dispatch(logoutUser());

  return (
    <PostsStack.Navigator screenOptions={{ ...headerStyle }}>
      <PostsStack.Screen
        name="Posts"
        options={{
          title: "Публикации",
          headerRight: () => (
            <IconButton style={{ marginRight: 10 }} onPress={onLogout}>
              <Feather
                name="log-out"
                size={24}
                color={`${COLORS.MAIN_DARK}CC`}
              />
            </IconButton>
          ),
          tabBarIcon: ({ focused }) => (
            <Feather
              name="grid"
              size={24}
              color={
                focused ? `${COLORS.MAIN_DARK}CC` : `${COLORS.MAIN_DARK}77`
              }
            />
          ),
        }}
      >
        {() => <PostsScreen parentNavigation={navigation} />}
      </PostsStack.Screen>
      <PostsStack.Screen
        name="Comments"
        options={{
          title: "Комментарии",
          headerLeft: () => (
            <IconButton onPress={onGoBack}>
              <Feather
                name="arrow-left"
                size={24}
                color={`${COLORS.MAIN_DARK}CC`}
              />
            </IconButton>
          ),
        }}
      >
        {() => <CommentsScreen parentNavigation={navigation} />}
      </PostsStack.Screen>
      <PostsStack.Screen
        name="Map"
        options={{
          title: "Карта",
          headerLeft: () => (
            <IconButton onPress={onGoBack}>
              <Feather
                name="arrow-left"
                size={24}
                color={`${COLORS.MAIN_DARK}CC`}
              />
            </IconButton>
          ),
        }}
      >
        {() => <MapScreen parentNavigation={navigation} />}
      </PostsStack.Screen>
    </PostsStack.Navigator>
  );
};
export default PostsNavigator;
