import { useState } from "react";
import { useNavigate } from "react-router";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const BuyPage: React.FC = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const buy = () => {};

  return (
    <section className="mx-4 myInfoCard catalog content">
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton className="d-flex justify-content-center mySearh">
          <img src="img/checkMark.png" alt="" />
        </Modal.Header>
        <Modal.Body className="text-center catalog">
          <h1 className="myA">Успешно</h1>
          <p className="px-5 opacity-75">
            В ближайшее время вам позвонят для подтверждения заказа
          </p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center mySearh">
          <Button
            variant=""
            className="myButton rounded-4 myLightBlue text-white p-2 border-0"
            onClick={() => navigate("/")}
          >
            Вернуться
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="mb-3">
        <div className="card-body text-center">
          <div className="m-5">
            <img
              src="img/Group 19.png"
              className="card-img-top w-50"
              alt="..."
            />
          </div>
          <h3>Cheeseburger Wendy's Burger</h3>
          <h3>Исполнитель</h3>
          <h3>Номер телефона</h3>
          <h3>Адресс</h3>
          <h3>Цена</h3>
          <div>
            <textarea
              name=""
              id=""
              className="w-75 rounded-2 myGrey m-2 border-0"
              placeholder="Вы хотите добавить комментарий к вашему заказу?"
              rows={7}
            />
          </div>
          <div className="d-flex m-2 justify-content-evenly">
            <button
              onClick={(e) => navigate(-1)}
              className="w-25 myButton rounded-4 myGrey text-black p-2 border-0"
            >
              отмена
            </button>
            <button
              type="button"
              className="w-25 myButton rounded-4 myLightBlue text-white p-2 border-0"
              onClick={() => setShow(true)}
            >
              оформить
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyPage;
