import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

import useHideParentBottomBar from "../../../assets/hooks/useHideParentBottomBar";

const CommentsScreen = ({ parentNavigation }) => {
  const route = useRoute();
  useHideParentBottomBar({
    route,
    navigation: parentNavigation,
    name: "Comments",
  });

  return (
    <View>
      <Text>CommentsScreen</Text>
    </View>
  );
};
export default CommentsScreen;
