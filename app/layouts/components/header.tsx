import { useContext, useState } from "react";
import { Link } from "react-router";
import { Navbar, Container, Offcanvas, Nav } from "react-bootstrap";
import AuthContext from "~/context/AuthContext";
import UserContext from "~/context/UserContext";
import auth from "~/api/auth";

export async function loader() {
  return null;
}

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const { isAuth, setAuth } = useContext(AuthContext);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  const handleLogout = () => {
    setUser(null);
    setAuth(false);
    window.location.href = "/";
  };

  const navLinks = [
    { path: "/feedback", img: "/img/comment.png", label: "Комментарии", authRequired: false },
    { path: "/profile", img: "/img/user.png", label: "Профиль", authRequired: true },
    { path: "/like", img: "/img/heart.png", label: "Избранное", authRequired: true },
    { path: "/login", img: "/img/user.png", label: "Войти", authRequired: false, isLogin: true }
  ];

  const filteredLinks = navLinks.filter(link => {
    if (link.authRequired) return isAuth;
    if (link.isLogin) return !isAuth;
    return true;
  });

  return (
    <section className="myColorHeader">
      {user && <p className="mb-0 pt-2 text-center">Добро пожаловать {user.name}</p>}
      
      <Navbar expand="lg" className="navbar navbar-expand-lg d-flex justify-content-between align-items-center">
        <Container fluid className="flex-nowrap">
          <Navbar.Brand as={Link} to="/">
            <img src="/img/logo.png" alt="Логотип" className="myImg" />
          </Navbar.Brand>

          <div className="mySearh flex-grow-1 mx-3">
            <input
              className="form-control"
              type="search"
              placeholder="Поиск"
              aria-label="Поиск"
            />
          </div>

          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            onClick={handleShow}
            className="border-0"
          >
            <img src="/img/Group 2.png" alt="Меню" style={{ width: "30px" }} />
          </Navbar.Toggle>

          <div className="d-none d-lg-flex align-items-center">
            <div className="myIcons">
              <div className="d-flex me-3 myStyleTextLogo header-icons">
                {filteredLinks.map((link, idx) => (
                  <div key={idx} className="mx-1 text-center">
                    <Link to={link.path} className="text-decoration-none" onClick={link.label === "Выйти" ? handleLogout : undefined}>
                      <img className="header__image__size" src={link.img} alt={link.label} />
                      <p className="header__button__text">{link.label}</p>
                    </Link>
                  </div>
                ))}
                {isAuth && (
                  <div className="mx-1 text-center">
                    <Link to="/" className="text-decoration-none" onClick={handleLogout}>
                      <img className="header__image__size header__image-logout" src="/img/logout.png" alt="Выход" />
                      <p className="header__button__text">Выйти</p>
                    </Link>
                  </div>
                )}
                <div className="mx-1 text-center">
                  <a href="college.html">
                    <img className="header__image__size" src="/img/material-symbols_info-outline-rounded1.png" alt="Информация" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <Offcanvas show={showOffcanvas} onHide={handleClose} placement="end" className="d-lg-none">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Меню</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                {filteredLinks.map((link, idx) => (
                  <Nav.Link
                    key={idx}
                    as={Link}
                    to={link.path}
                    onClick={() => {
                      handleClose();
                      if (link.label === "Выйти") handleLogout();
                    }}
                    className="d-flex align-items-center gap-2 py-2"
                  >
                    <img src={link.img} alt={link.label} style={{ width: "24px" }} />
                    <span>{link.label}</span>
                  </Nav.Link>
                ))}
                {isAuth && (
                  <Nav.Link
                    as={Link}
                    to="/"
                    onClick={() => {
                      handleClose();
                      handleLogout();
                    }}
                    className="d-flex align-items-center gap-2 py-2"
                  >
                    <img src="/img/logout.png" alt="Выход" style={{ width: "24px" }} />
                    <span>Выйти</span>
                  </Nav.Link>
                )}
                <Nav.Link href="college.html" className="d-flex align-items-center gap-2 py-2">
                  <img src="/img/material-symbols_info-outline-rounded1.png" alt="Информация" style={{ width: "24px" }} />
                  <span>Информация</span>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </section>
  );
}