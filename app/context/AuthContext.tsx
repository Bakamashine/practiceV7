import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type IUser from "~/interface/IUser";

export interface AuthContextType {
  isAuth:  boolean;
  setAuth: (status: boolean) => void;
  accessToken?: string;
    setAccessToken: (value:string) => void

  // user: IUser | null;
  // setUser: (user: IUser | null) => void;
  // logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setAuth: () => {},
  accessToken: undefined,
  setAccessToken: () => {}
});


export default AuthContext

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [token, setToken] = useState<string|undefined>(undefined)


// }

// function getUserFromStorage(): User | null {
//   if (typeof window === "undefined") return null;
//   const stored = localStorage.getItem("user");
//   if (stored) {
//     try {
//       const parsed = JSON.parse(stored);
//       if (parsed && parsed.id) return parsed;
//     } catch {
//       return null;
//     }
//   }
//   return null;
// }

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUserState] = useState<User | null>(null);

//   useEffect(() => {
//     setUserState(getUserFromStorage());
//   }, []);

//   const setUser = (userData: User | null) => {
//     if (userData) {
//       localStorage.setItem("user", JSON.stringify(userData));
//     } else {
//       localStorage.removeItem("user");
//     }
//     setUserState(userData);
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }
