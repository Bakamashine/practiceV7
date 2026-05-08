import product from "~/api/product";
import type { Route } from "./+types/edit_page";
import default_image_url from "~/constants/image";
import AdaptivePaginator from "~/components/AdaptivePaginator";

// export async function loader() {
//   return null;
// }
export async function clientLoader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");

  const products = await product.getWithPaginate(page);
  return products;
}
export default function EditProductPage({
  loaderData: products,
}: Route.ComponentProps) {
  return (
    <>
      {/* ======================= КНОПКА НАЗАД ======================= */}
      <div className="mx-5">
        <a href="userProfile.html">
          <img
            src="img/arrow-left.png"
            alt="Назад"
            className="my-2 myImgArrow"
          />
        </a>
      </div>

      {/* ======================= КАТАЛОГ ТОВАРОВ И УСЛУГ ======================= */}
      <div className="catalog content">
        <section className="m-5 catalog text-center">
          <h1>Редактировать услуги и товары</h1>
          <input
            className="form-control"
            type="search"
            placeholder="Поиск"
            aria-label="Поиск"
            style={{ height: "60px" }}
          />

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
                          <h5>{item.ypkId}</h5>
                          <h4>{item.productCost}</h4>
                          <p>{item.productInfo}</p>

                          {/* кнопка редактировать услугу */}
                          <a
                            href="redactProductInfo.html"
                            className="text-decoration-none flex-grow-1 flex-md-grow-0"
                          >
                            <button
                              type="button"
                              className="my-3 sign-out d-flex myLightBlue border-0 rounded-3 justify-content-center align-items-center gap-2 p-2 text-white w-100"
                            >
                              <span>Редактировать</span>
                            </button>
                          </a>
                          {/* кнопка скрыть услугу если она больше не акуальна */}
                          <a
                            href="hide.html"
                            className="text-decoration-none flex-grow-1 flex-md-grow-0"
                          >
                            <button
                              type="button"
                              className="my-3 sign-out d-flex bg-danger-subtle border-0 rounded-3 justify-content-center align-items-center gap-2 p-2 text-white w-100"
                            >
                              <span>Скрыть</span>
                            </button>
                          </a>
                          {/* кнопка если товар был скрыт и его нужно вернуть */}
                          <a
                            href="return.html"
                            className="text-decoration-none flex-grow-1 flex-md-grow-0"
                          >
                            <button
                              type="button"
                              className="my-3 sign-out d-flex bg-success-subtle border-0 rounded-3 justify-content-center align-items-center gap-2 p-2 text-white w-100"
                            >
                              <span>Вернуть</span>
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Карточка-заполнитель 1 */}
                  <div className="col d-flex">
                    <div className="rounded shadow p-3 w-100">
                      <img src="..." className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          Это более длинная карточка с поддерживающим текстом ниже,
                          как естественное введение в дополнительный контент.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Карточка-заполнитель 2 */}
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

                  {/* Карточка-заполнитель 3 */}
                  <div className="col d-flex">
                    <div className="rounded shadow p-3 w-100">
                      <img src="..." className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">
                          Это более длинная карточка с поддерживающим текстом ниже,
                          как естественное введение в дополнительный контент.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flexCenter">
                  <AdaptivePaginator page={products.page} pageCount={products.pageCount} />
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
