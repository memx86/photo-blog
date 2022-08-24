import firebase from "firebase";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtsyX3A7fvNrvxlR-czjqybdHNHwRbgzU",
  authDomain: "rn-photo-blog.firebaseapp.com",
  projectId: "rn-photo-blog",
  storageBucket: "rn-photo-blog.appspot.com",
  messagingSenderId: "457840600019",
  appId: "1:457840600019:web:cc2f791f15e3a40358c526",
};

// Initialize Firebase
const db = firebase.initializeApp(firebaseConfig);

export default db;
