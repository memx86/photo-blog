import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  //   useWindowDimensions,
} from "react-native";

const RegistrationScreen = () => {
  //   const width = useWindowDimensions().width;
  return (
    <View style={s.container}>
      <ImageBackground
        source={require("../assets/images/PhotoBG.jpg")}
        style={s.image}
      >
        <View style={s.form}>
          <View style={s.formWrapper}>
            <Text style={s.title}>Регистрация</Text>
            <TextInput
              style={s.input}
              placeholder="Логин"
              placeholderTextColor="#BDBDBD"
            />
            <TextInput
              style={s.input}
              placeholder="Адрес электронной почты"
              placeholderTextColor="#BDBDBD"
            />
            <TextInput
              style={s.input}
              secureTextEntry={true}
              textContentType="newPassword"
              placeholder="Пароль"
              placeholderTextColor="#BDBDBD"
            />
            <TouchableOpacity style={s.btn}>
              <Text style={s.btnText}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <Text style={s.text}>Уже есть аккаунт? Войти</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
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
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  formWrapper: {
    marginHorizontal: 16,
    paddingBottom: 45,
    alignItems: "center",
  },
  title: {
    marginTop: 92,
    marginBottom: 32,
    fontSize: 30,
    // fontWeight: 500,
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
    color: "#FFFFFF",
  },
  text: {
    marginTop: 16,
    color: "#1B4371",
  },
});

export default RegistrationScreen;
