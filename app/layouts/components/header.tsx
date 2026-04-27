import { Link } from "react-router";
// import { getUserFromStorage } from "../../context/AuthContext";

export default function Header() {
  // TODO
  const user = null;

  return (
    <section className="myColorHeader">
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
                      <img src="/img/comment.png" alt="Иконка комментария" />
                      <p className="header__button__text">Комментарии</p>
                    </Link>
                  </div>
                  {user ? (
                    <>
                      <div className="mx-1 text-center">
                        <Link to={"/profile"} className="text-decoration-none">
                          <img src="img/user.png" alt="Иконка пользователя" />
                          <p className="header__button__text">Профиль</p>
                        </Link>
                      </div>
                      <div className="mx-1 text-center">
                        {/* <button
                          className="btn btn-link p-0 border-0"
                          onClick={() => {
                            removeUser();
                            window.location.href = "/";
                          }}
                          title="Выйти"
                        >
                          <img src="img/logout.png" alt="Выход" />
                        </button> */}
                      </div>
                      <div className="mx-1 text-center">
                        <Link to={"/like"} className="text-decoration-none">
                          <img src="img/heart.png" alt="Иконка сердца" />
                          <p className="header__button__text">Избранное</p>
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="mx-1 text-center">
                      <Link to={"/login"} className="text-decoration-none">
                        <img src="img/user.png" alt="Войти" />
                        <p className="header__button__text">Войти</p>
                      </Link>
                    </div>
                  )}

                  <div className="mx-1 text-center">
                    <a href="college.html">
                      <img
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
