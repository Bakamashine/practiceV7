import { Link, useLoaderData, useNavigate, useParams } from "react-router";
import product, { type ProductResponse } from "../../api/product";
import { useEffect, useState } from "react";
import default_image_url from "../../constants/image";
import { LoaderOverlay } from "../../components/Loader";
import type { Route } from "./+types/show";
// import type { Route } from ";


export async function loader({params}: Route.LoaderArgs) {
  const result = await product.getById(params.id);
  return result;
}
const ProductShow: React.FC = () => {
  const myproduct = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <section className="mx-4 myInfoCard catalog content">
      <div>
        <img
          src="img/arrow-left.png"  
          alt="Назад"
          className="my-2 myImgArrow cursor-pointer"
          onClick={(e) => navigate(-1)}
        />
        <div className="mb-3">
          <div className="card-body text-center">
            <div className="m-5">
              <img
                src={myproduct?.photoUrl || default_image_url}
                className="card-img-top w-50"
                alt="Изображение товара"
              />
            </div>
            <h3>{myproduct?.productName}</h3>
            {/* <h3>Исполнитель</h3> */}
            {/* <h3>Номер телефона</h3> */}
            <h3>Адрес: {myproduct?.address}</h3>
            <h3>Цена: {myproduct?.productCost}</h3>
            <p>{myproduct?.productInfo}</p>
            <a href="Rate_shop.html">
              <button
                className="w-50 myButton rounded-4 myBlue text-white p-2"
                onClick={(e) => navigate("/buy_page")}
              >
                Заказать
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShow;
