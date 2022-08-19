import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./screens/auth/LoginScreen";
import RegistrationScreen from "./screens/auth/RegistrationScreen";
import PostsScreen from "./screens/main/PostsScreen";
import CreatePostsScreen from "./screens/main/CreatePostsScreen";
import ProfileScreen from "./screens/main/ProfileScreen";

const Auth = createNativeStackNavigator();
const Main = createBottomTabNavigator();

const useNavigator = (isAuth) => {
  if (!isAuth)
    return (
      <Auth.Navigator screenOptions={{ headerShown: false }}>
        <Auth.Screen name="Login" component={LoginScreen} />
        <Auth.Screen name="Registration" component={RegistrationScreen} />
      </Auth.Navigator>
    );
  return (
    <Main.Navigator>
      <Main.Screen name="Posts" component={PostsScreen} />
      <Main.Screen name="CreatePosts" component={CreatePostsScreen} />
      <Main.Screen name="Profile" component={ProfileScreen} />
    </Main.Navigator>
  );
};

export default useNavigator;
