import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

import AddPostIcon from "../../components/AddPostIcon";
import IconButton from "../../components/IconButton";

const Main = createBottomTabNavigator();

const Home = ({ onLogout, onGoBack }) => {
  return (
    <Main.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerStyle: {
          backgroundColor: "#ffffff",
          ...Platform.select({
            ios: {
              shadowOffset: { width: 0, height: 0.5 },
              shadowOpacity: 0.2,
              shadowRadius: 0,
              shadowColor: "#000000",
            },
            android: {
              shadowColor: "#000000",
              elevation: 10,
            },
          }),
        },
        headerTitleAlign: "center",
        headerTitleContainerStyle: {
          height: 44,
          paddingTop: 11,
          paddingBottom: 11,
        },
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          fontSize: 17,
          lineHeight: 22,
          color: "#212121",
        },
      }}
    >
      <Main.Screen
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
      <Main.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: "Создать публикацию",
          headerLeft: () => (
            <IconButton style={{ marginLeft: 16 }} onPress={onGoBack}>
              <Feather name="arrow-left" size={24} color="#212121CC" />
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
              color={focused ? "#212121CC" : "#21212177"}
            />
          ),
        }}
      />
    </Main.Navigator>
  );
};
export default Home;
