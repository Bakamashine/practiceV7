import { useContext, useEffect } from "react";
import { Link } from "react-router";
import AuthContext from "~/context/AuthContext";
import UserContext from "~/context/UserContext";
// import { getUserFromStorage } from "../../context/AuthContext";


export async function loader() {

    return null;
}

export default function Header() {
  const {user} = useContext(UserContext);
  const {isAuth} = useContext(AuthContext);

  // useEffect(() => {
  //   console.log("User: ", user)
  // }, [])
  return (
    <section className="myColorHeader">
      {user && <p>Добро пожаловать {user.name}</p>}
      <nav className="navbar navbar-expand-lg d-flex justify-content-between align-items-center">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            <img src="img/logo.png" alt="Логотип" className="myImg" />
          </Link>

          <div className="mySearh d-flex align-items-center justify-content-around flex-grow">
            <input
              className="form-control"
              type="search"
              placeholder="Поиск"
              aria-label="Поиск"
            />
            <div className="d-flex justify-content-end align-items-center">
              <div className="">
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src="img/Group 2.png" alt="Иконка группы" />
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="myIcons">
                <div className="d-flex me-3 myStyleTextLogo header-icons">
                  <div className="mx-1 text-center">
                    <Link to="/comments" className="text-decoration-none">
                      <img className="header__image__size" src="/img/comment.png" alt="Иконка комментария" />
                      <p className="header__button__text">Комментарии</p>
                    </Link>
                  </div>
                  {isAuth ? (
                    <>
                      <div className="mx-1 text-center">
                        <Link to={"/profile"} className="text-decoration-none">
                          <img className="header__image__size" src="img/user.png" alt="Иконка пользователя" />
                          <p className="header__button__text">Профиль</p>
                        </Link>
                      </div>
                      <div className="mx-1 text-center">
                        <Link
                          to="/login"
                          className="text-decoration-none"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log("logout clicked");
                            window.location.href = "/";
                          }}
                        >
                          <img className="header__image__size header__image-logout" src="img/logout.png" alt="Выход" />
                          <p className="header__button__text">Выйти</p>
                        </Link>
                      </div>
                      <div className="mx-1 text-center">
                        <Link to={"/like"} className="text-decoration-none">
                          <img className="header__image__size" src="img/heart.png" alt="Иконка сердца" />
                          <p className="header__button__text">Избранное</p>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="mx-1 text-center">
                      <Link to={"/login"} className="text-decoration-none">
                        <img className="header__image__size" src="img/user.png" alt="Войти" />
                        <p className="header__button__text">Войти</p>
                      </Link>
                    </div>
                  )}

                  <div className="mx-1 text-center">
                    <a href="college.html">
                      <img
                      className="header__image__size"
                        src="img/material-symbols_info-outline-rounded1.png"
                        alt="Информация"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}
