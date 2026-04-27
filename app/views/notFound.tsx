import React from "react";
import { Link } from "react-router";

const NotFound: React.FC = () => {
  return (
    <div className="container text-center py-5">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h2 className="mb-4">Страница не найдена</h2>
      <p className="mb-4">Извините, запрашиваемая страница не существует.</p>
      <Link to="/" className="sign-out d-inline-block px-4 py-2 text-white rounded-3 text-decoration-none">
        На главную
      </Link>
    </div>
  );
};

export default NotFound;