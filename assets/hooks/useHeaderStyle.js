import { Platform } from "react-native";

const useHeaderStyle = () => ({
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
});
export default useHeaderStyle;
