import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

import type { Route } from "./+types/root";
import Header from "./layouts/components/header";
import Footer from "./layouts/components/footer";
import "./css/main.css";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "./context/AuthContext";
import { useEffect, useState } from "react";
import UserContext from "./context/UserContext";
import type IUser from "./interface/IUser";
import { decodeToken } from "react-jwt";
import { accessTokenKeyCookie } from "./constants/const";
import getCookie from "./helper/getCookie";

const phoneKey =
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone";

interface DecodedToken {
  aud: string;
  exp: number;
  [phoneKey]: string;
  iat: number;
  nameid: string;
  nbf: number;
  role: string;
  unique_name: string;
}

export async function loader({ request }: Route.LoaderArgs) {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return { isAuth: false, user: null };

  const accessToken = getCookie({ request, name: accessTokenKeyCookie });
  if (!accessToken) return { isAuth: false, user: null };

  const decoded = decodeToken<DecodedToken>(accessToken);
  if (!decoded) return { isAuth: false, user: null };

  const user = {
    id: decoded.nameid,
    name: decoded.unique_name,
    phoneNumber: decoded[phoneKey],
    role: decoded.role,
  } as IUser;
  console.log("user: ", user)
  return {
    isAuth: true,
    user
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body>
        <Header />
        {children}
        <ScrollRestoration />
        <Scripts />

        <Footer />
      </body>
    </html>
  );
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  const [isAuth, setAuth] = useState(data.isAuth);
  const [user, setUser] = useState<IUser | null>(data.user);


  useEffect(()=> {
      setAuth(data.isAuth);
      setUser(data.user);
  }, [])
  return (
    <AuthContext.Provider value={{ isAuth, setAuth }}>
      <UserContext.Provider value={{ user, setUser }}>
        <Outlet />
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
