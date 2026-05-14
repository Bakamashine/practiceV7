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
import NewTypeForm from "~/components/forms/newTypeForm";
import DeleteTypeForm from "~/components/forms/deleteTypeForm";
import ypk, { type YpkResponse } from "~/api/ypk";

export const middleware: Route.MiddlewareFunction[] = [protectedMiddleware];

// export async function loader() {
//   const currentUser = await user.getFullInfo();
//   return currentUser.data;
//   // return null;
// }

// export async function clientLoader() {
//   const ypks = await ypk.getAll();
//   return ypks
// }

const ProfileView = () => {
  const [ypks, setYpk] = useState<YpkResponse | null>();
  const [currentUser, setUser] = useState<UserData | undefined>(undefined);
  const { user: myUser } = useContext(UserContext);
  const [load, setLoad] = useState(true);
  const [selectType, setSelectType] = useState();
  const navigation = useNavigate();

  const getUser = async () => {
    const newUser = await user.getFullInfo();
    if (newUser.data) setUser(newUser.data);
  };
  const getYpk = async () => {
    const ypks = await ypk.getAll();
    if (ypks) setYpk(ypks);
  };
  const getData = async () => {
    try {
      await Promise.all([getUser(), getYpk()]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoad(false);
    }
  };
 
  useEffect(() => {
    getData();
  }, []);

  if (load || !currentUser) {
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
              {currentUser.name}
            </h5>
            <hr style={{ width: "100%", margin: 0 }} />
            <p>
              <b>Номер телефона: </b>
              {currentUser.phoneNumber}
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
                to={"/product/create"}
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
              {myUser?.role == "Admin" && (
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
                    to={"/user"}
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
                to={"/feedback/create"}
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
                <span>Выйти из аккаунта</span>
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
      {myUser?.role == "Admin" && (
        <>
          <section>
            <NewTypeForm onAdd={getData} />
          </section>
          <section>
            <DeleteTypeForm ypks={ypks} onDelete={getData} />
          </section>
        </>
      )}
    </section>
  );
};

export default ProfileView;
