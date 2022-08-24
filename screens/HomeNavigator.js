import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import PostsNavigator from "./home/PostsNavigator";
import CreatePostsScreen from "./home/CreatePostsScreen";
import ProfileScreen from "./home/ProfileScreen";

import AddPostIcon from "../components/AddPostIcon";
import IconButton from "../components/IconButton";

import useHeaderStyle from "../assets/hooks/useHeaderStyle";
import COLORS from "../assets/constants/COLORS";

const Main = createBottomTabNavigator();

const HomeNavigator = ({ onGoBack }) => {
  const headerStyle = useHeaderStyle();
  return (
    <Main.Navigator
      screenOptions={{
        ...headerStyle,
        tabBarShowLabel: false,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              shadowOffset: { width: 0, height: -0.5 },
              shadowOpacity: 0.3,
              shadowRadius: 0,
              shadowColor: "#000000",
            },
            android: {
              shadowColor: "#000000",
              elevation: 20,
            },
          }),
        },
      }}
    >
      <Main.Screen
        name="PostsScreen"
        options={{
          headerShown: false,
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
        {() => <PostsNavigator onGoBack={onGoBack} />}
      </Main.Screen>
      <Main.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: "Создать публикацию",
          headerLeft: () => (
            <IconButton style={{ marginLeft: 16 }} onPress={onGoBack}>
              <Feather
                name="arrow-left"
                size={24}
                color={`${COLORS.MAIN_DARK}CC`}
              />
            </IconButton>
          ),
          tabBarIcon: () => <AddPostIcon />,
          tabBarStyle: { display: "none" },
        }}
      />
      <Main.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Feather
              name="user"
              size={24}
              color={
                focused ? `${COLORS.MAIN_DARK}CC` : `${COLORS.MAIN_DARK}77`
              }
            />
          ),
        }}
      />
    </Main.Navigator>
  );
};
export default HomeNavigator;
