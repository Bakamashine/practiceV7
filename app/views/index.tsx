import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import product, { type ProductResponseAny } from "../api/product";
import Loader, { LoaderOverlay } from "../components/Loader";
import default_image_url from "../constants/image";
import type { Route } from "./+types";

export async function loader() {
  const result = await product.getAll();
  return result; 
}

export default function MainPage({loaderData}: Route.ComponentProps) {
  const myproduct = loaderData as ProductResponseAny;
  const navigation = useNavigate();


  return (
    <div className="catalog content">
      <section className="m-5 catalog ">
        <h1>Услуги и товары</h1>
        <div className="row row-cols-1 row-cols-2 row-cols-sm-2 row-cols-md-3 g-4 my-3">

          {myproduct?.products && myproduct.products.length > 0 ? (
            <>
              {myproduct.products.map((item) => (
                <div className="col d-flex" key={item.id}>
                  <div className="rounded shadow p-3 w-100">
                    <img
                      src={item.photoUrl || default_image_url}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body catalog">
                      <h3 className="card-title">{item.productName}</h3>
                      <h4>Цена {item.productCost} ₽</h4>
                      <p>{item.productInfo}</p>
                    </div>
                    <div className="d-flex align-items-center ">
                      <button
                        type="button"
                        className="sign-out d-flex myLightBlue border-0 rounded-3 justify-content-center align-items-center  p-2 text-white w-100"
                        // onClick={(e) => navigation(`/product/${item.id}`)}
                      >
                        <span>Подробнее</span>
                      </button>

                      <form action="" className="m-0 p-0 d-inline-block lh-1">
                        <button
                          type="button"
                          className="border-0 bg-transparent p-0 "
                        >
                          <img src="img/greyHear.png" alt="" className="like" />
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-center">Товаров нет</p>
          )}

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
    </div>
  );
}
