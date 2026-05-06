import { useNavigate } from "react-router";
import type { Route } from "./+types/like";
import { protectedMiddleware } from "~/middleware/protectedMiddleware";

export const middleware: Route.MiddlewareFunction[] = [protectedMiddleware];

export async function loader() {
  return null;
}

const LiveView: React.FC = () => {
    const navigation = useNavigate()
    return (
        <div className="catalog content">
            <section className="m-5 catalog">
                <h1>Избранное</h1>
                <div className="row row-cols-1 row-cols-2 row-cols-sm-2 row-cols-md-3 g-4 my-3">
                    <div className="col d-flex">
                        <div className="rounded shadow p-3 w-100">
                            <img src="img/Group 19.png" className="card-img-top" alt="..." />
                            <div className="card-body catalog">
                                <h3 className="card-title">Крутое название</h3>
                                <h5>Исполнитель</h5>
                                <h4>Цена</h4>
                                <p>Крутое инфо Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita?</p>
                            </div>
                            <div className="d-flex align-items-center">
                                <button onClick={e => navigation("/show")} type="button" className="mx-1 sign-out d-flex myLightBlue border-0 rounded-3 justify-content-center align-items-center p-2 text-white w-100">
                                    <span>подробнее</span>
                                </button>
                                <form action="" className="m-0 p-0 d-inline-block lh-1">
                                    <button type="button" className="border-0 bg-transparent p-0">
                                        <img src="img/redHear.png" alt="" className="like" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col d-flex">
                        <div className="rounded shadow p-3 w-100">
                            <img src="..." className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Это более длинная карточка с поддерживающим текстом ниже, как естественное введение в дополнительный контент.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col d-flex">
                        <div className="rounded shadow p-3 w-100">
                            <img src="..." className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Это более длинная карточка с поддерживающим текстом ниже.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col d-flex">
                        <div className="rounded shadow p-3 w-100">
                            <img src="..." className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">Это более длинная карточка с поддерживающим текстом ниже, как естественное введение в дополнительный контент.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LiveView;
