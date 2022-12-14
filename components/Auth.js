import { useReducer } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import useIsKeyboardShown from "../assets/hooks/useIsKeyboardShown";
import {
  getErrorCode,
  getIsError,
  loginUser,
  registerUser,
} from "../redux/auth";

import AvatarPicker from "./AvatarPicker";

import COLORS from "../assets/constants/COLORS";
import useGetAuthErrorMessage from "../services/useGetAuthErrorMessage";
import ErrorMessage from "./ErrorMessage";

export const TYPES = {
  REGISTER: "REGISTER",
  LOGIN: "LOGIN",
};

const initialState = {
  image: "",
  name: "",
  email: "",
  password: "",
};
const ACTION_TYPES = {
  SET_IMAGE: "SET_IMAGE",
  SET_NAME: "SET_NAME",
  SET_EMAIL: "SET_EMAIL",
  SET_PASSWORD: "SET_PASSWORD",
  RESET: "RESET",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.SET_IMAGE:
      return { ...state, image: payload };
    case ACTION_TYPES.SET_NAME:
      return { ...state, name: payload };
    case ACTION_TYPES.SET_EMAIL:
      return { ...state, email: payload };
    case ACTION_TYPES.SET_PASSWORD:
      return { ...state, password: payload };
    case ACTION_TYPES.RESET:
      return { ...initialState };
    default:
      return state;
  }
};

const Auth = ({ type = TYPES.REGISTER, navigation }) => {
  const [state, localDispatch] = useReducer(reducer, initialState);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const isKeyboardShown = useIsKeyboardShown(false);
  const isError = useSelector(getIsError);
  const errorMessage = useGetAuthErrorMessage();
  const { image, name, email, password } = state;

  const setImage = (image) =>
    localDispatch({ type: ACTION_TYPES.SET_IMAGE, payload: image });

  const onNameChange = (name) =>
    localDispatch({ type: ACTION_TYPES.SET_NAME, payload: name });

  const onEmailChange = (email) =>
    localDispatch({ type: ACTION_TYPES.SET_EMAIL, payload: email });

  const onPasswordChange = (password) =>
    localDispatch({ type: ACTION_TYPES.SET_PASSWORD, payload: password });

  const closeKeyboard = () => Keyboard.dismiss();

  const onRegister = () => {
    dispatch(registerUser({ name, email, password, image }));
  };

  const onLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  const isRegister = type === TYPES.REGISTER;

  const onSubmit = isRegister ? onRegister : onLogin;

  const onBtnPress = () => {
    onSubmit();
    closeKeyboard();
    localDispatch({ type: ACTION_TYPES.RESET });
  };

  const onLinkPress = () =>
    navigation.navigate(isRegister ? "Login" : "Registration");

  return (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
      <View style={s.container}>
        <ImageBackground
          source={require("../assets/images/PhotoBG.jpg")}
          style={s.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.select({ android: undefined, ios: "padding" })}
          >
            <View
              style={{
                ...s.form,
                ...Platform.select({
                  android: { marginBottom: isKeyboardShown ? -150 : 0 },
                  ios: { marginBottom: isKeyboardShown ? 150 : 0 },
                }),
              }}
            >
              <View style={{ ...s.formWrapper, width: width - 16 * 2 }}>
                {isRegister && (
                  <AvatarPicker
                    style={s.avatar}
                    image={image}
                    setImage={setImage}
                  />
                )}
                <Text style={s.title}>
                  {isRegister ? "??????????????????????" : "??????????"}
                </Text>
                {type === TYPES.REGISTER && (
                  <TextInput
                    style={s.input}
                    placeholder="??????????"
                    placeholderTextColor={COLORS.GREY}
                    onChangeText={onNameChange}
                    value={name}
                  />
                )}
                <TextInput
                  style={s.input}
                  placeholder="?????????? ?????????????????????? ??????????"
                  placeholderTextColor={COLORS.GREY}
                  onChangeText={onEmailChange}
                  value={email}
                />
                <TextInput
                  style={s.input}
                  secureTextEntry={true}
                  textContentType="newPassword"
                  placeholder="????????????"
                  placeholderTextColor={COLORS.GREY}
                  onChangeText={onPasswordChange}
                  value={password}
                />
                {isError && (
                  <ErrorMessage style={s.error} message={errorMessage} />
                )}
                <TouchableOpacity
                  style={s.btn}
                  activeOpacity={0.7}
                  onPress={onBtnPress}
                >
                  <Text style={s.btnText}>
                    {isRegister ? "????????????????????????????????????" : "??????????"}
                  </Text>
                </TouchableOpacity>
                <View style={s.linkWrapper}>
                  <Text style={s.text}>
                    {isRegister ? "?????? ???????? ??????????????? " : "?????? ????????????????? "}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={s.link}
                    onPress={onLinkPress}
                  >
                    <Text style={s.text}>
                      {isRegister ? "??????????" : "????????????????????????????????????"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    alignItems: "center",
    backgroundColor: COLORS.MAIN_LIGHT,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  formWrapper: {
    position: "relative",
    marginHorizontal: 16,
    paddingBottom: 45,
    maxWidth: 400,
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -60 }],
  },
  title: {
    marginTop: 92,
    marginBottom: 32,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
  },
  input: {
    marginBottom: 16,
    padding: 16,
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: COLORS.THIRD_GREY,
    borderRadius: 8,
    backgroundColor: COLORS.SECONDARY_GREY,
    fontFamily: "Roboto",
    fontSize: 16,
  },
  error: { marginTop: 16 },
  btn: {
    marginTop: 43,
    height: 51,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 100,
    backgroundColor: COLORS.ACCENT,
  },
  btnText: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: COLORS.MAIN_LIGHT,
  },
  linkWrapper: {
    marginTop: 16,
    flexDirection: "row",
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: COLORS.SECONDARY_ACCENT,
  },
  link: {
    marginLeft: 8,
  },
});

export default Auth;
