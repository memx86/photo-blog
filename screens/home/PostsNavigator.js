import { useNavigation } from "@react-navigation/native";
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
  const navigation = useNavigation();

  return (
    <PostsStack.Navigator screenOptions={{ ...headerStyle }}>
      <PostsStack.Screen
        name="Posts"
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
      >
        {() => <PostsScreen parentNavigation={navigation} />}
      </PostsStack.Screen>
      <PostsStack.Screen
        name="Comments"
        options={{
          title: "Комментарии",
          headerLeft: () => (
            <IconButton style={{ marginLeft: 16 }} onPress={onGoBack}>
              <Feather name="arrow-left" size={24} color="#212121CC" />
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
            <IconButton style={{ marginLeft: 16 }} onPress={onGoBack}>
              <Feather name="arrow-left" size={24} color="#212121CC" />
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
