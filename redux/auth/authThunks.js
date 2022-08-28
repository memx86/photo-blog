import { createAsyncThunk } from "@reduxjs/toolkit";
import db from "../../firebase";

import uploadImage from "../../services/uploadImage";
import getDefaultAvatar from "../../services/getDefaultAvatar";

import DB_KEYS from "../../assets/constants/DB_KEYS";

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, email, password, image }, { rejectWithValue }) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);

      const user = db.auth().currentUser;
      const avatarURL = image
        ? await uploadImage({ uri: image, target: DB_KEYS.AVATARS })
        : getDefaultAvatar(email);

      await user.updateProfile({
        displayName: name,
        photoURL: avatarURL,
      });

      const { uid, displayName, photoURL } = db.auth().currentUser;
      await db
        .firestore()
        .collection(DB_KEYS.USERS)
        .add({ uid, avatarURL, name });

      return { id: uid, name: displayName, email, avatarURL: photoURL };
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await db.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      return rejectWithValue(error.code);
    }
  }
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
  try {
    await db.auth().signOut();
  } catch (error) {
    console.log(error);
  }
});
