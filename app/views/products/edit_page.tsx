import product from "~/api/product";
import type { Route } from "./+types/edit_page";
import default_image_url from "~/constants/image";
import AdaptivePaginator from "~/components/AdaptivePaginator";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router";
import Loader from "~/components/Loader";
import { Link } from "react-router";
import SubmitModalWindow from "~/components/SubmitModalWindow";

export async function clientLoader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const products = await product.getWithPaginate(page);
  return products;
}

export default function EditProductPage({ loaderData }: Route.ComponentProps) {
  const [products, setProducts] = useState(loaderData);
  const [searchText, setSearchText] = useState("");
  const [searchParams] = useSearchParams();
  const [load, setLoad] = useState(true);
  const [show, setShow] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const hasSearch = searchText.trim() !== "";

  const fetchProducts = useCallback(async () => {
    setLoad(true);
    try {
      const page = searchParams.get("page") || "1";

      if (hasSearch) {
        const result = await product.getBySearchTextWithPaginate(
          searchText,
          page,
        );
        setProducts(result);
      } else {
        setProducts(loaderData);
      }
    } catch {
    } finally {
      setLoad(false);
    }
  }, [searchText, hasSearch, searchParams]);

  const destroyProduct = async (idProduct: string) => {
    const result = await product.destroy(idProduct);
    if (result.status == 204) {
      setShow(false);
      setSelectedProductId(null);
      fetchProducts();
    }
  };

  const handleDeleteClick = (idProduct: string) => {
    setSelectedProductId(idProduct);
    setShow(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  useEffect(() => {
    if (!hasSearch) {
      setProducts(loaderData);
    }
  }, [loaderData]);

  if (load) {
    return <Loader />;
  }
  return (
    <>
      <SubmitModalWindow
        show={show}
        handleClose={() => {
          setShow(false);
          setSelectedProductId(null);
        }}
        success={() => selectedProductId && destroyProduct(selectedProductId)}
      />
      <div className="mx-5">
        <a href="/">
          <img
            src="/img/arrow-left.png"
            alt="Назад"
            className="my-2 myImgArrow"
          />
        </a>
      </div>

      <div className="catalog content">
        <section className="m-5 catalog text-center">
          <h1>Редактировать услуги и товары</h1>

          <div className="my-3">
            <input
              className="form-control"
              type="search"
              placeholder="Поиск по названию, описанию, цене..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ height: "60px" }}
            />
          </div>

          {products && products.items.length > 0 ? (
            <>
              <div className="row row-cols-1 row-cols-2 row-cols-sm-2 row-cols-md-3 g-4 my-3">
                {products.items.map((item) => (
                  <div className="col d-flex" key={item.id}>
                    <div className="rounded shadow p-3 w-100">
                      <img
                        src={item.photoUrl || default_image_url}
                        className="card-img-top"
                        alt={item.photoUrl}
                      />
                      <div className="card-body catalog">
                        <h3 className="card-title">{item.productName}</h3>
                        <h5>Тип: {item.isProduct ? "Продукт" : "Услуга"}</h5>
                        {/* <h5>{item.ypkId}</h5> */}
                        <h4>Цена: {item.productCost} Р</h4>
                        <p>Описание: {item.productInfo.slice(0,10).concat("...")}</p>

                        <Link
                          to={`/product/${item.id}/edit`}
                          type="button"
                          className="my-3 sign-out d-flex myLightBlue border-0 rounded-3 justify-content-center align-items-center gap-2 p-2 text-white w-100 text-decoration-none"
                        >
                          <span>Редактировать</span>
                        </Link>

                        <button
                          type="button"
                          className="my-3 sign-out d-flex bg-danger border-0 rounded-3 justify-content-center align-items-center gap-2 p-2 text-white w-100"
                          onClick={() => handleDeleteClick(item.id)}
                        >
                          <span>Удалить</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flexCenter">
                <AdaptivePaginator
                  page={products.page}
                  pageCount={products.pageCount}
                />
              </div>
            </>
          ) : (
            <p className="text-center">Продукты не найдены</p>
          )}
        </section>
      </div>
    </>
  );
}