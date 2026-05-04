// // import { getUserFromStorage } from "../context/AuthContext";

// export interface User {

// }

// export const useUser = () => {
//   // TODO
//   const user =null;

//   const setUser = (userData: User | null) => {
//     if (typeof window !== "undefined") {
//       if (userData) {
//         localStorage.setItem("user", JSON.stringify(userData));
//       } else {
//         localStorage.removeItem("user");
//       }
//       window.location.reload();
//     }
//   };

//   return {
//     user,
//     setUser,
//     addUser: setUser,
//     removeUser: () => setUser(null),
//   };
// };