import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";

// import Cookies from 'js-cookie'
import Cookies from "universal-cookie";

import type { Route } from "./+types/root";
import Header from "./layouts/components/header";
import Footer from "./layouts/components/footer";
import "./css/main.css";
import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "./context/AuthContext";
import { useState, useEffect } from "react";
import UserContext from "./context/UserContext";
import auth, { type UserData } from "./api/auth";
import Loader from "./components/Loader";

export async function loader() {
  return null;
  // return { isAuth: false, user: null };
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
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [isAuth, setAuth] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [load, setLoad] = useState(true);

  const getUser = async () => {
    try {
      const result = await auth.getMe();
      if (result) {
        console.log("User: ", result.data);
        setUser(result.data);
        setAuth(true);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoad(false);
    }
  };

  // TODO: Удалить js-cookie и universal-cookie
  useEffect(() => {
    // const cookies = new Cookies(null, { path: "/" });
    // const refreshToken = cookies.get("refreshToken");
    // const accessToken = cookies.get("accessToken");
    // console.log("refreshToken: ", refreshToken);
    // console.log("accessToken: ", accessToken);
    getUser();
  }, []);

  if (load) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider value={{ isAuth, setAuth }}>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />

        <Outlet />
        <Footer />
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
