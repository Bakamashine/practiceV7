import { useState, useRef, type ChangeEvent } from "react";
import product from "~/api/product";
import type { Route } from "./+types/edit";

export async function loader({ params }: Route.LoaderArgs) {
  const myproduct = await product.getById(params.id);
  return myproduct;
}
const EditProduct = ({ loaderData }: Route.ComponentProps) => {
  const [name, setName] = useState<string>(loaderData!.productName);
  // const [phone, setPhone] = useState<string>(loaderData!.);
  const [address, setAddress] = useState<string>(loaderData!.address);
  const [type, setType] = useState<string>(loaderData!.ypkId);
  const [description, setDescription] = useState<string>(
    loaderData!.productInfo,
  );
  const [offerType, setOfferType] = useState<string>("product");
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // console.log({ name, phone, address, type, description, offerType, image });
  };

  return (
    <section className="mx-4">
      <a href="userProfile.html">
        <img src="img/arrow-left.png" alt="Назад" className="my-2 myImgArrow" />
      </a>
      <div className="text-center">
        <h1>Редактировать</h1>
      </div>
      <div className="myInfoCard catalog addProduct d-flex align-items-center justify-content-center">
        <div className="mb-3">
          <div className="newTovar">
            <div className="card-body text-center">
              <form>
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
                      image ? URL.createObjectURL(image) : "img/Group 19.png"
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
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
                      placeholder="Название"
                      className="border-0 rounded-4 backColorGre1 w-100 px-3"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  {/* <div className="mb-3">
                    <input
                      type="tel"
                      placeholder="Номер телефона для связи"
                      className="border-0 rounded-4 backColorGre1 w-100 px-3"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div> */}

                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Адрес"
                      className="border-0 rounded-4 backColorGre1 w-100 px-3"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <select
                      className="border-0 rounded-4 backColorGre1 w-100 px-3 text-muted"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="">Тип: выпадающий список</option>
                      <option value="тип1">Тип 1</option>
                      <option value="тип2">Тип 2</option>
                      <option value="тип3">Тип 3</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <textarea
                      placeholder="Доп инфа"
                      rows={3}
                      className="border-0 rounded-4 backColorGre1 w-100 px-3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="mb-4 d-flex justify-content-around gap-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="offerType"
                        id="service"
                        value="service"
                        checked={offerType === "service"}
                        onChange={() => setOfferType("service")}
                      />
                      <label
                        className="form-check-label text-muted"
                        htmlFor="service"
                      >
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
                        checked={offerType === "product"}
                        onChange={() => setOfferType("product")}
                      />
                      <label
                        className="form-check-label text-muted"
                        htmlFor="product"
                      >
                        Товар
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  className="w-50 myButton rounded-4 myBlue text-white p-2"
                  onClick={handleSubmit}
                >
                  Сохранить
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
