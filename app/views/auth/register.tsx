import { useContext, useState } from "react";
import { useNavigate, Link, redirect } from "react-router";
// import { getUserFromStorage } from "../../context/AuthContext";
import ShowError from "../../components/showError";
import type IRegisterValidation from "../../interface/IRegisterValidation";
import auth, { type UserData } from "../../api/auth";
import UserContext from "~/context/UserContext";
import AuthContext from "~/context/AuthContext";
import { guestMiddleware } from "~/middleware/guestMiddleware";
import type { Route } from "../+types";
import { setAccessToken } from "~/config/authAxios";

export const middleware: Route.MiddlewareFunction[] = [guestMiddleware];

export async function loader() {
  return null;
}

export default function RegisterView() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<IRegisterValidation | null>(null);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { setAuth } = useContext(AuthContext);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const result = await auth.register({
    //   fullName: name,
    //   phoneNumber: phone,
    //   password,
    // });

    const result = await auth.register({
      fullName: "ivan",
      phoneNumber: "89805307554",
      password: "moredock1",
    });

    if (result.status == 401 || result.error) {
      if (result.status === 401) {
        setError({
          type: "",
          title: "",
          status: 401,
          traceId: "",
          errors: { FullName: ["Пользователь уже существует"] },
        } as IRegisterValidation);
        return;
      }
      setError(result.error as unknown as IRegisterValidation);
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
      setAccessToken(result.data.accessToken);
      window.location.href = "/";
    }
  };

  return (
    <section className="d-flex justify-content-center registration content">
      <div className="text-center my-5">
        <h1 className="my-2">Привет! Создай аккаунт</h1>
        <h5 className="my-4">
          Уже есть аккаунт?{" "}
          <Link to={"/login"} className="myA">
            Войдите в него
          </Link>
        </h5>
        <form method="post" onSubmit={submit}>
          <input
            type="text"
            placeholder="Ваше имя"
            className="w-75 border-0 myGrey rounded my-1 p-1 mySize20"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // required
          />
          <ShowError errorKey="FullName" error={error} />
          <input
            type="tel"
            placeholder="Ваш номер телефона"
            // pattern="\+7\s?\(?[0-9]{3}\)?\s?[0-9]{3}-?[0-9]{2}-?[0-9]{2}"
            className="w-75 border-0 myGrey rounded my-1 p-1 mySize20"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            // required
          />
          <ShowError errorKey="PhoneNumber" error={error} />
          <input
            type="password"
            placeholder="Ваш пароль"
            className="w-75 border-0 myGrey rounded my-1 p-1 mySize20"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
          <ShowError errorKey="Password" error={error} />
          <div>
            <button
              type="submit"
              className="w-75 rounded-4 mySize20 myLightBlue text-white p-2 border-0 m-2"
            >
              Создать
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
