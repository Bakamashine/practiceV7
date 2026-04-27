// import { type User } from "../hooks/useUser";

// export function getUserFromStorage(): User | null {
//   if (typeof window === "undefined") return null;
//   const stored = localStorage.getItem("user");
//   if (stored) {
//     try {
//       const parsed = JSON.parse(stored);
//       if (parsed && parsed.id) {
//         return parsed;
//       }
//     } catch {
//       return null;
//     }
//   }
//   return null;
// }

// export function setUserToStorage(user: User | null): void {
//   if (typeof window === "undefined") return;
//   if (user) {
//     localStorage.setItem("user", JSON.stringify(user));
//   } else {
//     localStorage.removeItem("user");
//   }
// }

// export function clearUserFromStorage(): void {
//   if (typeof window === "undefined") return;
//   localStorage.removeItem("user");
// }