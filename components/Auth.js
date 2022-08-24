import { useReducer, useContext } from "react";
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
import { useDispatch } from "react-redux";

import useIsKeyboardShown from "../assets/hooks/useIsKeyboardShown";
import { loginUser, registerUser } from "../redux/auth";

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
              <View style={s.formWrapper}>
                <Text style={s.title}>
                  {isRegister ? "Регистрация" : "Логин"}
                </Text>
                {type === TYPES.REGISTER && (
                  <TextInput
                    style={s.input}
                    placeholder="Логин"
                    placeholderTextColor="#BDBDBD"
                    onChangeText={onNameChange}
                    value={name}
                  />
                )}
                <TextInput
                  style={s.input}
                  placeholder="Адрес электронной почты"
                  placeholderTextColor="#BDBDBD"
                  onChangeText={onEmailChange}
                  value={email}
                />
                <TextInput
                  style={s.input}
                  secureTextEntry={true}
                  textContentType="newPassword"
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
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
  linkWrapper: {
    marginTop: 16,
    flexDirection: "row",
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 16,
    color: "#1B4371",
  },
  link: {
    marginLeft: 8,
  },
});

export default Auth;
