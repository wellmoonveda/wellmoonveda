import { createContext, useContext } from "react";
import type { AuthContextValue } from "../types/auth.types";

export const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuthContext = () => useContext(AuthContext);
