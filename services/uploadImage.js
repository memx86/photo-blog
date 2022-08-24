import { nanoid } from "@reduxjs/toolkit";

import db from "../firebase";

const uploadImage = async ({ uri, target }) => {
  const filename = nanoid();

  const resource = await fetch(uri);
  const file = await resource.blob();

  await db.storage().ref(`${target}/${filename}`).put(file);
  const processedImage = await db
    .storage()
    .ref(target)
    .child(filename)
    .getDownloadURL();
  return processedImage;
};

export default uploadImage;
