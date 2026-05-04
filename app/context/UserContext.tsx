import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type IUser from "~/interface/IUser";

export interface UserContextType {
//   isAuth:  boolean;
//   setAuth: () => void;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  // logout: () => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {}
});


export default UserContext