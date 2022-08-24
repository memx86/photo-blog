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

      return { id: uid, name: displayName, email, avatarURL: photoURL };
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    try {
      await db.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
  try {
    await db.auth().signOut();
  } catch (error) {
    console.log("error", error);
  }
});
