import { useEffect, useState, type FormEvent } from "react";
import { useParams } from "react-router";
import type { UserData } from "~/api/auth";
import product, { type ProductResponse } from "~/api/product";
import user from "~/api/user";
import Loader from "~/components/Loader";
import default_image_url from "~/constants/image";

export async function loader() {
  return null;
}
export default function EditProfile() {
  const [myuser, setUser] = useState<UserData | null>(null);
  const [load, setLoad] = useState(true);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userInfo, setUserInfo] = useState("");

  const getData = async () => {
    try {
      const result = await user.getFullInfo();
      const _user = result.data;

      if (_user) {
        setUser(_user);
        setName(_user.name);
        setPhoneNumber(_user.phoneNumber);
        setUserInfo(_user.userInfo || "");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  if (load) return <Loader />;

  return (
    <section className="catalog profile">
      <form className="m-3" onSubmit={submit}>
        <div className="d-flex align-items-center justify-content-between">
          <img
            src={myuser?.avatar || default_image_url}
            className="avatar"
            alt="..."
          />
          <div className="mx-3" style={{ flex: 1 }}>
            <h5>
              <b>Фио: </b>
              <input
                type="text"
                name="name"
                className="border-0 w-100"
                placeholder="введите свое Фио"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </h5>
            <hr style={{ width: "100%", margin: 0 }} />
            <p>
              <b>Номер телефона: </b>
              <input
                type="tel"
                name="phone"
                className="border-0 w-100"
                placeholder="введите свой номер телефона"
                // inputMode="numeric"
                // pattern="[0-9+\-\s]+"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </p>
            <hr style={{ width: "100%", margin: 0 }} />
            <p>
              <b>Доп информация: </b>
              <input
                type="text"
                name="info"
                className="border-0 w-100"
                placeholder="введите информацию"
                value={userInfo}
                onChange={(e) => setUserInfo(e.target.value)}
              />
            </p>
            <hr style={{ width: "100%", margin: 0 }} />
          </div>
        </div>
        <div className="d-flex justify-content-between m-3 align-items-center">
          <div className="d-flex">
            <button
              type="submit"
              className="sign-out d-flex edit justify-content-evenly align-items-center gap-2 p-2 text-white"
            >
              <span>Сохранить</span>
              <img src="/img/edit.png" alt="" className="profileButton" />
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
