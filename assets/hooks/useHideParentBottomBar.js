import { useLayoutEffect } from "react";

const useHideParentBottomBar = ({ route, navigation, name }) => {
  useLayoutEffect(() => {
    if (route.name !== name) return;
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });
  }, [route, navigation, name]);
};
export default useHideParentBottomBar;
