import { useSelector } from "react-redux";
import { getErrorCode } from "../redux/auth";

const useGetAuthErrorMessage = () => {
  const errorCode = useSelector(getErrorCode);
  switch (errorCode) {
    case "auth/wrong-password":
      return "Wrong email/password. Please try again";
    case "auth/network-request-failed":
      return "Can't connect to server";
    case "auth/too-many-requests":
      return "Request blocked. Please try again later";
    case "auth/user-disabled":
      return "User disabled";
    case "auth/user-token-expired":
      return "User deleted";
    default:
      return "Can't perform operation. Please try again later";
  }
};

export default useGetAuthErrorMessage;
