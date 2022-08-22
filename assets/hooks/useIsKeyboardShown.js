import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const useIsKeyboardShown = (initialValue) => {
  const [isKeyboardShown, setIsKeyboardShown] = useState(initialValue);

  const onKeyboardShow = () => setIsKeyboardShown(true);

  const onKeyboardHide = () => setIsKeyboardShown(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      onKeyboardShow
    );
    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      onKeyboardHide
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return isKeyboardShown;
};

export default useIsKeyboardShown;
