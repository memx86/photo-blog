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
import { useDispatch } from "react-redux";

import useIsKeyboardShown from "../assets/hooks/useIsKeyboardShown";
import { loginUser, registerUser } from "../redux/auth";

import COLORS from "../assets/constants/COLORS";

export const TYPES = {
  REGISTER: "REGISTER",
  LOGIN: "LOGIN",
};

const initialState = {
  name: "",
  email: "",
  password: "",
};
const ACTION_TYPES = {
  SET_NAME: "SET_NAME",
  SET_EMAIL: "SET_EMAIL",
  SET_PASSWORD: "SET_PASSWORD",
  RESET: "RESET",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
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
  const { name, email, password } = state;

  const onNameChange = (value) =>
    localDispatch({ type: ACTION_TYPES.SET_NAME, payload: value });

  const onEmailChange = (value) =>
    localDispatch({ type: ACTION_TYPES.SET_EMAIL, payload: value });

  const onPasswordChange = (value) =>
    localDispatch({ type: ACTION_TYPES.SET_PASSWORD, payload: value });

  const closeKeyboard = () => Keyboard.dismiss();

  const onRegister = () => {
    dispatch(registerUser({ name, email, password }));
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
                <Text style={s.title}>
                  {isRegister ? "Регистрация" : "Логин"}
                </Text>
                {type === TYPES.REGISTER && (
                  <TextInput
                    style={s.input}
                    placeholder="Логин"
                    placeholderTextColor={COLORS.GREY}
                    onChangeText={onNameChange}
                    value={name}
                  />
                )}
                <TextInput
                  style={s.input}
                  placeholder="Адрес электронной почты"
                  placeholderTextColor={COLORS.GREY}
                  onChangeText={onEmailChange}
                  value={email}
                />
                <TextInput
                  style={s.input}
                  secureTextEntry={true}
                  textContentType="newPassword"
                  placeholder="Пароль"
                  placeholderTextColor={COLORS.GREY}
                  onChangeText={onPasswordChange}
                  value={password}
                />
                <TouchableOpacity
                  style={s.btn}
                  activeOpacity={0.7}
                  onPress={onBtnPress}
                >
                  <Text style={s.btnText}>
                    {isRegister ? "Зарегистрироваться" : "Войти"}
                  </Text>
                </TouchableOpacity>
                <View style={s.linkWrapper}>
                  <Text style={s.text}>
                    {isRegister ? "Уже есть аккаунт? " : "Нет аккаунта? "}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={s.link}
                    onPress={onLinkPress}
                  >
                    <Text style={s.text}>
                      {isRegister ? "Войти" : "Зарегистрироваться"}
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
    marginHorizontal: 16,
    paddingBottom: 45,
    maxWidth: 400,
    alignItems: "center",
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
