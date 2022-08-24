import randomAvatar from "random-avatar";

const getDefaultAvatar = (email) =>
  randomAvatar({
    email,
    protocol: "https",
    extension: "jpg",
  });

export default getDefaultAvatar;
