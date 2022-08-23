import users from "../users";

const getUserAvatar = (userId) =>
  users.find(({ id }) => id === userId)?.avatarURL;

export default getUserAvatar;
