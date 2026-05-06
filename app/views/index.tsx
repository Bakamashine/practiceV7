import { useNavigate } from "react-router";
import product, {
  type ProductResponseWithPagination,
} from "../api/product";
import default_image_url from "../constants/image";
import type { Route } from "./+types";
import AdaptivePaginator from "~/components/AdaptivePaginator";

export interface OrdersAndProducts {
  products?: ProductResponseWithPagination;
}

export async function loader({ request }: Route.LoaderArgs): Promise<OrdersAndProducts> {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");

  const products = await product.getWithPaginate(page);
  return {
    products: products || undefined,
  };
}

export default function MainPage({ loaderData }: Route.ComponentProps) {
  const result = loaderData as OrdersAndProducts;
  const navigation = useNavigate();

  return (
    <>
      <div className="catalog content">
        <section className="m-5 catalog ">
          <h1>Товары</h1>
          {result.products && result.products.items.length > 0 ? (
            <>
            
              <div className="flexCenter">
                <AdaptivePaginator
                  page={result.products.page}
                  pageCount={result.products.pageCount}
                />
              </div>
              <div className="row row-cols-1 row-cols-2 row-cols-sm-2 row-cols-md-3 g-4 my-3">
                {result.products.items.map((item) => (
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
                          onClick={() => navigation(`/product/${item.id}`)}
                        >
                          <span>Подробнее</span>
                        </button>

                        <form action="" className="m-0 p-0 d-inline-block lh-1">
                          <button
                            type="button"
                            className="border-0 bg-transparent p-0 "
                          >
                            <img
                              src="img/greyHear.png"
                              alt=""
                              className="like"
                            />
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flexCenter">
                <AdaptivePaginator
                  page={result.products.page}
                  pageCount={result.products.pageCount}
                />
              </div>
            </>
          ) : (
            <p className="text-center">Товаров нет</p>
          )}
        </section>
      </div>
    </>
  );
}
