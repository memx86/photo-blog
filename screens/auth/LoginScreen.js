import Auth, { TYPES } from "../../components/Auth";

const LoginScreen = ({ navigation }) => {
  return <Auth type={TYPES.LOGIN} navigation={navigation} />;
};

export default LoginScreen;
