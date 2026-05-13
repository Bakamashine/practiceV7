import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import type { ProductUpdateValidation } from "~/api/product";
import product from "~/api/product";
import ShowError from "~/components/showError";
import ypk from "~/api/ypk";
import status_product from "~/api/status_product";
import type { Route } from "./+types/create";

export async function clientLoader() {
  const ypks = await ypk.getAll();
  const _status = await status_product.getAll();
  return { ypks, _status };
}

export default function CreateProduct({ loaderData }: Route.ComponentProps) {
  const { ypks, _status } = loaderData;
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [isProduct, setIsProduct] = useState(true);
  const [cost, setCost] = useState<string>("");
  const navigation = useNavigate();
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [error, setError] = useState<ProductUpdateValidation | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await product.create({
      Address: address,
      IsProduct: isProduct,
      Photo: image,
      ProductCost: parseInt(cost),
      ProductInfo: description,
      ProductName: name,
      StatusProductId: status,
      YpkId: type,
    });

    if (result.status == 200) {
      navigation("/product/edit_page");
      return;
    }
    setError(result.error as unknown as ProductUpdateValidation);
  };

  return (
    <section className="mx-4">
      <a href="/">
        <img
          src="/img/arrow-left.png"
          alt="Назад"
          className="my-2 myImgArrow"
        />
      </a>
      <div className="text-center">
        <h1>Добавить новое</h1>
      </div>
      <div className="myInfoCard catalog addProduct d-flex align-items-center justify-content-center">
        <div className="mb-3">
          <div className="newTovar">
            <div className="card-body text-center">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div
                  className="m-3 newFoto rounded-5 bg-secondary d-flex justify-content-center align-items-center"
                  style={{
                    overflow: "hidden",
                    aspectRatio: "1 / 1",
                    cursor: "pointer",
                  }}
                  onClick={handleImageClick}
                >
                  <img
                    src={
                      previewUrl || "/img/material-symbols_add-a-photo-outline-sharp.png"
                    }
                    style={{
                      width: previewUrl ? "100%" : "25%",
                      height: previewUrl ? "100%" : "auto",
                      objectFit: previewUrl ? "cover" : "contain",
                    }}
                    alt="Изображение товара"
                  />
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="image"
                  accept="image/*"
                  hidden
                  id="photoInput"
                  onChange={handleImageChange}
                />

                <div className="my-5">
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      placeholder="Название"
                      className="border-0 rounded-4 backColorGre1 w-100 px-3"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <ShowError errorKey="ProductName" error={error} />
                  </div>

                  <div className="mb-3">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Номер телефона для связи"
                      className="border-0 rounded-4 backColorGre1 w-100 px-3"
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="text"
                      name="address"
                      placeholder="Адрес"
                      className="border-0 rounded-4 backColorGre1 w-100 px-3"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <ShowError errorKey="Address" error={error} />
                  </div>

                  <div className="mb-3">
                    <select
                      name="type"
                      className="border-0 rounded-4 backColorGre1 w-100 px-3 text-muted"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="">Тип: выпадающий список</option>
                      {ypks?.ypks.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.ypkName}
                        </option>
                      ))}
                    </select>
                    <ShowError errorKey="YpkId" error={error} />
                  </div>

                  <div className="mb-3">
                    <select
                      name="status"
                      className="border-0 rounded-4 backColorGre1 w-100 px-3 text-muted"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Статус: выпадающий список</option>
                      {_status?.statusProducts.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.statusName}
                        </option>
                      ))}
                    </select>
                    <ShowError errorKey="StatusProductId" error={error} />
                  </div>

                  <div className="mb-3">
                    <textarea
                      name="description"
                      placeholder="Доп инфа"
                      rows={3}
                      className="border-0 rounded-4 backColorGre1 w-100 px-3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="number"
                      name="cost"
                      placeholder="Цена"
                      className="border-0 rounded-4 backColorGre1 w-100 px-3"
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                    />
                    <ShowError errorKey="Cost" error={error} />
                  </div>

                  <div className="mb-4 d-flex justify-content-around gap-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="offerType"
                        id="service"
                        value="service"
                        checked={isProduct === false}
                        onChange={() => setIsProduct(false)}
                      />
                      <label className="form-check-label text-muted" htmlFor="service">
                        Услуга
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="offerType"
                        id="product"
                        value="product"
                        checked={isProduct === true}
                        onChange={() => setIsProduct(true)}
                      />
                      <label className="form-check-label text-muted" htmlFor="product">
                        Товар
                      </label>
                    </div>
                  </div>
                </div>

                <button type="submit" className="w-50 myButton rounded-4 myBlue text-white p-2">
                  Сохранить
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}