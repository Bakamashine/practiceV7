import { useNavigate, redirect, Link } from "react-router";
import type { Route } from "./+types/index";
// import { protectedMiddleware } from "~/middleware/protectedMiddleware";
import { useContext, useEffect, useState } from "react";
import UserContext from "~/context/UserContext";
import default_image_url from "~/constants/image";
import user from "~/api/user";
import type { UserData } from "~/api/auth";
import Loader from "~/components/Loader";
import { protectedMiddleware } from "~/middleware/protectedMiddleware";

export const middleware: Route.MiddlewareFunction[] = [protectedMiddleware];

// export async function loader() {
//   const currentUser = await user.getFullInfo();
//   return currentUser.data;
//   // return null;
// }

export async function loader() {
  return null;
}

const ProfileView = () => {
  const [currentUser, setUser] = useState<UserData | undefined>(undefined);
  const {user: myUser} = useContext(UserContext)
  const [load, setLoad] = useState(true);
  const navigation = useNavigate();
  const getData = async () => {
    try {
      const newUser = await user.getFullInfo();
      if (newUser.data) setUser(newUser.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoad(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (load) {
    return <Loader />;
  }
  return (
    <section className="catalog profile">
      <div className="m-3">
        <h2>Ваши данные</h2>

        <div className="d-flex align-items-center justify-content-between">
          <img
            src={currentUser?.avatarUrl || default_image_url}
            className="avatar"
            alt="..."
          />

          <div className="mx-3" style={{ flex: 1 }}>
            <h5>
              <b>Фио: </b>
              {currentUser!.name}
            </h5>
            <hr style={{ width: "100%", margin: 0 }} />
            <p>
              <b>Номер телефона: </b>
              {currentUser!.phoneNumber}
            </p>
            <hr style={{ width: "100%", margin: 0 }} />
            <p>
              <b>Доп информация: </b>
              {currentUser?.userInfo || <i>Отсуствует</i>}
            </p>
            <hr style={{ width: "100%", margin: 0 }} />
          </div>
        </div>
        <div className="container-fluid px-2 px-md-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3 my-3">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-2 gap-md-3">
              <Link
                to={"/profile/edit"}
                className="text-decoration-none flex-grow-1 flex-md-grow-0"
              >
                <div className="sign-out d-flex edit justify-content-center align-items-center gap-2 p-2 text-white w-100">
                  <span>Редактировать</span>
                  <img
                    src="img/edit.png"
                    alt=""
                    className="profileButton"
                    style={{ width: 16, height: 16 }}
                  />
                </div>
              </Link>
              {/* ======================= Исполнитель кнопки======================= */}
              <Link
                // href="addProduct.html"
                to={"#"}
                className="text-decoration-none flex-grow-1 flex-md-grow-0"
              >
                <button
                  type="button"
                  className="sign-out d-flex myLightBlue border-0 rounded-3 justify-content-center align-items-center gap-2 p-2 text-white w-100"
                >
                  <span>Добавить товары/услуги</span>
                </button>
              </Link>
              {/* ======================= Админ кнопки ======================= */}
              {myUser!.role == "Admin" && (
                <>
                  <Link
                    to={"/product/edit_page"}
                    className="text-decoration-none flex-grow-1 flex-md-grow-0"
                  >
                    <button
                      type="button"
                      // onClick={() => navigation(`/product/edit_page`)}
                      className="sign-out d-flex myLightBlue border-0 rounded-3 justify-content-center align-items-center gap-2 p-2 text-white w-100"
                    >
                      <span>Редактировать товары/услуги</span>
                    </button>
                  </Link>
                  <Link
                    to="#"
                    className="text-decoration-none flex-grow-1 flex-md-grow-0"
                  >
                    <button
                      type="button"
                      className="sign-out d-flex myLightBlue border-0 rounded-3 justify-content-center align-items-center gap-2 p-2 text-white w-100"
                    >
                      <span>Управление пользователями</span>
                    </button>
                  </Link>
                  <Link
                    to="#"
                    className="text-decoration-none flex-grow-1 flex-md-grow-0"
                  >
                    <button
                      type="button"
                      className="sign-out d-flex myLightBlue border-0 rounded-3 justify-content-center align-items-center gap-2 p-2 text-white w-100"
                    >
                      <span>Управление заказами</span>
                    </button>
                  </Link>
                </>
              )}

              <Link
                to="#"
                className="text-decoration-none flex-grow-1 flex-md-grow-0"
              >
                <button
                  type="button"
                  className="sign-out d-flex myLightBlue border-0 rounded-3 justify-content-center align-items-center gap-2 p-2 text-white w-100"
                >
                  <span>Оставить отзыв</span>
                </button>
              </Link>
            </div>
            <div className="flex-shrink-0">
              <button
                type="button"
                className="sign-out d-flex btn btn-outline-danger justify-content-center align-items-center gap-2 w-100 w-md-auto"
              >
                <span>выйти из аккаунта</span>
                <img
                  src="img/sign-out.png"
                  alt=""
                  className="profileButton"
                  style={{ width: 16, height: 16 }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <section className="order">
        <div className="myBlue rounded-3">
          <h1 className="p-3 text-white nameBlock">Заказы</h1>
        </div>
        <div className="row row-cols-1 row-cols-2 row-cols-sm-2 row-cols-md-3 g-4 my-3">
          <div className="col d-flex">
            <Link to="#" className="text-decoration-none text-black">
              <div className="rounded shadow p-3 w-100">
                <img
                  src="img/Group 19.png"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body catalog">
                  <h3 className="card-title">Крутое название</h3>
                  <h5>Исполнитель</h5>
                  <h4>Цена</h4>
                  <p>Дата</p>
                  <p>Статус</p>
                  <p>Телефон</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="col d-flex">
            <div className="rounded shadow p-3 w-100">
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Это более длинная карточка с поддерживающим текстом ниже, как
                  естественное введение в дополнительный контент.
                </p>
              </div>
            </div>
          </div>
          <div className="col d-flex">
            <div className="rounded shadow p-3 w-100">
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Это более длинная карточка с поддерживающим текстом ниже.
                </p>
              </div>
            </div>
          </div>
          <div className="col d-flex">
            <div className="rounded shadow p-3 w-100">
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Это более длинная карточка с поддерживающим текстом ниже, как
                  естественное введение в дополнительный контент.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="myBlue rounded-3">
          <h1 className="p-3 text-white nameBlock">Ваши товары и услуги</h1>
        </div>
        <div className="row row-cols-1 row-cols-2 row-cols-sm-2 row-cols-md-3 g-4 my-3">
          <div className="col d-flex">
            <Link to="#" className="text-decoration-none text-black">
              <div className="rounded shadow p-3 w-100">
                <img
                  src="img/Group 19.png"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body catalog">
                  <h3 className="card-title">Крутое название</h3>
                  <h5>Исполнитель</h5>
                  <h4>Цена</h4>
                  <p>Дата</p>
                  <p>Статус</p>
                  <p>Телефон</p>
                </div>
                <button
                  onClick={(e) => navigation("/edit_product")}
                  type="button"
                  className="sign-out d-flex myLightBlue border-0 rounded-3 justify-content-center align-items-center gap-2 p-2 text-white w-100"
                >
                  <span>Редактировать</span>
                </button>

                <Link
                  to="#"
                  className="text-decoration-none flex-grow-1 flex-md-grow-0"
                >
                  <button
                    type="button"
                    className="my-3 sign-out d-flex bg-danger-subtle border-0 rounded-3 justify-content-center align-items-center gap-2 p-2 text-white w-100"
                  >
                    <span>Скрыть</span>
                  </button>
                </Link>
                <Link
                  to="#"
                  className="text-decoration-none flex-grow-1 flex-md-grow-0"
                >
                  <button
                    type="button"
                    className="my-3 sign-out d-flex bg-success-subtle border-0 rounded-3 justify-content-center align-items-center gap-2 p-2 text-white w-100"
                  >
                    <span>Вернуть</span>
                  </button>
                </Link>
              </div>
            </Link>
          </div>
          <div className="col d-flex">
            <div className="rounded shadow p-3 w-100">
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Это более длинная карточка с поддерживающим текстом ниже, как
                  естественное введение в дополнительный контент.
                </p>
              </div>
            </div>
          </div>
          <div className="col d-flex">
            <div className="rounded shadow p-3 w-100">
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Это более длинная карточка с поддерживающим текстом ниже.
                </p>
              </div>
            </div>
          </div>
          <div className="col d-flex">
            <div className="rounded shadow p-3 w-100">
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Это более длинная карточка с поддерживающим текстом ниже, как
                  естественное введение в дополнительный контент.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ======================= ШТУКИ АДМИНА!!!!!!!!!!!!!!!!  ======================= */}
      <section>
        <div className="myBlue rounded-3">
          <h1 className="p-3 text-white nameBlock">
            Добавить новый тип услуг/продуктов
          </h1>
        </div>
        <div className="d-flex gap-2 mb-3">
          <div className="w-75">
            <input
              type="text"
              placeholder="Введите новый тип услуги или продукта"
              className="border-0 rounded-4 backColorGre1 p-3 w-100"
              style={{ height: "100%" }}
            />
          </div>
          <div className="w-25">
            <button
              type="button"
              className="sign-out d-flex myLightBlue border-0 rounded-3 justify-content-center align-items-center gap-2 p-2 text-white w-100 h-100"
            >
              <span>Добавить</span>
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="myBlue rounded-3">
          <h1 className="p-3 text-white nameBlock">
            Удалить тип услуг/продуктов
          </h1>
        </div>
        <div className="d-flex gap-2 mb-3">
          <div className="w-75">
            <select
              className="border-0 rounded-4 backColorGre1 p-3 w-100 text-muted"
              style={{ height: "100%" }}
            >
              <option value="" disabled>
                Выберите тип услуги или продукта
              </option>
              <option value="консультация">ааааааа</option>
            </select>
          </div>
          <div className="w-25">
            <button
              type="button"
              className="sign-out d-flex myLightBlue border-0 rounded-3 justify-content-center align-items-center gap-2 p-2 text-white w-100 h-100"
            >
              <span>Удалить</span>
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ProfileView;
