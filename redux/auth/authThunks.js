import { createAsyncThunk } from "@reduxjs/toolkit";
import randomAvatar from "random-avatar";
import db from "../../firebase";

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);
      const user = db.auth().currentUser;
      const avatar = randomAvatar({
        email,
        protocol: "https",
        extension: "jpg",
      });

      await user.updateProfile({
        displayName: name,
        photoURL: avatar,
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
