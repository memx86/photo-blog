import {
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import useIsKeyboardShown from "../../assets/hooks/useIsKeyboardShown";

const CreatePostsScreen = () => {
  const { width } = useWindowDimensions();
  const isKeyboardShown = useIsKeyboardShown(false);

  const closeKeyboard = () => Keyboard.dismiss();

  return (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ android: "height", ios: "padding" })}
      >
        <ScrollView
          style={s.container}
          scrollEnabled={isKeyboardShown ? true : false}
        >
          <View style={{ marginBottom: isKeyboardShown ? 150 : 0 }}>
            <TouchableOpacity activeOpacity={0.7}>
              <View
                style={{
                  ...s.imageWrapper,
                  width: width - 16 * 2,
                  height: (width - 16 * 2) / 1.43,
                }}
              >
                <View style={s.cameraImageWrapper}>
                  <Image
                    source={require("../../assets/images/camera.png")}
                    style={s.cameraImage}
                  />
                </View>
              </View>
              <Text style={s.imageText}>Загрузите фото</Text>
            </TouchableOpacity>
            <View style={s.inputWrapper}>
              <TextInput
                style={s.input}
                placeholder="Название..."
                placeholderTextColor="#BDBDBD"
              />
              <View style={s.locationInputWrapper}>
                <TextInput
                  style={{ ...s.input, paddingLeft: 28 }}
                  placeholder="Местность..."
                  placeholderTextColor="#BDBDBD"
                />
                <Feather
                  name="map-pin"
                  size={24}
                  color="#BDBDBD"
                  style={s.locationIcon}
                />
              </View>
            </View>
            <TouchableOpacity style={s.btn} activeOpacity={0.7}>
              <Text style={s.btnText}>Опубликовать</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const s = StyleSheet.create({
  container: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#ffffff",
  },
  imageWrapper: {
    backgroundColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraImageWrapper: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#ffffff",
  },
  cameraImage: {
    width: 24,
    height: 24,
  },
  imageText: {
    marginTop: 8,
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  inputWrapper: {
    marginTop: 32,
    marginBottom: 32,
  },
  input: {
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  locationInputWrapper: {
    position: "relative",
    marginTop: 16,
  },
  locationIcon: {
    position: "absolute",
    top: 20,
    left: 0,
  },
  btn: {
    height: 51,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  btnText: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
    color: "#ffffff",
  },
});

export default CreatePostsScreen;
