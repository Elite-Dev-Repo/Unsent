import { useContext } from "react";
import { AuthContext } from "./AuthContx";

export const useAuth = () => {
  return useContext(AuthContext);
};
