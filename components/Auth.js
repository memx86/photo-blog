import { useEffect, useReducer } from "react";
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
} from "react-native";

export const TYPES = {
  REGISTER: "REGISTER",
  LOGIN: "LOGIN",
};

const initialState = {
  isKeyboardShown: false,
  login: "",
  email: "",
  password: "",
};
const ACTION_TYPES = {
  SET_IS_KEYBOARD_SHOWN: "SET_IS_KEYBOARD_SHOWN",
  SET_LOGIN: "SET_LOGIN",
  SET_EMAIL: "SET_EMAIL",
  SET_PASSWORD: "SET_PASSWORD",
  RESET: "RESET",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.SET_IS_KEYBOARD_SHOWN:
      return { ...state, isKeyboardShown: payload };
    case ACTION_TYPES.SET_LOGIN:
      return { ...state, login: payload };
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

const Auth = ({ type = TYPES.REGISTER }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isKeyboardShown, login, email, password } = state;

  const onFocus = () =>
    dispatch({ type: ACTION_TYPES.SET_IS_KEYBOARD_SHOWN, payload: true });

  const onLoginChange = (value) =>
    dispatch({ type: ACTION_TYPES.SET_LOGIN, payload: value });

  const onEmailChange = (value) =>
    dispatch({ type: ACTION_TYPES.SET_EMAIL, payload: value });

  const onPasswordChange = (value) =>
    dispatch({ type: ACTION_TYPES.SET_PASSWORD, payload: value });

  const closeKeyboard = () => Keyboard.dismiss();

  const onRegister = () => {
    console.log("login:", login);
    console.log("email:", email);
    console.log("password:", password);
  };

  const onLogin = () => {
    console.log("email:", email);
    console.log("password:", password);
  };

  const isRegister = type === TYPES.REGISTER;

  const onSubmit = isRegister ? onRegister : onLogin;

  const onBtnPress = () => {
    onSubmit();
    closeKeyboard();
    dispatch({ type: ACTION_TYPES.RESET });
  };

  const onKeyboardHide = () =>
    dispatch({
      type: ACTION_TYPES.SET_IS_KEYBOARD_SHOWN,
      payload: false,
    });

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", onKeyboardHide);

    return () => {
      Keyboard.removeListener("keyboardDidHide", onKeyboardHide);
    };
  }, []);

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
              <View style={s.formWrapper}>
                <Text style={s.title}>
                  {isRegister ? "Регистрация" : "Логин"}
                </Text>
                {type === TYPES.REGISTER && (
                  <TextInput
                    style={s.input}
                    placeholder="Логин"
                    placeholderTextColor="#BDBDBD"
                    onFocus={onFocus}
                    onChangeText={onLoginChange}
                    value={login}
                  />
                )}
                <TextInput
                  style={s.input}
                  placeholder="Адрес электронной почты"
                  placeholderTextColor="#BDBDBD"
                  onFocus={onFocus}
                  onChangeText={onEmailChange}
                  value={email}
                />
                <TextInput
                  style={s.input}
                  secureTextEntry={true}
                  textContentType="newPassword"
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  onFocus={onFocus}
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
                <Text style={s.text}>
                  {isRegister
                    ? "Уже есть аккаунт?"
                    : "Нет аккаунта? Зарегистрироваться"}
                </Text>
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
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  formWrapper: {
    marginHorizontal: 16,
    paddingBottom: 45,
    width: "100%",
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
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
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
    backgroundColor: "#FF6C00",
  },
  btnText: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#FFFFFF",
  },
  text: {
    marginTop: 16,
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#1B4371",
  },
});

export default Auth;
