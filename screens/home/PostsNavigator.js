import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";

import PostsScreen from "./posts/PostsScreen";
import CommentsScreen from "./posts/CommentsScreen";
import MapScreen from "./posts/MapScreen";
import IconButton from "../../components/IconButton";

import useHeaderStyle from "../../assets/hooks/useHeaderStyle";

const PostsStack = createNativeStackNavigator();

const PostsNavigator = ({ onLogout, onGoBack }) => {
  const headerStyle = useHeaderStyle();

  return (
    <PostsStack.Navigator screenOptions={{ ...headerStyle }}>
      <PostsStack.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публикации",
          headerRight: () => (
            <IconButton style={{ marginRight: 10 }} onPress={onLogout}>
              <Feather name="log-out" size={24} color="#212121CC" />
            </IconButton>
          ),
          tabBarIcon: ({ focused }) => (
            <Feather
              name="grid"
              size={24}
              color={focused ? "#212121CC" : "#21212177"}
            />
          ),
        }}
      />
      <PostsStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Комментарии",
        }}
      />
      <PostsStack.Screen name="Map" component={MapScreen} />
    </PostsStack.Navigator>
  );
};
export default PostsNavigator;
