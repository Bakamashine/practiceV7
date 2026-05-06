import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router";
import ShowError from "../../components/showError";
import type ILoginValidation from "../../interface/ILoginValidation";
import auth, { type UserData } from "../../api/auth";
import type { Route } from "./+types/login";
import { guestMiddleware } from "~/middleware/guestMiddleware";
import UserContext from "~/context/UserContext";
import AuthContext from "~/context/AuthContext";

export const middleware: Route.MiddlewareFunction[] = [guestMiddleware];

export async function loader() {
  return null;
}

export default function LoginView() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<ILoginValidation | null>(null);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { setAuth } = useContext(AuthContext);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await auth.login({
      phoneNumber: phone,
      password,
    });

    if (result.status === 401) {
      setError({
        type: "",
        title: "",
        status: 401,
        traceId: "",
        errors: { PhoneNumber: ["Пользователь не найден"] },
      } as ILoginValidation);
      return;
    }

    if (result.error) {
      setError(result.error as unknown as ILoginValidation);
      return;
    }

    if (result.data) {
      const userData: UserData = result.data;
      setUser({
        id: userData.id,
        name: userData.name,
        phoneNumber: userData.phoneNumber,
        role: userData.role,
      });
      setAuth(true);
      window.location.href = "/";
    }
  };

  return (
    <section className="d-flex justify-content-center registration content">
      <div className="text-center my-5">
        <h1 className="my-2">Добро пожаловать</h1>
        <h5 className="my-4">
          Еще нет аккаунта?{" "}
          <Link to="/register" className="myA">
            Создай его
          </Link>
        </h5>
        <form method="post" onSubmit={submit}>
          <input
            type="tel"
            placeholder="Ваш номер телефона"
            className="w-75 border-0 myGrey rounded my-1 p-1 mySize20"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <ShowError errorKey="PhoneNumber" error={error} />
          <input
            type="password"
            placeholder="Ваш пароль"
            className="w-75 border-0 myGrey rounded my-1 p-1 mySize20"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <ShowError errorKey="Password" error={error} />
          <div>
            <button
              type="submit"
              className="w-75 rounded-4 mySize20 myLightBlue text-white p-2 border-0 m-2"
            >
              Войти
            </button>
          </div>
        </form>
        <a href="NumberLogin.html" className="myA">
          Забыли пароль?
        </a>
      </div>
    </section>
  );
}
