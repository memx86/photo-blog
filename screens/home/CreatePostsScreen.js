import { useState, useReducer } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Text,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { Feather } from "@expo/vector-icons";

import db from "../../firebase";

import { getUser } from "../../redux/auth";

import Loader from "../../components/Loader";
import CameraIcon from "../../components/CameraIcon";

import useIsKeyboardShown from "../../assets/hooks/useIsKeyboardShown";
import uploadImage from "../../services/uploadImage";
import DB_KEYS from "../../assets/constants/DB_KEYS";
import COLORS from "../../assets/constants/COLORS";

const ACTION_TYPES = {
  SET_IS_CAMERA_ACTIVE: "SET_IS_CAMERA_ACTIVE",
  SET_PHOTO: "SET_PHOTO",
  SET_TITLE: "SET_TITLE",
  SET_LOCATION_NAME: "SET_LOCATION_NAME",
  SET_LOCATION: "SET_LOCATION",
  SET_IS_LOADING: "SET_IS_LOADING",
  RESET: "RESET",
};

const initialState = {
  isCameraActive: false,
  photo: null,
  title: "",
  locationName: "",
  location: {
    latitude: null,
    longitude: null,
  },
  isLoading: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.SET_IS_CAMERA_ACTIVE:
      return { ...state, isCameraActive: payload };
    case ACTION_TYPES.SET_PHOTO:
      return { ...state, photo: payload };
    case ACTION_TYPES.SET_TITLE:
      return { ...state, title: payload };
    case ACTION_TYPES.SET_LOCATION_NAME:
      return { ...state, locationName: payload };
    case ACTION_TYPES.SET_LOCATION:
      return { ...state, location: payload };
    case ACTION_TYPES.SET_IS_LOADING:
      return { ...state, isLoading: payload };
    case ACTION_TYPES.RESET:
      return { ...initialState };
    default:
      return state;
  }
};

const CreatePostsScreen = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [state, dispatch] = useReducer(reducer, initialState);
  const isKeyboardShown = useIsKeyboardShown(false);
  const [camera, setCamera] = useState(null);
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [locationPermission, requestLocationPermission] =
    Location.useForegroundPermissions();

  const user = useSelector(getUser);

  const imageStyle = {
    width: width - 16 * 2,
    height: (width - 16 * 2) / 1.43,
    justifyContent: "center",
    alignItems: "center",
  };

  const { isCameraActive, photo, title, locationName, location, isLoading } =
    state;

  const isValidData =
    !!photo &&
    !!title &&
    !!locationName &&
    !!location.latitude &&
    !!location.longitude;

  const closeKeyboard = () => Keyboard.dismiss();

  const openCamera = () =>
    dispatch({ type: ACTION_TYPES.SET_IS_CAMERA_ACTIVE, payload: true });
  const closeCamera = () =>
    dispatch({ type: ACTION_TYPES.SET_IS_CAMERA_ACTIVE, payload: false });

  const setIsLoading = (payload) =>
    dispatch({ type: ACTION_TYPES.SET_IS_LOADING, payload });

  const makePicture = async () => {
    try {
      if (!cameraPermission.granted) {
        await requestCameraPermission();
      }
      if (!locationPermission.granted) {
        await requestLocationPermission();
      }
      const { uri } = await camera.takePictureAsync();
      setIsLoading(true);
      const { coords } = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = coords;

      dispatch({
        type: ACTION_TYPES.SET_PHOTO,
        payload: uri,
      });
      dispatch({
        type: ACTION_TYPES.SET_LOCATION,
        payload: { latitude, longitude },
      });
      setIsLoading(false);
      closeCamera();
    } catch (error) {
      closeCamera();
    }
  };

  const onTitleChange = (value) =>
    dispatch({ type: ACTION_TYPES.SET_TITLE, payload: value });
  const onLocationNameChange = (value) =>
    dispatch({ type: ACTION_TYPES.SET_LOCATION_NAME, payload: value });

  const onSubmitPost = async () => {
    setIsLoading(true);
    const imageURL = await uploadImage({
      uri: photo,
      target: DB_KEYS.POST_IMAGES,
    });
    const userId = user.id;
    const post = {
      imageURL,
      title,
      locationName,
      location,
      owner: userId,
      comments: [],
      likes: 0,
    };
    await db.firestore().collection(DB_KEYS.POSTS).add(post);
    dispatch({ type: ACTION_TYPES.RESET });
    navigation.navigate("Posts");
  };

  if (!isCameraActive && isLoading)
    return <Loader text="Sending post to server" />;

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
            {isCameraActive &&
              (isLoading ? (
                <Loader
                  style={{ ...imageStyle, ...s.cameraLoader }}
                  text="Saving Image..."
                />
              ) : (
                <Camera style={imageStyle} ref={setCamera}>
                  <TouchableOpacity activeOpacity={0.7} onPress={makePicture}>
                    <CameraIcon />
                  </TouchableOpacity>
                </Camera>
              ))}
            {!isCameraActive && (
              <TouchableOpacity activeOpacity={0.7} onPress={openCamera}>
                {!photo && (
                  <View
                    style={{
                      ...s.imageWrapper,
                      ...imageStyle,
                    }}
                  >
                    <CameraIcon />
                  </View>
                )}
                {photo && (
                  <ImageBackground source={{ uri: photo }} style={imageStyle}>
                    <CameraIcon />
                  </ImageBackground>
                )}
              </TouchableOpacity>
            )}
            <Text style={s.imageText}>
              {!photo ? "?????????????????? ????????" : "?????????????????????????? ????????"}
            </Text>
            <View style={s.inputWrapper}>
              <TextInput
                style={s.input}
                placeholder="????????????????..."
                placeholderTextColor={COLORS.GREY}
                value={title}
                onChangeText={onTitleChange}
              />
              <View style={s.locationInputWrapper}>
                <TextInput
                  style={{ ...s.input, paddingLeft: 28 }}
                  placeholder="??????????????????..."
                  placeholderTextColor={COLORS.GREY}
                  value={locationName}
                  onChangeText={onLocationNameChange}
                />
                <Feather
                  name="map-pin"
                  size={24}
                  color={COLORS.GREY}
                  style={s.locationIcon}
                />
              </View>
            </View>
            {isValidData ? (
              <TouchableOpacity
                style={s.btn}
                activeOpacity={0.7}
                onPress={onSubmitPost}
              >
                <Text style={s.btnText}>????????????????????????</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ ...s.btn, opacity: 0.5 }}>
                <Text style={s.btnText}>????????????????????????</Text>
              </View>
            )}
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
    backgroundColor: COLORS.MAIN_LIGHT,
  },
  cameraLoader: {
    flex: 0,
  },
  imageWrapper: {
    backgroundColor: COLORS.THIRD_GREY,
  },
  imageText: {
    marginTop: 8,
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
    color: COLORS.GREY,
  },
  inputWrapper: {
    marginTop: 32,
    marginBottom: 32,
  },
  input: {
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.THIRD_GREY,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: COLORS.MAIN_DARK,
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
    backgroundColor: COLORS.ACCENT,
  },
  btnText: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
    color: COLORS.MAIN_LIGHT,
  },
});

export default CreatePostsScreen;
