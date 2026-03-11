import { useAuthContext } from "../context/AuthContext";

export const useAuthUser = () => {
  return useAuthContext();
};
